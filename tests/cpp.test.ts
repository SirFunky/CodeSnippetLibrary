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
  id: "cpp-test",
  language: "cpp",
  title: "C++ test",
  description: "A C++ example.",
  category: "C++ Basics",
  tags: ["cpp", "vector"],
  cppVersion: 17,
  imports: ["<iostream>", "<vector>"],
};
const raw = serializeSnippet(
  metadata,
  'if (true) {\n    std::cout << "Hello, C++!";\n}',
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
describe("C++ parsing and standards", () => {
  it("round trips headers, standard, indentation and notes", () => {
    const snippet = parseSnippet(raw);
    expect(snippet.language).toBe("cpp");
    expect(snippet.cppVersion).toBe(17);
    expect(snippet.notes).toBe("Standard library only.");
    expect(withImports(snippet)).toBe(
      "#include <iostream>\n#include <vector>\n\n" + snippet.code,
    );
    expect(snippet.code).toContain("    std::cout");
    expect(snippet.raw).toBe(raw);
  });
  it("preserves quoted project headers and chooses the primary C++ block", () => {
    const source =
      serializeSnippet(
        { ...metadata, imports: ['"project/widget.hpp"'] },
        "int value = 1;",
      ) +
      "\n```java\nint ignored = 2;\n```\n\n```cpp primary\nint answer = 42;\n```\n";
    const snippet = parseSnippet(source);
    expect(snippet.code).toBe("int answer = 42;");
    expect(snippet.blocks).toHaveLength(2);
    expect(withImports(snippet)).toBe(
      '#include "project/widget.hpp"\n\nint answer = 42;',
    );
  });
  it("requires a matching nonempty fence and only one primary", () => {
    expect(() => parseSnippet(raw.replace("```cpp", "```csharp"))).toThrow(
      "C++",
    );
    expect(() =>
      parseSnippet(
        raw +
          "\n```cpp primary\nint x=1;\n```\n```cpp primary\nint y=2;\n```\n",
      ),
    ).toThrow("Only one C++");
  });
  it.each([
    { cppVersion: "17" },
    { cppVersion: 17.5 },
    { cppVersion: 98 },
    { cppVersion: undefined },
    { javaVersion: 8 },
    { pythonVersion: "3.9" },
    { csharpVersion: "8.0" },
    { dotnetVersion: "8.0" },
    { imports: ["#include <vector>"] },
    { imports: ["<vector>\n#error bad"] },
    { imports: ['<vector"'] },
    { imports: ['"header.hpp>'] },
  ])("rejects invalid C++ metadata %j", (patch) =>
    expect(() => validateMetadata({ ...metadata, ...patch })).toThrow(),
  );
  it("compares standards and filters results within the C++ section", () => {
    const older = parseSnippet(raw),
      newer = parseSnippet(
        serializeSnippet(
          { ...metadata, id: "cpp-newer", cppVersion: 20 },
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
    expect(supportsVersion(older, "20")).toBe(true);
    expect(supportsVersion(newer, "17")).toBe(false);
    const search = createSearch([older, newer, java]),
      filter = { category: "all", tag: "", version: "", favorites: [] };
    expect(search("", { ...filter, language: "cpp", version: "17" })).toEqual([
      older,
    ]);
    expect(
      search("", {
        ...filter,
        language: "cpp",
        category: "favorites",
        favorites: ["cpp-newer", "java-test"],
      }),
    ).toEqual([newer]);
  });
  it("does not allow C++ version fields on existing Java snippets", () =>
    expect(() =>
      validateMetadata({
        id: "java-test",
        title: "Java",
        description: "Test.",
        category: "Java",
        tags: [],
        javaVersion: 8,
        cppVersion: 17,
      }),
    ).toThrow("selected language"));
});
describe("C++ library upgrade and management", () => {
  it("adds C++ once while preserving older sections and existing deletions", async () => {
    const previous = (await loadLibrary()).files.filter(
      (file) => !file.path.startsWith("Cpp/"),
    );
    localStorage.setItem("jsl.library.v1", JSON.stringify(previous));
    (localStorage as unknown as MemoryStorage).data.delete(
      "jsl.cpp-initialized.v1",
    );
    const upgraded = await loadLibrary();
    for (const file of previous)
      expect(upgraded.files.find((f) => f.path === file.path)?.content).toBe(
        file.content,
      );
    expect(
      upgraded.files.filter((f) => f.path.startsWith("Cpp/")),
    ).toHaveLength(15);
    const cpp = upgraded.files.find((f) => f.path.startsWith("Cpp/"))!;
    await deleteSnippet(cpp.path, cpp.content);
    expect((await loadLibrary()).files.some((f) => f.path === cpp.path)).toBe(
      false,
    );
  });
  it("reserves user IDs when adding C++ defaults", async () => {
    const custom = serializeSnippet(
      { ...metadata, id: "cpp-read-text" },
      'std::cout << "custom";',
    );
    localStorage.setItem(
      "jsl.library.v1",
      JSON.stringify([{ path: "custom.md", content: custom }]),
    );
    const files = (await loadLibrary()).files;
    expect(
      files.filter((f) => f.content.includes("id: cpp-read-text")),
    ).toHaveLength(1);
    expect(files.find((f) => f.path === "custom.md")?.content).toBe(custom);
  });
  it("creates, edits, imports, exports and deletes losslessly", async () => {
    const path = await saveSnippet(raw, null, null);
    expect(path).toBe("Cpp/cpp-test.md");
    const updated = raw.replace("Hello, C++!", "Edited C++!");
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
    await exportSnippet(updated, "cpp-test");
    expect(await exported!.text()).toBe(updated);
    await deleteSnippet(path, updated);
    expect((await loadLibrary()).files.some((f) => f.path === path)).toBe(
      false,
    );
  });
  it("migrates older preferences and remembers the C++ section", () => {
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
        cpp: "all",
      },
    });
    writeBrowserPreferences({
      ...defaultPreferences,
      language: "cpp",
      category: "C++ Basics",
      categories: { ...defaultPreferences.categories, cpp: "C++ Basics" },
    });
    expect(readBrowserPreferences()).toMatchObject({
      language: "cpp",
      category: "C++ Basics",
      categories: { cpp: "C++ Basics" },
    });
  });
  it("bundles 15 valid C++ examples with unique IDs across all four languages", () => {
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
      ].flatMap(files),
    );
    expect(result.errors).toEqual([]);
    expect(result.snippets.filter((s) => s.language === "cpp")).toHaveLength(
      15,
    );
    expect(result.snippets).toHaveLength(81);
  });
});
