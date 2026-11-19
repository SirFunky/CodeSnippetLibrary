import { beforeEach, describe, it, expect, vi } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  parseSnippet,
  serializeSnippet,
  indexLibrary,
  validateMetadata,
  withImports,
} from "../src/services/markdown";
import {
  loadLibrary,
  saveSnippet,
  deleteSnippet,
  normalizePreferences,
  readBrowserPreferences,
  writeBrowserPreferences,
  exportSnippet,
} from "../src/services/storage";
import { createSearch } from "../src/search/search";
import { supportsVersion } from "../src/models/languages";
import {
  defaultPreferences,
  type Metadata,
  type LibraryFile,
} from "../src/models/snippet";
const metadata: Metadata = {
  id: "c-test",
  language: "c",
  title: "C test",
  description: "A C example.",
  category: "C Basics",
  tags: ["c", "vector"],
  cVersion: 17,
  imports: ["<stdio.h>", "<stdlib.h>"],
};
const raw = serializeSnippet(
  metadata,
  'if (1) {\n    puts("Hello, C!");\n}',
  "Standard library only.",
);
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
describe("C parsing and standards", () => {
  it("round trips headers, standard, indentation and notes", () => {
    const snippet = parseSnippet(raw);
    expect(snippet.language).toBe("c");
    expect(snippet.cVersion).toBe(17);
    expect(snippet.notes).toBe("Standard library only.");
    expect(withImports(snippet)).toBe(
      "#include <stdio.h>\n#include <stdlib.h>\n\n" + snippet.code,
    );
    expect(snippet.code).toContain("    puts");
    expect(snippet.raw).toBe(raw);
  });
  it("preserves quoted project headers and chooses the primary C block", () => {
    const source =
      serializeSnippet(
        { ...metadata, imports: ['"project/widget.h"'] },
        "int value = 1;",
      ) +
      "\n```java\nint ignored = 2;\n```\n\n```c primary\nint answer = 42;\n```\n";
    const snippet = parseSnippet(source);
    expect(snippet.code).toBe("int answer = 42;");
    expect(snippet.blocks).toHaveLength(2);
    expect(withImports(snippet)).toBe(
      '#include "project/widget.h"\n\nint answer = 42;',
    );
  });
  it("requires a matching nonempty fence and only one primary", () => {
    expect(() => parseSnippet(raw.replace("```c", "```csharp"))).toThrow("C");
    expect(() =>
      parseSnippet(
        raw + "\n```c primary\nint x=1;\n```\n```c primary\nint y=2;\n```\n",
      ),
    ).toThrow("Only one C");
  });
  it.each([
    { cVersion: "17" },
    { cVersion: 17.5 },
    { cVersion: 98 },
    { cVersion: undefined },
    { javaVersion: 8 },
    { pythonVersion: "3.9" },
    { csharpVersion: "8.0" },
    { dotnetVersion: "8.0" },
    { imports: ["#include <stdlib.h>"] },
    { imports: ["<stdlib.h>\n#error bad"] },
    { imports: ['<vector"'] },
    { imports: ['"header.h>'] },
  ])("rejects invalid C metadata %j", (patch) =>
    expect(() => validateMetadata({ ...metadata, ...patch })).toThrow(),
  );
  it("compares standards and filters results within the C section", () => {
    const older = parseSnippet(raw),
      newer = parseSnippet(
        serializeSnippet(
          { ...metadata, id: "c-newer", cVersion: 23 },
          "bool found = true;",
        ),
      ),
      java = parseSnippet(
        serializeSnippet(
          {
            id: "java-test",
            title: "Java",
            description: "Java example.",
            category: "Java Basics",
            tags: [],
            javaVersion: 8,
          },
          "int x = 1;",
        ),
      );
    expect(supportsVersion(older, "23")).toBe(true);
    expect(supportsVersion(newer, "17")).toBe(false);
    const search = createSearch([older, newer, java]),
      filter = { category: "all", tag: "", version: "", favorites: [] };
    expect(search("", { ...filter, language: "c", version: "17" })).toEqual([
      older,
    ]);
    expect(
      search("", {
        ...filter,
        language: "c",
        category: "favorites",
        favorites: ["c-newer", "java-test"],
      }),
    ).toEqual([newer]);
  });
  it("does not allow C version fields on existing Java snippets", () =>
    expect(() =>
      validateMetadata({
        id: "java-test",
        title: "Java",
        description: "Test.",
        category: "Java",
        tags: [],
        javaVersion: 8,
        cVersion: 17,
      }),
    ).toThrow("selected language"));
});
describe("C library upgrade and management", () => {
  it("adds C once while preserving older sections and existing deletions", async () => {
    const previous = (await loadLibrary()).files.filter(
      (file) => !file.path.startsWith("C/"),
    );
    localStorage.setItem("jsl.library.v1", JSON.stringify(previous));
    (localStorage as unknown as MemoryStorage).data.delete(
      "jsl.c-initialized.v1",
    );
    const upgraded = await loadLibrary();
    for (const file of previous)
      expect(upgraded.files.find((f) => f.path === file.path)?.content).toBe(
        file.content,
      );
    expect(upgraded.files.filter((f) => f.path.startsWith("C/"))).toHaveLength(
      15,
    );
    const c = upgraded.files.find((f) => f.path.startsWith("C/"))!;
    await deleteSnippet(c.path, c.content);
    expect((await loadLibrary()).files.some((f) => f.path === c.path)).toBe(
      false,
    );
  });
  it("reserves user IDs when adding C defaults", async () => {
    const custom = serializeSnippet(
      { ...metadata, id: "c-read-text" },
      'puts("custom");',
    );
    localStorage.setItem(
      "jsl.library.v1",
      JSON.stringify([{ path: "custom.md", content: custom }]),
    );
    const files = (await loadLibrary()).files;
    expect(
      files.filter((f) => f.content.includes("id: c-read-text")),
    ).toHaveLength(1);
    expect(files.find((f) => f.path === "custom.md")?.content).toBe(custom);
  });
  it("creates, edits, imports, exports and deletes losslessly", async () => {
    const path = await saveSnippet(raw, null, null);
    expect(path).toBe("C/c-test.md");
    const updated = raw.replace("Hello, C!", "Edited C!");
    await saveSnippet(updated, path, raw);
    await expect(saveSnippet(raw, path, raw)).rejects.toThrow("changed");
    await expect(saveSnippet(raw, null, null)).rejects.toThrow("Duplicate");
    expect(
      (await loadLibrary()).files.find((f) => f.path === path)?.content,
    ).toBe(updated);
    let exported: Blob | undefined;
    vi.stubGlobal("URL", {
      createObjectURL: (blob: Blob) => {
        exported = blob;
        return "blob:test";
      },
      revokeObjectURL: vi.fn(),
    });
    vi.stubGlobal("document", { createElement: () => ({ click: vi.fn() }) });
    await exportSnippet(updated, "c-test");
    expect(await exported!.text()).toBe(updated);
    await deleteSnippet(path, updated);
    expect((await loadLibrary()).files.some((f) => f.path === path)).toBe(
      false,
    );
  });
  it("migrates older preferences and remembers the C section", () => {
    expect(
      normalizePreferences({
        language: "csharp",
        category: "Data formats",
        categories: {
          java: "Strings",
          python: "Collections",
          csharp: "Data formats",
        },
      }),
    ).toMatchObject({
      language: "csharp",
      categories: {
        java: "Strings",
        python: "Collections",
        csharp: "Data formats",
        c: "all",
      },
    });
    writeBrowserPreferences({
      ...defaultPreferences,
      language: "c",
      category: "C Basics",
      categories: { ...defaultPreferences.categories, c: "C Basics" },
    });
    expect(readBrowserPreferences()).toMatchObject({
      language: "c",
      category: "C Basics",
      categories: { c: "C Basics" },
    });
  });
  it("bundles 15 valid C examples with unique IDs across all seven languages", () => {
    function files(dir: string): LibraryFile[] {
      return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
        entry.isDirectory()
          ? files(join(dir, entry.name))
          : [
              {
                path: join(dir, entry.name),
                content: readFileSync(join(dir, entry.name), "utf8"),
              },
            ],
      );
    }
    const result = indexLibrary(
      [
        "DefaultSnippets",
        "DefaultPythonSnippets",
        "DefaultCSharpSnippets",
        "DefaultCppSnippets",
        "DefaultCSnippets",
        "DefaultSqlSnippets",
        "DefaultTypeScriptSnippets",
      ].flatMap(files),
    );
    expect(result.errors).toEqual([]);
    expect(result.snippets.filter((s) => s.language === "c")).toHaveLength(15);
    expect(result.snippets).toHaveLength(126);
  });
});

it.each([89, 99, 11, 17, 23])(
  "compares standard %s in chronological order",
  (standard) => {
    const snippet = parseSnippet(
      serializeSnippet({ ...metadata, cVersion: standard }, "int x = 1;"),
    );
    const order = [89, 99, 11, 17, 23];
    for (const target of order)
      expect(supportsVersion(snippet, String(target))).toBe(
        order.indexOf(standard) <= order.indexOf(target),
      );
    expect(supportsVersion(snippet, "98")).toBe(false);
  },
);
it.each([
  { cppVersion: 17 },
  { sqlDialect: "sqlite" },
  { typescriptVersion: "4.9" },
])("rejects mixed C metadata %j", (patch) =>
  expect(() => validateMetadata({ ...metadata, ...patch })).toThrow(),
);
