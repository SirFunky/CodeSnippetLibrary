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
  writeBrowserPreferences,
  readBrowserPreferences,
  exportSnippet,
} from "../src/services/storage";
import { createSearch } from "../src/search/search";
import {
  defaultPreferences,
  type Metadata,
  type LibraryFile,
} from "../src/models/snippet";
import { versionLabel } from "../src/models/languages";
const query: Metadata = {
  id: "sql-test",
  title: "Test SQL query",
  description: "Test query.",
  language: "sql",
  category: "Queries",
  tags: ["sql"],
  sqlDialect: "sqlite",
  sqlKind: "query",
  sqlVersion: "3.25",
};
const raw = serializeSnippet(
  query,
  "SELECT 42 AS answer;",
  "Requires no tables.",
);
const proc: Metadata = {
  ...query,
  id: "sql-procedure",
  title: "Test stored procedure",
  category: "Stored Procedures",
  sqlDialect: "sqlserver",
  sqlKind: "procedure",
  sqlVersion: "2017",
};
const procedure = serializeSnippet(
  proc,
  "CREATE OR ALTER PROCEDURE dbo.Answer\nAS\nBEGIN\n    SET NOCOUNT ON;\n    SELECT 42 AS answer;\nEND;",
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
describe("SQL metadata and Markdown", () => {
  it("round trips dialect, type, version, indentation and notes", () => {
    const snippet = parseSnippet(raw);
    expect(snippet.language).toBe("sql");
    expect(snippet.sqlDialect).toBe("sqlite");
    expect(snippet.sqlKind).toBe("query");
    expect(snippet.sqlVersion).toBe("3.25");
    expect(snippet.notes).toBe("Requires no tables.");
    expect(withImports(snippet)).toBe(snippet.code);
    expect(versionLabel(snippet)).toBe("SQLite 3.25");
    expect(raw).toContain('sqlVersion: "3.25"');
  });
  it("copies only the primary procedure while preserving its invocation block", () => {
    const source =
      procedure.replace("```sql", "```sql primary") +
      "\n```sql\nEXEC dbo.Answer;\n```\n";
    const snippet = parseSnippet(source);
    expect(snippet.blocks).toHaveLength(2);
    expect(snippet.code).toContain("    SET NOCOUNT ON;");
    expect(withImports(snippet)).not.toContain("EXEC dbo.Answer");
    expect(snippet.raw).toBe(source);
  });
  it("requires nonempty matching fences and rejects multiple primary blocks", () => {
    expect(() => parseSnippet(raw.replace("```sql", "```java"))).toThrow("SQL");
    expect(() =>
      parseSnippet(
        raw +
          "\n```sql primary\nSELECT 1;\n```\n```sql primary\nSELECT 2;\n```\n",
      ),
    ).toThrow("Only one SQL");
  });
  it.each([
    { sqlDialect: undefined },
    { sqlDialect: "oracle" },
    { sqlKind: undefined },
    { sqlKind: "function" },
    { sqlVersion: 3.25 },
    { sqlVersion: undefined },
    { sqlVersion: "3.x" },
    { sqlVersion: "03.25" },
    { sqlKind: "procedure" },
    { javaVersion: 8 },
    { pythonVersion: "3.9" },
    { csharpVersion: "8.0" },
    { dotnetVersion: "8.0" },
    { cppVersion: 17 },
    { imports: ["System"] },
  ])("rejects invalid SQL metadata %j", (patch) =>
    expect(() => validateMetadata({ ...query, ...patch })).toThrow(),
  );
  it("distinguishes database versions and stored-procedure support", () => {
    expect(() => validateMetadata({ ...proc, sqlVersion: "16.0" })).toThrow(
      "release year",
    );
    expect(() =>
      validateMetadata({ ...proc, sqlDialect: "postgresql", sqlVersion: "10" }),
    ).toThrow("11 or later");
    expect(() =>
      validateMetadata({ ...proc, sqlDialect: "postgresql", sqlVersion: "11" }),
    ).not.toThrow();
    expect(() =>
      validateMetadata({ ...proc, sqlDialect: "mysql", sqlVersion: "4.1" }),
    ).toThrow("5 or later");
    expect(() =>
      validateMetadata({ ...proc, sqlDialect: "mysql", sqlVersion: "8.0" }),
    ).not.toThrow();
  });
  it("rejects SQL metadata attached to a legacy Java file", () =>
    expect(() =>
      validateMetadata({
        id: "java-test",
        title: "Java",
        description: "Old file.",
        category: "Java",
        tags: [],
        javaVersion: 8,
        sqlDialect: "sqlite",
      }),
    ).toThrow("selected language"));
  it("combines dialect/type/version filters without comparing unrelated databases", () => {
    const sqlite = parseSnippet(raw),
      server = parseSnippet(procedure),
      postgres = parseSnippet(
        serializeSnippet(
          {
            ...proc,
            id: "postgres-procedure",
            sqlDialect: "postgresql",
            sqlVersion: "14",
          },
          "CREATE PROCEDURE example() LANGUAGE SQL AS $$ SELECT 1; $$;",
        ),
      );
    const search = createSearch([sqlite, server, postgres]),
      filter = {
        language: "sql" as const,
        category: "all",
        tag: "",
        version: "",
        favorites: [],
      };
    expect(search("", { ...filter, sqlDialect: "sqlite" })).toEqual([sqlite]);
    expect(search("", { ...filter, sqlKind: "procedure" })).toEqual([
      server,
      postgres,
    ]);
    expect(
      search("", {
        ...filter,
        sqlDialect: "sqlserver",
        sqlKind: "procedure",
        version: "2017",
      }),
    ).toEqual([server]);
    expect(
      search("", { ...filter, sqlDialect: "sqlserver", version: "2016" }),
    ).toEqual([]);
    expect(search("", { ...filter, version: "2017" })).toEqual([]);
    expect(
      search("", {
        ...filter,
        category: "favorites",
        favorites: ["sql-procedure"],
      }),
    ).toEqual([server]);
  });
});
describe("SQL library management and upgrades", () => {
  it("adds SQL once while preserving earlier content and subsequent deletions", async () => {
    const previous = (await loadLibrary()).files.filter(
      (f) => !f.path.startsWith("SQL/"),
    );
    localStorage.setItem("jsl.library.v1", JSON.stringify(previous));
    (localStorage as unknown as MemoryStorage).data.delete(
      "jsl.sql-initialized.v1",
    );
    const upgraded = await loadLibrary();
    for (const file of previous)
      expect(upgraded.files.find((f) => f.path === file.path)?.content).toBe(
        file.content,
      );
    expect(
      upgraded.files.filter((f) => f.path.startsWith("SQL/")),
    ).toHaveLength(15);
    const file = upgraded.files.find((f) => f.path.startsWith("SQL/"))!;
    await deleteSnippet(file.path, file.content);
    expect((await loadLibrary()).files.some((f) => f.path === file.path)).toBe(
      false,
    );
  });
  it("reserves existing SQL IDs before seeding defaults", async () => {
    const custom = serializeSnippet(
      { ...query, id: "sql-proc-input" },
      "SELECT 100;",
    );
    localStorage.setItem(
      "jsl.library.v1",
      JSON.stringify([{ path: "custom.md", content: custom }]),
    );
    const files = (await loadLibrary()).files;
    expect(
      files.filter((f) => f.content.includes("id: sql-proc-input")),
    ).toHaveLength(1);
    expect(files.find((f) => f.path === "custom.md")?.content).toBe(custom);
  });
  it("creates, edits, imports, exports and deletes complete SQL Markdown", async () => {
    const path = await saveSnippet(procedure, null, null);
    expect(path).toBe("SQL/sql-procedure.md");
    const updated = procedure.replace("SELECT 42", "SELECT 43");
    await saveSnippet(updated, path, procedure);
    await expect(saveSnippet(procedure, path, procedure)).rejects.toThrow(
      "changed",
    );
    await expect(saveSnippet(procedure, null, null)).rejects.toThrow(
      "Duplicate",
    );
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
    await exportSnippet(updated, "sql-procedure");
    expect(await exported!.text()).toBe(updated);
    await deleteSnippet(path, updated);
    expect((await loadLibrary()).files.some((f) => f.path === path)).toBe(
      false,
    );
  });
  it("migrates earlier preferences and remembers the SQL category", () => {
    expect(
      normalizePreferences({ language: "cpp", category: "Collections" }),
    ).toMatchObject({ language: "cpp", categories: { sql: "all" } });
    writeBrowserPreferences({
      ...defaultPreferences,
      language: "sql",
      category: "Stored Procedures",
      categories: {
        ...defaultPreferences.categories,
        sql: "Stored Procedures",
      },
    });
    expect(readBrowserPreferences()).toMatchObject({
      language: "sql",
      category: "Stored Procedures",
      categories: { sql: "Stored Procedures" },
    });
  });
  it("bundles 9 queries and 6 procedures with unique IDs across 96 snippets", () => {
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
        "DefaultSqlSnippets",
      ].flatMap(files),
    );
    expect(result.errors).toEqual([]);
    expect(result.snippets).toHaveLength(96);
    expect(result.snippets.filter((s) => s.sqlKind === "query")).toHaveLength(
      9,
    );
    expect(
      result.snippets.filter((s) => s.sqlKind === "procedure"),
    ).toHaveLength(6);
  });
});
