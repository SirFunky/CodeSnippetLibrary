import { beforeEach, it, expect, vi } from "vitest";
import {
  loadLibrary,
  saveSnippet,
  deleteSnippet,
} from "../src/services/storage";
import {
  parseSnippet,
  indexLibrary,
  templateDraft,
} from "../src/services/markdown";
import { languages, libraryFolders } from "../src/models/languages";
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
it("bundles a complete, self-contained Hello World starter for every language", async () => {
  const { files } = await loadLibrary();
  const all = indexLibrary(files);
  expect(all.errors).toEqual([]);
  expect(all.snippets).toHaveLength(472);
  const starters = all.snippets.filter((s) =>
    s.tags.includes("starter-template"),
  );
  expect(starters).toHaveLength(languages.length);
  for (const language of languages) {
    const starter = starters.find((s) => s.language === language)!;
    expect(starter.title).toContain("Hello World");
    expect(starter.code).toContain("Hello, World!");
    expect(starter.imports).toEqual([]);
    expect(starter.path).toBe(
      `${libraryFolders[language]}Starters/${language}-hello-world.md`,
    );
    expect(starter.notes).toContain("Save as");
  }
});
it("adds starters to an existing library once while preserving edits and deletions", async () => {
  const original = (await loadLibrary()).files.filter(
    (f) => !f.path.includes("Starters/"),
  );
  localStorage.setItem("jsl.library.v1", JSON.stringify(original));
  (localStorage as unknown as MemoryStorage).data.delete(
    "jsl.starters-initialized.v1",
  );
  const files = (await loadLibrary()).files;
  for (const f of original)
    expect(files.find((v) => v.path === f.path)?.content).toBe(f.content);
  const starters = files.filter((f) => f.path.includes("Starters/"));
  expect(starters).toHaveLength(11);
  await deleteSnippet(starters[0].path, starters[0].content);
  const edited = starters[1].content + "\nKeep my changes.\n";
  await saveSnippet(edited, starters[1].path, starters[1].content);
  const again = (await loadLibrary()).files;
  expect(again.some((f) => f.path === starters[0].path)).toBe(false);
  expect(again.find((f) => f.path === starters[1].path)?.content).toBe(edited);
});
it("reserves existing IDs and paths before adding starters", async () => {
  const all = (await loadLibrary()).files;
  const java = all.find((f) => f.path === "Starters/java-hello-world.md")!;
  const custom = java.content.replace("Hello, World!", "My version");
  localStorage.setItem(
    "jsl.library.v1",
    JSON.stringify([
      { path: "custom.md", content: custom },
      {
        path: "Starters/python-hello-world.md",
        content: "keep this user file",
      },
    ]),
  );
  (localStorage as unknown as MemoryStorage).data.delete(
    "jsl.starters-initialized.v1",
  );
  const files = (await loadLibrary()).files;
  expect(
    files.filter((f) => f.content.includes('id: "starter-java-hello-world"')),
  ).toHaveLength(1);
  expect(files.find((f) => f.path === "custom.md")?.content).toBe(custom);
  expect(
    files.find((f) => f.path === "Starters/python-hello-world.md")?.content,
  ).toBe("keep this user file");
});
it("creates an independent template copy while preserving code, notes and other metadata", async () => {
  const files = (await loadLibrary()).files;
  for (const f of files.filter((f) => f.path.includes("Starters/"))) {
    const old = parseSnippet(f.content);
    const source = f.content.replace(
      "description:",
      "customField: keep-me\ndescription:",
    );
    const draft = templateDraft(
      source,
      `my-${old.language}-hello`,
      "My program",
    );
    const copy = parseSnippet(draft);
    expect(copy.id).toBe(`my-${old.language}-hello`);
    expect(copy.title).toBe("My program");
    expect(copy.code).toBe(old.code);
    expect(copy.notes).toBe(old.notes);
    expect(copy.raw).toContain("customField: keep-me");
    expect(f.content).toBe(files.find((v) => v.path === f.path)!.content);
    await saveSnippet(draft, null, null);
    expect(
      (await loadLibrary()).files.find((v) => v.path === f.path)?.content,
    ).toBe(f.content);
  }
});
