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
  id: "cobol-test",
  language: "cobol",
  title: "Typed test",
  description: "Test.",
  category: "COBOL Basics",
  tags: ["type"],
  cobolVersion: 1985,
  cobolFormat: "fixed",
  imports: [],
};
const code =
  '       IDENTIFICATION DIVISION.\n       PROGRAM-ID. EXAMPLE.\n       PROCEDURE DIVISION.\n           DISPLAY "Hello, COBOL!"\n           STOP RUN.';
const raw =
  serializeSnippet(metadata, code, "Keep <text> safe.") +
  "\n```cobol primary\n" +
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
it("preserves COBOL primary blocks, imports, notes and entire Markdown", () => {
  const s = parseSnippet(raw);
  expect(s.code).toBe(code);
  expect(s.blocks).toHaveLength(2);
  expect(s.raw).toBe(raw);
  expect(s.notes).toBe("Keep <text> safe.");
  expect(withImports(s)).toBe(code);
});
it.each([
  { cobolVersion: "1985" },
  { cobolVersion: 1985.5 },
  { cobolVersion: 1999 },
  { cobolVersion: undefined },
  { cobolFormat: "variable" },
  { cobolFormat: undefined },
  { cobolFormat: "free" },
  { javaVersion: 8 },
  { pythonVersion: "3.9" },
  { cppVersion: 17 },
  { cVersion: 11 },
  { typescriptVersion: "4.9" },
  { javascriptVersion: 2020 },
  { goVersion: "1.20" },
  { kotlinVersion: "1.8" },
  { jvmTarget: 8 },
  { sqlVersion: "2017" },
  { dotnetVersion: "8.0" },
  { imports: ["COPY example."] },
])("rejects invalid COBOL metadata %j", (patch) =>
  expect(() => validateMetadata({ ...metadata, ...patch })).toThrow(),
);
it("rejects wrong fences and duplicate primary markers", () => {
  expect(() => parseSnippet(raw.replaceAll("```cobol", "```java"))).toThrow(
    "COBOL",
  );
  expect(() =>
    parseSnippet(raw + "\n```cobol primary\nconst other = 1;\n```"),
  ).toThrow("Only one");
  expect(() =>
    validateMetadata({ ...metadata, language: "java", javaVersion: 8 }),
  ).toThrow();
});
it("scopes search, favorites and numeric version filters", () => {
  const old = parseSnippet(raw),
    newer = parseSnippet(
      serializeSnippet(
        {
          ...metadata,
          id: "cobol-new",
          cobolVersion: 2002,
          cobolFormat: "free",
        },
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
    language: "cobol" as const,
    category: "all",
    tag: "",
    version: "1985",
    favorites: [],
  };
  expect(search("", filter)).toEqual([old]);
  expect(search("", { ...filter, version: "2002" })).toHaveLength(2);
  expect(
    search("", {
      ...filter,
      version: "2002",
      category: "favorites",
      favorites: ["cobol-new"],
    }),
  ).toEqual([newer]);
});
it("migrates once, preserving existing content, edits and deletions", async () => {
  const previous = (await loadLibrary()).files.filter(
    (f) => !f.path.startsWith("COBOL/"),
  );
  localStorage.setItem("jsl.library.v1", JSON.stringify(previous));
  (localStorage as unknown as MemoryStorage).data.delete(
    "jsl.cobol-initialized.v1",
  );
  const upgraded = (await loadLibrary()).files;
  for (const f of previous)
    expect(upgraded.find((x) => x.path === f.path)?.content).toBe(f.content);
  const ts = upgraded.filter((f) => f.path.startsWith("COBOL/"));
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
        content: raw.replace("cobol-test", "cobol-hello"),
      },
    ]),
  );
  expect(
    (await loadLibrary()).files.filter((f) =>
      f.content.includes("id: cobol-hello"),
    ),
  ).toHaveLength(1);
  const path = await saveSnippet(raw, null, null);
  expect(path).toBe("COBOL/cobol-test.md");
  const updated = raw.replace("Hello, COBOL!", "Edited COBOL!");
  await saveSnippet(updated, path, raw);
  await expect(saveSnippet(raw, path, raw)).rejects.toThrow("changed");
  await expect(saveSnippet(updated, null, null)).rejects.toThrow("Duplicate");
  await deleteSnippet(path, updated);
  expect((await loadLibrary()).files.some((f) => f.path === path)).toBe(false);
});
it("normalizes old preferences and accepts COBOL selection/category", () => {
  expect(normalizePreferences({ language: "sql" }).categories.cobol).toBe(
    "all",
  );
  expect(
    normalizePreferences({
      language: "cobol",
      categories: { cobol: "Generics" },
    }),
  ).toMatchObject({
    language: "cobol",
    categories: { cobol: "Generics" },
  });
});
it("bundles 472 valid, globally unique snippets including 42 COBOL examples", async () => {
  const result = indexLibrary((await loadLibrary()).files);
  expect(result.errors).toEqual([]);
  expect(result.snippets).toHaveLength(472);
  expect(result.snippets.filter((s) => s.language === "cobol")).toHaveLength(42);
});
