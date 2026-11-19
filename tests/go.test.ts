import { beforeEach, it, expect, vi } from "vitest";
import {
  parseSnippet,
  serializeSnippet,
  validateMetadata,
  withImports,
  indexLibrary,
} from "../src/services/markdown";
import {
  loadLibrary,
  saveSnippet,
  deleteSnippet,
  normalizePreferences,
} from "../src/services/storage";
import { createSearch } from "../src/search/search";
import type { Metadata } from "../src/models/snippet";
const metadata: Metadata = {
  id: "go-test",
  language: "go",
  title: "Go test",
  description: "Test.",
  category: "Go Basics",
  tags: ["type"],
  goVersion: "1.20",
  imports: ["fmt"],
};
const code = "package main\n\nfunc main() {\n    fmt.Println(42)\n}";
const raw =
  serializeSnippet(
    metadata,
    "package main\n\nfunc main() {}",
    "Keep <text> safe.",
  ) +
  "\n```go primary\n" +
  code +
  "\n```\n";
class MemoryStorage {
  data = new Map<string, string>();
  getItem(k: string) {
    return this.data.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.data.set(k, v);
  }
}
beforeEach(() => vi.stubGlobal("localStorage", new MemoryStorage()));
it("preserves Go primary blocks, imports, notes and entire Markdown", () => {
  const s = parseSnippet(raw);
  expect(s.code).toBe(code);
  expect(s.blocks).toHaveLength(2);
  expect(s.raw).toBe(raw);
  expect(s.notes).toBe("Keep <text> safe.");
  expect(withImports(s)).toBe(
    'package main\n\nimport (\n    "fmt"\n)\n\nfunc main() {\n    fmt.Println(42)\n}',
  );
});
it.each([
  { goVersion: 1.2 },
  { goVersion: "1.020" },
  { goVersion: "2.0" },
  { goVersion: "1" },
  { goVersion: undefined },
  { javaVersion: 8 },
  { pythonVersion: "3.9" },
  { cppVersion: 17 },
  { cVersion: 11 },
  { typescriptVersion: "4.9" },
  { javascriptVersion: 2020 },
  { sqlVersion: "2017" },
  { dotnetVersion: "8.0" },
  { imports: ["import fmt"] },
  { imports: ['"fmt"'] },
  { imports: ["fmt\n"] },
  { imports: ["../fmt"] },
  { imports: ["a//b"] },
  { imports: ["alias fmt"] },
])("rejects invalid Go metadata %j", (patch) =>
  expect(() => validateMetadata({ ...metadata, ...patch })).toThrow(),
);
it("rejects wrong fences and duplicate primary markers", () => {
  expect(() => parseSnippet(raw.replaceAll("```go", "```java"))).toThrow("Go");
  expect(() =>
    parseSnippet(raw + "\n```go primary\nconst other = 1;\n```"),
  ).toThrow("Only one");
  expect(() =>
    validateMetadata({ ...metadata, language: "java", javaVersion: 8 }),
  ).toThrow();
});
it("scopes search, favorites and numeric version filters", () => {
  const old = parseSnippet(raw),
    newer = parseSnippet(
      serializeSnippet(
        { ...metadata, id: "go-new", goVersion: "1.21" },
        "const newer = 1;",
      ),
    );
  const java = parseSnippet(
    serializeSnippet(
      {
        id: "java-test",
        title: "Java",
        description: "Test",
        category: "Basics",
        tags: [],
        javaVersion: 8,
      },
      "int x=1;",
    ),
  );
  const search = createSearch([old, newer, java]);
  const filter = {
    language: "go" as const,
    category: "all",
    tag: "",
    version: "1.20",
    favorites: [],
  };
  expect(search("", filter)).toEqual([old]);
  expect(search("", { ...filter, version: "1.21" })).toHaveLength(2);
  expect(
    search("", {
      ...filter,
      version: "1.21",
      category: "favorites",
      favorites: ["go-new"],
    }),
  ).toEqual([newer]);
});
it("migrates once, preserving existing content, edits and deletions", async () => {
  const previous = (await loadLibrary()).files.filter(
    (f) => !f.path.startsWith("Go/"),
  );
  localStorage.setItem("jsl.library.v1", JSON.stringify(previous));
  (localStorage as unknown as MemoryStorage).data.delete(
    "jsl.go-initialized.v1",
  );
  const upgraded = (await loadLibrary()).files;
  for (const f of previous)
    expect(upgraded.find((x) => x.path === f.path)?.content).toBe(f.content);
  const goFiles = upgraded.filter((f) => f.path.startsWith("Go/"));
  expect(goFiles).toHaveLength(15);
  await deleteSnippet(goFiles[0].path, goFiles[0].content);
  const edited = goFiles[1].content + "\nKeep my edit.\n";
  await saveSnippet(edited, goFiles[1].path, goFiles[1].content);
  const again = (await loadLibrary()).files;
  expect(again.some((f) => f.path === goFiles[0].path)).toBe(false);
  expect(again.find((f) => f.path === goFiles[1].path)?.content).toBe(edited);
});
it("reserves IDs and supports native-shaped browser CRUD with conflicts", async () => {
  localStorage.setItem(
    "jsl.library.v1",
    JSON.stringify([
      {
        path: "custom.md",
        content: raw.replace("go-test", "go-read-text"),
      },
    ]),
  );
  expect(
    (await loadLibrary()).files.filter((f) =>
      f.content.includes("id: go-read-text"),
    ),
  ).toHaveLength(1);
  const path = await saveSnippet(raw, null, null);
  expect(path).toBe("Go/go-test.md");
  const updated = raw.replace("42", "43");
  await saveSnippet(updated, path, raw);
  await expect(saveSnippet(raw, path, raw)).rejects.toThrow("changed");
  await expect(saveSnippet(updated, null, null)).rejects.toThrow("Duplicate");
  await deleteSnippet(path, updated);
  expect((await loadLibrary()).files.some((f) => f.path === path)).toBe(false);
});
it("normalizes old preferences and accepts Go selection/category", () => {
  expect(normalizePreferences({ language: "sql" }).categories.go).toBe("all");
  expect(
    normalizePreferences({
      language: "go",
      categories: { go: "Generics" },
    }),
  ).toMatchObject({
    language: "go",
    categories: { go: "Generics" },
  });
});
it("bundles 472 valid, globally unique snippets including 43 Go examples", async () => {
  const result = indexLibrary((await loadLibrary()).files);
  expect(result.errors).toEqual([]);
  expect(result.snippets).toHaveLength(472);
  expect(result.snippets.filter((s) => s.language === "go")).toHaveLength(43);
});

it("copies imports after a commented package declaration and supports declaration fragments", () => {
  const snippet = parseSnippet(
    serializeSnippet(
      metadata,
      "// Package example.\npackage example // explanation\n\nfunc Example() {}",
    ),
  );
  expect(withImports(snippet)).toContain(
    'package example // explanation\n\nimport (\n    "fmt"\n)',
  );
  expect(
    withImports(parseSnippet(serializeSnippet(metadata, "func Example() {}"))),
  ).toBe('import (\n    "fmt"\n)\n\nfunc Example() {}');
});
it("compares Go minor versions as components", () => {
  const old = parseSnippet(
    serializeSnippet({ ...metadata, goVersion: "1.9" }, code),
  );
  const recent = parseSnippet(
    serializeSnippet({ ...metadata, id: "go-recent", goVersion: "1.10" }, code),
  );
  const search = createSearch([old, recent]);
  expect(
    search("", {
      language: "go",
      category: "all",
      tag: "",
      version: "1.9",
      favorites: [],
    }),
  ).toEqual([old]);
});
