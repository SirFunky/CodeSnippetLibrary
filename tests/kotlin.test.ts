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
  id: "kt-test",
  language: "kotlin",
  title: "Kotlin test",
  description: "Test.",
  category: "Kotlin Basics",
  tags: ["type"],
  kotlinVersion: "1.8",
  jvmTarget: 8,
  imports: ["java.time.LocalDate as Date"],
};
const code = "package sample\n\nfun main() {\n    println(42)\n}";
const raw =
  serializeSnippet(
    metadata,
    "package sample\n\nfun main() {}",
    "Keep <text> safe.",
  ) +
  "\n```kotlin primary\n" +
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
it("preserves Kotlin primary blocks, imports, notes and entire Markdown", () => {
  const s = parseSnippet(raw);
  expect(s.code).toBe(code);
  expect(s.blocks).toHaveLength(2);
  expect(s.raw).toBe(raw);
  expect(s.notes).toBe("Keep <text> safe.");
  expect(withImports(s)).toBe(
    "package sample\n\nimport java.time.LocalDate as Date\n\nfun main() {\n    println(42)\n}",
  );
});
it.each([
  { kotlinVersion: 1.8 },
  { kotlinVersion: "01.8" },
  { kotlinVersion: "1" },
  { kotlinVersion: undefined },
  { jvmTarget: "8" },
  { jvmTarget: 9 },
  { jvmTarget: 8.5 },
  { jvmTarget: undefined },
  { javaVersion: 8 },
  { pythonVersion: "3.9" },
  { cppVersion: 17 },
  { cVersion: 11 },
  { typescriptVersion: "4.9" },
  { javascriptVersion: 2020 },
  { goVersion: "1.20" },
  { sqlVersion: "2017" },
  { dotnetVersion: "8.0" },
  { imports: ["import java.time.LocalDate"] },
  { imports: ["java.time.LocalDate;"] },
  { imports: ["java.time.LocalDate\n"] },
  { imports: ["java..time"] },
  { imports: ["java.time.LocalDate as bad-name"] },
])("rejects invalid Kotlin metadata %j", (patch) =>
  expect(() => validateMetadata({ ...metadata, ...patch })).toThrow(),
);
it("rejects wrong fences and duplicate primary markers", () => {
  expect(() => parseSnippet(raw.replaceAll("```kotlin", "```java"))).toThrow(
    "Kotlin",
  );
  expect(() =>
    parseSnippet(raw + "\n```kotlin primary\nconst other = 1;\n```"),
  ).toThrow("Only one");
  expect(() =>
    validateMetadata({ ...metadata, language: "java", javaVersion: 8 }),
  ).toThrow();
});
it("scopes search, favorites and numeric version filters", () => {
  const old = parseSnippet(raw),
    newer = parseSnippet(
      serializeSnippet(
        { ...metadata, id: "kt-new", kotlinVersion: "1.9" },
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
    language: "kotlin" as const,
    category: "all",
    tag: "",
    version: "1.8",
    favorites: [],
  };
  expect(search("", filter)).toEqual([old]);
  expect(search("", { ...filter, version: "1.9" })).toHaveLength(2);
  expect(
    search("", {
      ...filter,
      version: "1.9",
      category: "favorites",
      favorites: ["kt-new"],
    }),
  ).toEqual([newer]);
});
it("migrates once, preserving existing content, edits and deletions", async () => {
  const previous = (await loadLibrary()).files.filter(
    (f) => !f.path.startsWith("Kotlin/"),
  );
  localStorage.setItem("jsl.library.v1", JSON.stringify(previous));
  (localStorage as unknown as MemoryStorage).data.delete(
    "jsl.kotlin-initialized.v1",
  );
  const upgraded = (await loadLibrary()).files;
  for (const f of previous)
    expect(upgraded.find((x) => x.path === f.path)?.content).toBe(f.content);
  const kotlinFiles = upgraded.filter((f) => f.path.startsWith("Kotlin/"));
  expect(kotlinFiles).toHaveLength(15);
  await deleteSnippet(kotlinFiles[0].path, kotlinFiles[0].content);
  const edited = kotlinFiles[1].content + "\nKeep my edit.\n";
  await saveSnippet(edited, kotlinFiles[1].path, kotlinFiles[1].content);
  const again = (await loadLibrary()).files;
  expect(again.some((f) => f.path === kotlinFiles[0].path)).toBe(false);
  expect(again.find((f) => f.path === kotlinFiles[1].path)?.content).toBe(
    edited,
  );
});
it("reserves IDs and supports native-shaped browser CRUD with conflicts", async () => {
  localStorage.setItem(
    "jsl.library.v1",
    JSON.stringify([
      {
        path: "custom.md",
        content: raw.replace("kt-test", "kt-read-text"),
      },
    ]),
  );
  expect(
    (await loadLibrary()).files.filter((f) =>
      f.content.includes("id: kt-read-text"),
    ),
  ).toHaveLength(1);
  const path = await saveSnippet(raw, null, null);
  expect(path).toBe("Kotlin/kt-test.md");
  const updated = raw.replace("42", "43");
  await saveSnippet(updated, path, raw);
  await expect(saveSnippet(raw, path, raw)).rejects.toThrow("changed");
  await expect(saveSnippet(updated, null, null)).rejects.toThrow("Duplicate");
  await deleteSnippet(path, updated);
  expect((await loadLibrary()).files.some((f) => f.path === path)).toBe(false);
});
it("normalizes old preferences and accepts Kotlin selection/category", () => {
  expect(normalizePreferences({ language: "sql" }).categories.kotlin).toBe(
    "all",
  );
  expect(
    normalizePreferences({
      language: "kotlin",
      categories: { kotlin: "Generics" },
    }),
  ).toMatchObject({
    language: "kotlin",
    categories: { kotlin: "Generics" },
  });
});
it("bundles 472 valid, globally unique snippets including 42 Kotlin examples", async () => {
  const result = indexLibrary((await loadLibrary()).files);
  expect(result.errors).toEqual([]);
  expect(result.snippets).toHaveLength(472);
  expect(result.snippets.filter((s) => s.language === "kotlin")).toHaveLength(42);
});

it("formats wildcard imports and preserves package-less declaration fragments", () => {
  const s = parseSnippet(
    serializeSnippet(
      { ...metadata, imports: ["kotlin.math.*"] },
      "fun example() {}",
    ),
  );
  expect(withImports(s)).toBe("import kotlin.math.*\n\nfun example() {}");
});
it("compares Kotlin minor versions as components", () => {
  const old = parseSnippet(
    serializeSnippet({ ...metadata, kotlinVersion: "1.9" }, code),
  );
  const recent = parseSnippet(
    serializeSnippet(
      { ...metadata, id: "kt-recent", kotlinVersion: "1.10" },
      code,
    ),
  );
  const search = createSearch([old, recent]);
  expect(
    search("", {
      language: "kotlin",
      category: "all",
      tag: "",
      version: "1.9",
      favorites: [],
    }),
  ).toEqual([old]);
});
