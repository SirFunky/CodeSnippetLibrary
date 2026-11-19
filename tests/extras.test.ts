import { bundledCounts } from "./bundled-counts";
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
beforeEach(() => vi.stubGlobal("localStorage", new MemoryStorage()));

it("ships varied language counts and a verification case for every practical extra", async () => {
  const indexed = indexLibrary((await loadLibrary()).files);
  expect(indexed.errors).toEqual([]);
  expect(indexed.snippets).toHaveLength(472);
  for (const language of languages) {
    expect(
      indexed.snippets.filter((s) => s.language === language),
    ).toHaveLength(bundledCounts[language]);
  }
  const cases = JSON.parse(
    readFileSync("scripts/extra-cases.json", "utf8"),
  ) as Record<string, { path: string; language: string; expected: unknown }>;
  expect(new Set(Object.values(bundledCounts)).size).toBeGreaterThan(1);
  const extras = indexed.snippets.filter((s) => s.id.startsWith("extra-"));
  expect(extras).toHaveLength(32);
  expect(Object.keys(cases).sort()).toEqual(extras.map((s) => s.id).sort());
  for (const snippet of extras) {
    const example = cases[snippet.id];
    expect(example.language).toBe(snippet.language);
    expect(
      parseSnippet(readFileSync(example.path, "utf8"), snippet.path).id,
    ).toBe(snippet.id);
    expect(snippet.tags).toContain("practical");
    expect(snippet.imports).toEqual([]);
    expect(snippet.code.length).toBeGreaterThan(30);
  }
  const sql = extras.filter((s) => s.language === "sql");
  expect(sql.filter((s) => s.sqlKind === "query")).toHaveLength(2);
  expect(sql.filter((s) => s.sqlKind === "procedure")).toHaveLength(2);
});

it("adds the collection once to an older library and preserves raw files, edits and deletions", async () => {
  const original = (await loadLibrary()).files.filter(
    (f) => !f.path.includes("Extras/"),
  );
  expect(original).toHaveLength(440);
  localStorage.setItem("jsl.library.v1", JSON.stringify(original));
  (localStorage as unknown as MemoryStorage).data.delete(
    "jsl.extras-initialized.v1",
  );
  const upgraded = (await loadLibrary()).files;
  expect(upgraded).toHaveLength(472);
  for (const old of original)
    expect(upgraded.find((f) => f.path === old.path)).toEqual(old);
  const added = upgraded.filter((f) => f.path.includes("Extras/"));
  const edited = added[0].content + "\nMy private notes.\n";
  await saveSnippet(edited, added[0].path, added[0].content);
  await deleteSnippet(added[1].path, added[1].content);
  const again = (await loadLibrary()).files;
  expect(again).toHaveLength(471);
  expect(again.find((f) => f.path === added[0].path)?.content).toBe(edited);
  expect(again.some((f) => f.path === added[1].path)).toBe(false);
});

it("respects occupied paths and user IDs when upgrading", async () => {
  const all = (await loadLibrary()).files;
  const added = all.filter((f) => f.path.includes("Extras/"));
  const existing = all.filter((f) => !f.path.includes("Extras/"));
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
    "jsl.extras-initialized.v1",
  );
  const upgraded = (await loadLibrary()).files;
  expect(upgraded.find((f) => f.path === custom.path)).toEqual(custom);
  expect(upgraded.find((f) => f.path === occupied.path)).toEqual(occupied);
  expect(upgraded.some((f) => f.path === added[0].path)).toBe(false);
  expect(upgraded).toHaveLength(472);
});
