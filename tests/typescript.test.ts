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
  id: "ts-test",
  language: "typescript",
  title: "Typed test",
  description: "Test.",
  category: "TypeScript Basics",
  tags: ["type"],
  typescriptVersion: "4.9",
  imports: ["import type { User } from './models'"],
};
const raw =
  serializeSnippet(metadata, "const value: number = 42;", "Keep <text> safe.") +
  "\n```typescript primary\n    const answer = 42;\n```\n";
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
it("preserves TypeScript primary blocks, imports, notes and entire Markdown", () => {
  const s = parseSnippet(raw);
  expect(s.code).toBe("    const answer = 42;");
  expect(s.blocks).toHaveLength(2);
  expect(s.raw).toBe(raw);
  expect(s.notes).toBe("Keep <text> safe.");
  expect(withImports(s)).toBe(
    "import type { User } from './models';\n\n    const answer = 42;",
  );
});
it.each([
  { typescriptVersion: 4.9 },
  { typescriptVersion: "04.9" },
  { typescriptVersion: "5" },
  { typescriptVersion: "5.x" },
  { typescriptVersion: "" },
  { javaVersion: 8 },
  { pythonVersion: "3.9" },
  { cppVersion: 17 },
  { sqlVersion: "2017" },
  { dotnetVersion: "8.0" },
  { imports: ["console.log(42)"] },
  { imports: ["import './models';"] },
  { imports: ["import './models'\nimport './other'"] },
])("rejects invalid TS metadata %j", (patch) =>
  expect(() => validateMetadata({ ...metadata, ...patch })).toThrow(),
);
it("rejects wrong fences and duplicate primary markers", () => {
  expect(() =>
    parseSnippet(raw.replaceAll("```typescript", "```java")),
  ).toThrow("TypeScript");
  expect(() =>
    parseSnippet(raw + "\n```typescript primary\nconst other = 1;\n```"),
  ).toThrow("Only one");
  expect(() =>
    validateMetadata({ ...metadata, language: "java", javaVersion: 8 }),
  ).toThrow();
});
it("scopes search, favorites and numeric version filters", () => {
  const old = parseSnippet(raw),
    newer = parseSnippet(
      serializeSnippet(
        { ...metadata, id: "ts-new", typescriptVersion: "5.0" },
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
    language: "typescript" as const,
    category: "all",
    tag: "",
    version: "4.9",
    favorites: [],
  };
  expect(search("", filter)).toEqual([old]);
  expect(search("", { ...filter, version: "5.0" })).toHaveLength(2);
  expect(
    search("", {
      ...filter,
      version: "5.0",
      category: "favorites",
      favorites: ["ts-new"],
    }),
  ).toEqual([newer]);
});
it("migrates once, preserving existing content, edits and deletions", async () => {
  const previous = (await loadLibrary()).files.filter(
    (f) => !f.path.startsWith("TypeScript/"),
  );
  localStorage.setItem("jsl.library.v1", JSON.stringify(previous));
  (localStorage as unknown as MemoryStorage).data.delete(
    "jsl.typescript-initialized.v1",
  );
  const upgraded = (await loadLibrary()).files;
  for (const f of previous)
    expect(upgraded.find((x) => x.path === f.path)?.content).toBe(f.content);
  const ts = upgraded.filter((f) => f.path.startsWith("TypeScript/"));
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
      { path: "custom.md", content: raw.replace("ts-test", "ts-type-import") },
    ]),
  );
  expect(
    (await loadLibrary()).files.filter((f) =>
      f.content.includes("id: ts-type-import"),
    ),
  ).toHaveLength(1);
  const path = await saveSnippet(raw, null, null);
  expect(path).toBe("TypeScript/ts-test.md");
  const updated = raw.replace("42", "43");
  await saveSnippet(updated, path, raw);
  await expect(saveSnippet(raw, path, raw)).rejects.toThrow("changed");
  await expect(saveSnippet(updated, null, null)).rejects.toThrow("Duplicate");
  await deleteSnippet(path, updated);
  expect((await loadLibrary()).files.some((f) => f.path === path)).toBe(false);
});
it("normalizes old preferences and accepts TypeScript selection/category", () => {
  expect(normalizePreferences({ language: "sql" }).categories.typescript).toBe(
    "all",
  );
  expect(
    normalizePreferences({
      language: "typescript",
      categories: { typescript: "Generics" },
    }),
  ).toMatchObject({
    language: "typescript",
    categories: { typescript: "Generics" },
  });
});
it("bundles 472 valid, globally unique snippets including 43 TypeScript examples", async () => {
  const result = indexLibrary((await loadLibrary()).files);
  expect(result.errors).toEqual([]);
  expect(result.snippets).toHaveLength(472);
  expect(
    result.snippets.filter((s) => s.language === "typescript"),
  ).toHaveLength(43);
});
