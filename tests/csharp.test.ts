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
import { createSearch } from "../src/search/search";
import type { Metadata, LibraryFile } from "../src/models/snippet";
import { defaultPreferences } from "../src/models/snippet";
import { supportsVersion } from "../src/models/languages";
const metadata: Metadata = {
  id: "test-csharp",
  title: "C# example",
  description: "A C# snippet.",
  language: "csharp",
  category: "C# Basics",
  tags: ["csharp"],
  csharpVersion: "8.0",
  dotnetVersion: "8.0",
  imports: ["System", "System.Linq"],
};
const raw = serializeSnippet(
  metadata,
  'if (true)\n{\n    Console.WriteLine("Hello, C#!");\n}',
  "Requires .NET 8.",
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
describe("C# parsing, imports and filters", () => {
  it("preserves the .NET target, code indentation and quoted language version", () => {
    const snippet = parseSnippet(raw);
    expect(snippet.language).toBe("csharp");
    expect(snippet.csharpVersion).toBe("8.0");
    expect(snippet.dotnetVersion).toBe("8.0");
    expect(snippet.code).toContain("    Console.WriteLine");
    expect(withImports(snippet)).toBe(
      "using System;\nusing System.Linq;\n\n" + snippet.code,
    );
    expect(raw).toContain('csharpVersion: "8.0"');
    expect(raw).toContain('dotnetVersion: "8.0"');
  });
  it("supports static using directives and a primary C# block", () => {
    const source =
      serializeSnippet(
        { ...metadata, imports: ["static System.Math"] },
        "var initial = 1;",
      ) +
      "\n```python\nprint(1)\n```\n\n```csharp primary\nvar answer = Abs(-42);\n```\n";
    const snippet = parseSnippet(source);
    expect(snippet.blocks).toHaveLength(2);
    expect(snippet.code).toBe("var answer = Abs(-42);");
    expect(withImports(snippet)).toBe(
      "using static System.Math;\n\nvar answer = Abs(-42);",
    );
  });
  it("requires matching code fences and rejects multiple primary blocks", () => {
    expect(() => parseSnippet(raw.replace("```csharp", "```java"))).toThrow(
      "C#",
    );
    expect(() =>
      parseSnippet(
        raw +
          "\n```csharp primary\nint x=1;\n```\n```csharp primary\nint y=2;\n```\n",
      ),
    ).toThrow("Only one C#");
  });
  it.each([
    { csharpVersion: 8 },
    { csharpVersion: "8" },
    { csharpVersion: "08.0" },
    { csharpVersion: undefined },
    { dotnetVersion: 8 },
    { dotnetVersion: undefined },
    { dotnetVersion: "4.8" },
    { pythonVersion: "3.9" },
    { javaVersion: 8 },
    { imports: ["using System;"] },
    { imports: ["System; Console.WriteLine(1)"] },
  ])("rejects invalid C# metadata %j", (patch) =>
    expect(() => validateMetadata({ ...metadata, ...patch })).toThrow(),
  );
  it("rejects C# version fields on Java or Python files", () => {
    expect(() =>
      validateMetadata({
        id: "test",
        title: "Test",
        description: "Test.",
        category: "Test",
        tags: [],
        javaVersion: 8,
        csharpVersion: "8.0",
      }),
    ).toThrow("selected language");
  });
  it("compares C# versions numerically and scopes search to the section", () => {
    const older = parseSnippet(raw),
      newer = parseSnippet(
        serializeSnippet(
          { ...metadata, id: "new-csharp", csharpVersion: "12.0" },
          "int[] values = [1,2];",
        ),
      ),
      python = parseSnippet(
        serializeSnippet(
          {
            id: "py-other",
            title: "Python",
            description: "Python example.",
            category: "Python Basics",
            tags: [],
            language: "python",
            pythonVersion: "3.9",
          },
          "print(1)",
        ),
      );
    const search = createSearch([older, newer, python]),
      filters = { category: "all", tag: "", version: "", favorites: [] };
    expect(supportsVersion(older, "10.0")).toBe(true);
    expect(supportsVersion(newer, "8.0")).toBe(false);
    expect(
      search("", { ...filters, language: "csharp", version: "8.0" }),
    ).toEqual([older]);
    expect(
      search("", {
        ...filters,
        language: "csharp",
        category: "favorites",
        favorites: ["py-other", "new-csharp"],
      }),
    ).toEqual([newer]);
  });
});
describe("C# upgrade and persistence", () => {
  it("adds C# once without reseeding or modifying Java/Python", async () => {
    const python = serializeSnippet(
      {
        id: "custom-python",
        title: "My Python",
        description: "Edited.",
        category: "Custom",
        language: "python",
        pythonVersion: "3.9",
        tags: [],
      },
      'print("keep")',
    );
    localStorage.setItem(
      "jsl.library.v1",
      JSON.stringify([{ path: "Python/custom.md", content: python }]),
    );
    localStorage.setItem("jsl.python-initialized.v1", "1");
    const library = await loadLibrary(),
      indexed = indexLibrary(library.files);
    expect(indexed.errors).toEqual([]);
    expect(
      library.files.find((f) => f.path === "Python/custom.md")?.content,
    ).toBe(python);
    expect(
      indexed.snippets.filter((s) => s.language === "csharp"),
    ).toHaveLength(43);
    expect(
      indexed.snippets.filter((s) => s.language === "python"),
    ).toHaveLength(30);
    expect(indexed.snippets.filter((s) => s.language === "java")).toHaveLength(
      7,
    );
    expect((await loadLibrary()).files).toEqual(library.files);
    const file = library.files.find((f) => f.path.startsWith("CSharp/"))!;
    await deleteSnippet(file.path, file.content);
    expect((await loadLibrary()).files.some((f) => f.path === file.path)).toBe(
      false,
    );
  });
  it("preserves existing IDs when seeding C#", async () => {
    const custom = serializeSnippet(
      { ...metadata, id: "cs-read-text" },
      'Console.WriteLine("custom");',
    );
    localStorage.setItem(
      "jsl.library.v1",
      JSON.stringify([{ path: "custom.md", content: custom }]),
    );
    const files = (await loadLibrary()).files;
    expect(
      files.filter((f) => f.content.includes("id: cs-read-text")),
    ).toHaveLength(1);
    expect(files.find((f) => f.path === "custom.md")?.content).toBe(custom);
  });
  it("creates, edits, imports, exports and deletes C# without changing Markdown", async () => {
    const path = await saveSnippet(raw, null, null);
    expect(path).toBe("CSharp/test-csharp.md");
    const edited = raw.replace("Hello, C#!", "Edited C#!");
    await saveSnippet(edited, path, raw);
    await expect(saveSnippet(raw, path, raw)).rejects.toThrow("changed");
    await expect(saveSnippet(raw, null, null)).rejects.toThrow("Duplicate");
    expect(
      (await loadLibrary()).files.find((f) => f.path === path)?.content,
    ).toBe(edited);
    let exported: Blob | undefined;
    vi.stubGlobal("URL", {
      createObjectURL: (blob: Blob) => {
        exported = blob;
        return "blob:test";
      },
      revokeObjectURL: vi.fn(),
    });
    vi.stubGlobal("document", { createElement: () => ({ click: vi.fn() }) });
    await exportSnippet(edited, "test-csharp");
    expect(await exported!.text()).toBe(edited);
    await deleteSnippet(path, edited);
    expect((await loadLibrary()).files.some((f) => f.path === path)).toBe(
      false,
    );
  });
  it("migrates old preferences and remembers all three categories", () => {
    expect(
      normalizePreferences({
        language: "python",
        category: "Data formats",
        categories: { java: "Strings", python: "Data formats" },
      }),
    ).toMatchObject({
      language: "python",
      categories: { java: "Strings", python: "Data formats", csharp: "all" },
    });
    writeBrowserPreferences({
      ...defaultPreferences,
      language: "csharp",
      category: "C# Basics",
      categories: {
        ...defaultPreferences.categories,
        java: "Strings",
        python: "Data formats",
        csharp: "C# Basics",
      },
    });
    expect(readBrowserPreferences()).toMatchObject({
      language: "csharp",
      category: "C# Basics",
      categories: {
        java: "Strings",
        python: "Data formats",
        csharp: "C# Basics",
      },
    });
  });
  it("bundles fifteen valid C# examples with globally unique IDs", () => {
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
      ...files("DefaultCSharpSnippets"),
    ]);
    expect(result.errors).toEqual([]);
    expect(result.snippets.filter((s) => s.language === "csharp")).toHaveLength(
      15,
    );
    expect(result.snippets).toHaveLength(66);
  });
});
