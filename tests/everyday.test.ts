import { beforeEach, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import {
  loadLibrary,
  saveSnippet,
  deleteSnippet,
} from "../src/services/storage";
import { indexLibrary, parseSnippet } from "../src/services/markdown";
import { languages } from "../src/models/languages";

class MemoryStorage {
  data = new Map<string, string>();
  getItem(key: string) {
    return this.data.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.data.set(key, value);
  }
}
beforeEach(() => {
  vi.stubGlobal("localStorage", new MemoryStorage());
  localStorage.setItem("jsl.extras-initialized.v1", "1");
});

it("validates the original forty-snippet baseline per language and a verification case for every new example", async () => {
  const indexed = indexLibrary((await loadLibrary()).files);
  expect(indexed.errors).toEqual([]);
  expect(indexed.snippets).toHaveLength(440);
  for (const language of languages) {
    expect(
      indexed.snippets.filter((s) => s.language === language),
    ).toHaveLength(40);
  }
  const cases = JSON.parse(
    readFileSync("scripts/everyday-cases.json", "utf8"),
  ) as Record<string, { path: string; language: string; expected: unknown }>;
  const everyday = indexed.snippets.filter((s) => s.id.startsWith("everyday-"));
  expect(everyday).toHaveLength(243);
  expect(Object.keys(cases).sort()).toEqual(everyday.map((s) => s.id).sort());
  for (const snippet of everyday) {
    const example = cases[snippet.id];
    expect(example.language).toBe(snippet.language);
    expect(
      parseSnippet(readFileSync(example.path, "utf8"), snippet.path).id,
    ).toBe(snippet.id);
    expect(snippet.tags).toContain("everyday");
    expect(snippet.imports).toEqual([]);
    expect(snippet.code.length).toBeGreaterThan(30);
  }
  const sql = everyday.filter((s) => s.language === "sql");
  expect(sql.filter((s) => s.sqlKind === "query")).toHaveLength(16);
  expect(sql.filter((s) => s.sqlKind === "procedure")).toHaveLength(8);
});

it("adds the collection once to an older library and preserves raw files, edits and deletions", async () => {
  const original = (await loadLibrary()).files.filter(
    (f) => !f.path.includes("Everyday/"),
  );
  expect(original).toHaveLength(197);
  localStorage.setItem("jsl.library.v1", JSON.stringify(original));
  (localStorage as unknown as MemoryStorage).data.delete(
    "jsl.everyday-initialized.v1",
  );
  const upgraded = (await loadLibrary()).files;
  expect(upgraded).toHaveLength(440);
  for (const old of original)
    expect(upgraded.find((f) => f.path === old.path)).toEqual(old);
  const added = upgraded.filter((f) => f.path.includes("Everyday/"));
  const edited = added[0].content + "\nMy private notes.\n";
  await saveSnippet(edited, added[0].path, added[0].content);
  await deleteSnippet(added[1].path, added[1].content);
  const again = (await loadLibrary()).files;
  expect(again).toHaveLength(439);
  expect(again.find((f) => f.path === added[0].path)?.content).toBe(edited);
  expect(again.some((f) => f.path === added[1].path)).toBe(false);
});

it("respects occupied paths and user IDs when upgrading", async () => {
  const all = (await loadLibrary()).files;
  const added = all.filter((f) => f.path.includes("Everyday/"));
  const existing = all.filter((f) => !f.path.includes("Everyday/"));
  const custom = {
    path: "my-example.md",
    content: added[0].content + "\nKeep this variant.\n",
  };
  const occupied = {
    path: added[1].path,
    content: "User document without snippet metadata\n",
  };
  localStorage.setItem(
    "jsl.library.v1",
    JSON.stringify([...existing, custom, occupied]),
  );
  (localStorage as unknown as MemoryStorage).data.delete(
    "jsl.everyday-initialized.v1",
  );
  const upgraded = (await loadLibrary()).files;
  expect(upgraded.find((f) => f.path === custom.path)).toEqual(custom);
  expect(upgraded.find((f) => f.path === occupied.path)).toEqual(occupied);
  expect(upgraded.some((f) => f.path === added[0].path)).toBe(false);
  expect(upgraded).toHaveLength(440);
});
