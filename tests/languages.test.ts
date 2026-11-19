import { beforeEach, describe, it, expect, vi } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  parseSnippet,
  serializeSnippet,
  indexLibrary,
  withImports,
  validateMetadata,
} from "../src/services/markdown";
import {
  loadLibrary,
  saveSnippet,
  deleteSnippet,
  normalizePreferences,
  writeBrowserPreferences,
  readBrowserPreferences,
  exportSnippet,
} from "../src/services/storage";
import { createSearch, categoryTree } from "../src/search/search";
import type { Metadata, LibraryFile } from "../src/models/snippet";
import { defaultPreferences } from "../src/models/snippet";
import { supportsVersion } from "../src/models/languages";
const python: Metadata = {
  id: "test-python",
  title: "Read a Python file",
  description: "Read UTF-8 text.",
  language: "python",
  category: "Files & I/O",
  tags: ["file", "python"],
  pythonVersion: "3.9",
  imports: ["from pathlib import Path", "import json"],
};
const raw = serializeSnippet(
  python,
  'content = Path("example.txt").read_text(encoding="utf-8")',
  "Keep indentation.",
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
describe("Python Markdown", () => {
  it("round trips language, quoted version, imports and notes", () => {
    const s = parseSnippet(raw);
    expect(s.language).toBe("python");
    expect(s.pythonVersion).toBe("3.9");
    expect(s.javaVersion).toBeUndefined();
    expect(s.notes).toBe("Keep indentation.");
    expect(withImports(s)).toBe(
      "from pathlib import Path\nimport json\n\n" + s.code,
    );
    expect(raw).toContain('pythonVersion: "3.9"');
  });
  it("keeps old Java files compatible without rewriting them", () => {
    const legacy = serializeSnippet(
      {
        id: "legacy-java",
        title: "Old Java",
        description: "Existing file.",
        category: "Java Basics",
        tags: [],
        javaVersion: 8,
      },
      "int answer = 42;",
    );
    const s = parseSnippet(legacy);
    expect(s.language).toBe("java");
    expect(s.raw).toBe(legacy);
    expect(legacy).not.toContain("language:");
    expect(
      withImports({ ...s, imports: ["java.util.List"] }).startsWith(
        "import java.util.List;",
      ),
    ).toBe(true);
  });
  it("uses Python primary blocks and preserves additional examples", () => {
    const s = parseSnippet(
      raw +
        '\n```java\nint value = 1;\n```\n\n```python primary\nif True:\n    print("primary")\n```\n',
    );
    expect(s.blocks).toHaveLength(2);
    expect(s.code).toBe('if True:\n    print("primary")');
    expect(() => parseSnippet(raw.replace("```python", "```java"))).toThrow(
      "Python",
    );
  });
  it("rejects two marked primary Python blocks", () =>
    expect(() =>
      parseSnippet(
        raw +
          "\n```python primary\nx = 1\n```\n```python primary\ny = 2\n```\n",
      ),
    ).toThrow("Only one Python"));
  it.each([
    { pythonVersion: 3.9 },
    { pythonVersion: "3.09" },
    { pythonVersion: "2.7" },
    { pythonVersion: "3.9.1" },
    { javaVersion: 8 },
    { language: "ruby" },
    { language: null },
    { imports: ["import os; print(1)"] },
    { imports: ["from pathlib import Path\nprint(1)"] },
    { id: "../outside" },
  ])("rejects invalid Python metadata %j", (patch) =>
    expect(() => validateMetadata({ ...python, ...patch })).toThrow(),
  );
  it("compares Python 3.10 and 3.9 as versions", () => {
    expect(supportsVersion({ ...python, pythonVersion: "3.10" }, "3.9")).toBe(
      false,
    );
    expect(supportsVersion(python, "3.10")).toBe(true);
    expect(supportsVersion(python, "3.9")).toBe(true);
  });
  it("limits language searches and combines version/tag/favorite filters", () => {
    const py = parseSnippet(raw),
      newer = parseSnippet(
        serializeSnippet(
          { ...python, id: "newer", pythonVersion: "3.10" },
          'print("newer")',
        ),
      ),
      java = parseSnippet(
        serializeSnippet(
          {
            id: "java-read",
            title: "Read file",
            description: "Java text.",
            category: "Java Basics",
            tags: ["file"],
            javaVersion: 8,
          },
          'String text = "Java";',
        ),
      );
    const search = createSearch([py, newer, java]),
      filter = { category: "all", tag: "", version: "", favorites: [] };
    expect(
      search("", { ...filter, language: "python" }).map((s) => s.id),
    ).toEqual(["test-python", "newer"]);
    expect(
      search("", { ...filter, language: "java" }).map((s) => s.id),
    ).toEqual(["java-read"]);
    expect(
      search("", {
        ...filter,
        language: "python",
        version: "3.9",
        tag: "file",
        category: "favorites",
        favorites: ["test-python", "java-read"],
      }),
    ).toEqual([py]);
    expect(categoryTree([py, newer]).map((c) => c.name)).toEqual([
      "Files & I/O",
    ]);
  });
});
describe("Upgrade and Python management", () => {
  it("adds Python defaults to an existing library without changing user edits", async () => {
    const legacy = serializeSnippet(
      {
        id: "existing",
        title: "My edited Java",
        description: "Keep me.",
        category: "Custom category",
        tags: [],
        javaVersion: 8,
      },
      "int custom = 7;",
    );
    localStorage.setItem(
      "jsl.library.v1",
      JSON.stringify([{ path: "custom.md", content: legacy }]),
    );
    const library = await loadLibrary(),
      indexed = indexLibrary(library.files);
    expect(library.files.find((f) => f.path === "custom.md")?.content).toBe(
      legacy,
    );
    expect(indexed.errors).toEqual([]);
    expect(indexed.snippets.filter((s) => s.language === "java")).toHaveLength(8);
    expect(
      indexed.snippets.filter((s) => s.language === "python"),
    ).toHaveLength(44);
    expect((await loadLibrary()).files).toEqual(library.files);
  });
  it("does not restore deleted Python defaults on subsequent loads", async () => {
    const file = (await loadLibrary()).files.find((f) =>
      f.path.startsWith("Python/"),
    )!;
    await deleteSnippet(file.path, file.content);
    expect((await loadLibrary()).files.some((f) => f.path === file.path)).toBe(
      false,
    );
  });
  it("respects an existing ID when upgrading Python defaults", async () => {
    const edited = serializeSnippet(
      { ...python, id: "py-read-text" },
      'print("user edit")',
    );
    localStorage.setItem(
      "jsl.library.v1",
      JSON.stringify([{ path: "elsewhere.md", content: edited }]),
    );
    const library = await loadLibrary();
    expect(
      library.files.filter((f) => f.content.includes("id: py-read-text")),
    ).toHaveLength(1);
    expect(library.files.find((f) => f.path === "elsewhere.md")?.content).toBe(
      edited,
    );
  });
  it("creates, edits, imports and exports Python content losslessly", async () => {
    const path = await saveSnippet(raw, null, null);
    expect(path).toBe("Python/test-python.md");
    const edited = raw.replace("Keep indentation.", "Updated Python notes.");
    await saveSnippet(edited, path, raw);
    await expect(saveSnippet(raw, null, null)).rejects.toThrow("Duplicate");
    await expect(saveSnippet(raw, path, raw)).rejects.toThrow("changed");
    const file = (await loadLibrary()).files.find((f) => f.path === path)!;
    expect(file.content).toBe(edited);
    let exported: Blob | undefined;
    vi.stubGlobal("URL", {
      createObjectURL: (blob: Blob) => {
        exported = blob;
        return "blob:test";
      },
      revokeObjectURL: vi.fn(),
    });
    vi.stubGlobal("document", { createElement: () => ({ click: vi.fn() }) });
    await exportSnippet(file.content, "test-python");
    expect(await exported!.text()).toBe(edited);
    await deleteSnippet(path, edited);
    expect((await loadLibrary()).files.some((f) => f.path === path)).toBe(
      false,
    );
  });
  it("migrates Java categories and remembers both section categories", () => {
    const migrated = normalizePreferences({
      category: "Collections",
      favorites: ["files-read-text"],
    });
    expect(migrated.language).toBe("java");
    expect(migrated.categories).toEqual({
      ...defaultPreferences.categories,
      java: "Collections",
    });
    writeBrowserPreferences({
      ...defaultPreferences,
      language: "python",
      category: "Data formats",
      categories: {
        ...defaultPreferences.categories,
        java: "Strings",
        python: "Data formats",
      },
    });
    expect(readBrowserPreferences()).toMatchObject({
      language: "python",
      category: "Data formats",
      categories: { java: "Strings", python: "Data formats" },
    });
  });
  it("bundles fifteen valid Python snippets with globally unique IDs", () => {
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
    const result = indexLibrary([
      ...files("DefaultSnippets"),
      ...files("DefaultPythonSnippets"),
    ]);
    expect(result.errors).toEqual([]);
    expect(result.snippets.filter((s) => s.language === "python")).toHaveLength(
      15,
    );
    expect(result.snippets.filter((s) => s.language === "java")).toHaveLength(
      36,
    );
  });
});
