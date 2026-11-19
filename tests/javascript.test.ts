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
  id: "js-test",
  language: "javascript",
  title: "Typed test",
  description: "Test.",
  category: "JavaScript Basics",
  tags: ["type"],
  javascriptVersion: 2020,
  imports: ["import { greet } from './greeting.js'"],
};
const raw =
  serializeSnippet(metadata, "const value = 42;", "Keep <text> safe.") +
  "\n```javascript primary\n    const answer = 42;\n```\n";
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
it("preserves JavaScript primary blocks, imports, notes and entire Markdown", () => {
  const s = parseSnippet(raw);
  expect(s.code).toBe("    const answer = 42;");
  expect(s.blocks).toHaveLength(2);
  expect(s.raw).toBe(raw);
  expect(s.notes).toBe("Keep <text> safe.");
  expect(withImports(s)).toBe(
    "import { greet } from './greeting.js';\n\n    const answer = 42;",
  );
});
it.each([
  { javascriptVersion: "2020" },
  { javascriptVersion: 2020.5 },
  { javascriptVersion: 2014 },
  { javascriptVersion: 2100 },
  { javascriptVersion: undefined },
  { javaVersion: 8 },
  { pythonVersion: "3.9" },
  { cppVersion: 17 },
  { cVersion: 11 },
  { typescriptVersion: "4.9" },
  { sqlVersion: "2017" },
  { dotnetVersion: "8.0" },
  { imports: ["console.log(42)"] },
  { imports: ["import './greeting.js';"] },
  { imports: ["import './greeting.js'\nimport './other.js'"] },
  { imports: ["import type { User } from './models'"] },
])("rejects invalid JavaScript metadata %j", (patch) =>
  expect(() => validateMetadata({ ...metadata, ...patch })).toThrow(),
);
it("rejects wrong fences and duplicate primary markers", () => {
  expect(() =>
    parseSnippet(raw.replaceAll("```javascript", "```java")),
  ).toThrow("JavaScript");
  expect(() =>
    parseSnippet(raw + "\n```javascript primary\nconst other = 1;\n```"),
  ).toThrow("Only one");
  expect(() =>
    validateMetadata({ ...metadata, language: "java", javaVersion: 8 }),
  ).toThrow();
});
it("scopes search, favorites and numeric version filters", () => {
  const old = parseSnippet(raw),
    newer = parseSnippet(
      serializeSnippet(
        { ...metadata, id: "js-new", javascriptVersion: 2022 },
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
    language: "javascript" as const,
    category: "all",
    tag: "",
    version: "2020",
    favorites: [],
  };
  expect(search("", filter)).toEqual([old]);
  expect(search("", { ...filter, version: "2022" })).toHaveLength(2);
  expect(
    search("", {
      ...filter,
      version: "2022",
      category: "favorites",
      favorites: ["js-new"],
    }),
  ).toEqual([newer]);
});
it("migrates once, preserving existing content, edits and deletions", async () => {
  const previous = (await loadLibrary()).files.filter(
    (f) => !f.path.startsWith("JavaScript/"),
  );
  localStorage.setItem("jsl.library.v1", JSON.stringify(previous));
  (localStorage as unknown as MemoryStorage).data.delete(
    "jsl.javascript-initialized.v1",
  );
  const upgraded = (await loadLibrary()).files;
  for (const f of previous)
    expect(upgraded.find((x) => x.path === f.path)?.content).toBe(f.content);
  const ts = upgraded.filter((f) => f.path.startsWith("JavaScript/"));
  expect(ts).toHaveLength(15);
  await deleteSnippet(ts[0].path, ts[0].content);
  const edited = ts[1].content + "\nKeep my edit.\n";
  await saveSnippet(edited, ts[1].path, ts[1].content);
  const again = (await loadLibrary()).files;
  expect(again.some((f) => f.path === ts[0].path)).toBe(false);
  expect(again.find((f) => f.path === ts[1].path)?.content).toBe(edited);
});
it("reserves IDs and supports native-shaped browser CRUD with conflicts", async () => {
  localStorage.setItem(
    "jsl.library.v1",
    JSON.stringify([
      {
        path: "custom.md",
        content: raw.replace("js-test", "js-module-import"),
      },
    ]),
  );
  expect(
    (await loadLibrary()).files.filter((f) =>
      f.content.includes("id: js-module-import"),
    ),
  ).toHaveLength(1);
  const path = await saveSnippet(raw, null, null);
  expect(path).toBe("JavaScript/js-test.md");
  const updated = raw.replace("42", "43");
  await saveSnippet(updated, path, raw);
  await expect(saveSnippet(raw, path, raw)).rejects.toThrow("changed");
  await expect(saveSnippet(updated, null, null)).rejects.toThrow("Duplicate");
  await deleteSnippet(path, updated);
  expect((await loadLibrary()).files.some((f) => f.path === path)).toBe(false);
});
it("normalizes old preferences and accepts JavaScript selection/category", () => {
  expect(normalizePreferences({ language: "sql" }).categories.javascript).toBe(
    "all",
  );
  expect(
    normalizePreferences({
      language: "javascript",
      categories: { javascript: "Generics" },
    }),
  ).toMatchObject({
    language: "javascript",
    categories: { javascript: "Generics" },
  });
});
it("bundles 472 valid, globally unique snippets including 44 JavaScript examples", async () => {
  const result = indexLibrary((await loadLibrary()).files);
  expect(result.errors).toEqual([]);
  expect(result.snippets).toHaveLength(472);
  expect(
    result.snippets.filter((s) => s.language === "javascript"),
  ).toHaveLength(44);
});
