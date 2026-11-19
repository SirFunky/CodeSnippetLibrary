import { invoke, isTauri } from "@tauri-apps/api/core";
import {
  defaultPreferences,
  type Preferences,
  type LibraryResult,
  type LibraryFile,
} from "../models/snippet";
import { parseSnippet, frontmatterId } from "./markdown";
import { libraryFolders } from "../models/languages";
export const native = isTauri();
const LIBRARY = "jsl.library.v1",
  PREFS = "jsl.preferences.v1";
const defaults = import.meta.glob("../../DefaultSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const pythonDefaults = import.meta.glob("../../DefaultPythonSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const PYTHON_INITIALIZED = "jsl.python-initialized.v1";
const csharpDefaults = import.meta.glob("../../DefaultCSharpSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const CSHARP_INITIALIZED = "jsl.csharp-initialized.v1";
const cppDefaults = import.meta.glob("../../DefaultCppSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const CPP_INITIALIZED = "jsl.cpp-initialized.v1";
const cDefaults = import.meta.glob("../../DefaultCSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const C_INITIALIZED = "jsl.c-initialized.v1";
const sqlDefaults = import.meta.glob("../../DefaultSqlSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const SQL_INITIALIZED = "jsl.sql-initialized.v1";
const typescriptDefaults = import.meta.glob(
  "../../DefaultTypeScriptSnippets/**/*.md",
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;
const TYPESCRIPT_INITIALIZED = "jsl.typescript-initialized.v1";
const javascriptDefaults = import.meta.glob(
  "../../DefaultJavaScriptSnippets/**/*.md",
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;
const JAVASCRIPT_INITIALIZED = "jsl.javascript-initialized.v1";
const goDefaults = import.meta.glob("../../DefaultGoSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const GO_INITIALIZED = "jsl.go-initialized.v1";
const kotlinDefaults = import.meta.glob("../../DefaultKotlinSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const KOTLIN_INITIALIZED = "jsl.kotlin-initialized.v1";
const cobolDefaults = import.meta.glob("../../DefaultCobolSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const COBOL_INITIALIZED = "jsl.cobol-initialized.v1";
const starterDefaults = import.meta.glob("../../StarterSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const STARTERS_INITIALIZED = "jsl.starters-initialized.v1";
const everydayDefaults = import.meta.glob("../../EverydaySnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const EVERYDAY_INITIALIZED = "jsl.everyday-initialized.v1";
const extraDefaults = import.meta.glob("../../ExtraSnippets/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;
const EXTRAS_INITIALIZED = "jsl.extras-initialized.v1";
export function readBrowserPreferences(
  storage: Pick<Storage, "getItem"> = localStorage,
): Preferences {
  try {
    return normalizePreferences(JSON.parse(storage.getItem(PREFS) ?? "{}"));
  } catch {
    return { ...defaultPreferences };
  }
}
export function normalizePreferences(value: unknown): Preferences {
  const v = (
    value && typeof value === "object" ? value : {}
  ) as Partial<Preferences>;
  return {
    ...defaultPreferences,
    language:
      v.language === "python" ||
      v.language === "csharp" ||
      v.language === "cpp" ||
      v.language === "c" ||
      v.language === "sql" ||
      v.language === "typescript" ||
      v.language === "javascript" ||
      v.language === "go" ||
      v.language === "kotlin" ||
      v.language === "cobol"
        ? v.language
        : "java",
    categories: {
      java:
        typeof v.categories?.java === "string"
          ? v.categories.java
          : typeof v.category === "string"
            ? v.category
            : "all",
      python:
        typeof v.categories?.python === "string" ? v.categories.python : "all",
      csharp:
        typeof v.categories?.csharp === "string" ? v.categories.csharp : "all",
      cpp: typeof v.categories?.cpp === "string" ? v.categories.cpp : "all",
      c: typeof v.categories?.c === "string" ? v.categories.c : "all",
      go: typeof v.categories?.go === "string" ? v.categories.go : "all",
      cobol:
        typeof v.categories?.cobol === "string" ? v.categories.cobol : "all",
      kotlin:
        typeof v.categories?.kotlin === "string" ? v.categories.kotlin : "all",
      javascript:
        typeof v.categories?.javascript === "string"
          ? v.categories.javascript
          : "all",
      sql: typeof v.categories?.sql === "string" ? v.categories.sql : "all",
      typescript:
        typeof v.categories?.typescript === "string"
          ? v.categories.typescript
          : "all",
    },
    favorites: Array.isArray(v.favorites)
      ? v.favorites.filter((x) => typeof x === "string")
      : [],
    recent: Array.isArray(v.recent)
      ? v.recent.filter((x) => typeof x === "string").slice(0, 30)
      : [],
    theme: ["dark", "light", "system"].includes(v.theme ?? "")
      ? v.theme!
      : defaultPreferences.theme,
    category: typeof v.category === "string" ? v.category : "all",
    fontSize: Math.min(20, Math.max(11, Number(v.fontSize) || 13)),
    navWidth: Math.min(330, Math.max(185, Number(v.navWidth) || 232)),
    listWidth: Math.min(560, Math.max(280, Number(v.listWidth) || 370)),
    collapsed: !!v.collapsed,
  };
}
export function writeBrowserPreferences(
  p: Preferences,
  storage: Pick<Storage, "setItem"> = localStorage,
) {
  storage.setItem(PREFS, JSON.stringify(p));
}
function browserFiles(): LibraryFile[] {
  const saved = localStorage.getItem(LIBRARY);
  let files: LibraryFile[];
  if (saved !== null) {
    const parsed = JSON.parse(saved);
    if (
      !Array.isArray(parsed) ||
      !parsed.every(
        (f) => f && typeof f.path === "string" && typeof f.content === "string",
      )
    )
      throw new Error(
        "Browser library is invalid. Export browser storage before resetting it.",
      );
    files = parsed;
  } else
    files = Object.entries(defaults).map(([path, content]) => ({
      path: path.split("DefaultSnippets/")[1],
      content,
    }));
  for (const [marker, collection, source, folder] of [
    [PYTHON_INITIALIZED, pythonDefaults, "DefaultPythonSnippets/", "Python/"],
    [CSHARP_INITIALIZED, csharpDefaults, "DefaultCSharpSnippets/", "CSharp/"],
    [CPP_INITIALIZED, cppDefaults, "DefaultCppSnippets/", "Cpp/"],
    [C_INITIALIZED, cDefaults, "DefaultCSnippets/", "C/"],
    [GO_INITIALIZED, goDefaults, "DefaultGoSnippets/", "Go/"],
    [KOTLIN_INITIALIZED, kotlinDefaults, "DefaultKotlinSnippets/", "Kotlin/"],
    [COBOL_INITIALIZED, cobolDefaults, "DefaultCobolSnippets/", "COBOL/"],
    [STARTERS_INITIALIZED, starterDefaults, "StarterSnippets/", ""],
    [EVERYDAY_INITIALIZED, everydayDefaults, "EverydaySnippets/", ""],
    [EXTRAS_INITIALIZED, extraDefaults, "ExtraSnippets/", ""],
    [
      JAVASCRIPT_INITIALIZED,
      javascriptDefaults,
      "DefaultJavaScriptSnippets/",
      "JavaScript/",
    ],
    [SQL_INITIALIZED, sqlDefaults, "DefaultSqlSnippets/", "SQL/"],
    [
      TYPESCRIPT_INITIALIZED,
      typescriptDefaults,
      "DefaultTypeScriptSnippets/",
      "TypeScript/",
    ],
  ] as const) {
    if (!localStorage.getItem(marker)) {
      const paths = new Set(files.map((f) => f.path)),
        ids = new Set(files.map((f) => frontmatterId(f.content)));
      for (const [path, content] of Object.entries(collection)) {
        const target = `${folder}${path.split(source)[1]}`;
        if (!paths.has(target) && !ids.has(frontmatterId(content))) {
          files.push({ path: target, content });
          paths.add(target);
          ids.add(frontmatterId(content));
        }
      }
      localStorage.setItem(LIBRARY, JSON.stringify(files));
      localStorage.setItem(marker, "1");
    } else if (saved === null)
      localStorage.setItem(LIBRARY, JSON.stringify(files));
  }
  return files;
}
export const loadLibrary = (): Promise<LibraryResult> =>
  native
    ? invoke("load_library")
    : Promise.resolve({
        files: browserFiles(),
        errors: [],
        folder: "Browser preview · stored in this browser only",
      });
export const loadPreferences = (): Promise<Preferences> =>
  native
    ? invoke("load_preferences").then(normalizePreferences)
    : Promise.resolve(readBrowserPreferences());
export const savePreferences = (preferences: Preferences): Promise<void> =>
  native
    ? invoke("save_preferences", { preferences })
    : Promise.resolve(writeBrowserPreferences(preferences));
export function validateSave(
  files: LibraryFile[],
  content: string,
  path: string | null,
) {
  const s = parseSnippet(content);
  if (
    files.some(
      (file) => file.path !== path && frontmatterId(file.content) === s.id,
    )
  )
    throw new Error(`Duplicate ID: ${s.id}`);
  return s;
}
export async function saveSnippet(
  content: string,
  path: string | null,
  expected: string | null,
): Promise<string> {
  if (native) return invoke("save_snippet", { content, path, expected });
  const files = browserFiles();
  const s = validateSave(files, content, path);
  if (path && files.find((f) => f.path === path)?.content !== expected)
    throw new Error(
      "This file changed outside the editor. Reload before saving.",
    );
  const target = path ?? `${libraryFolders[s.language]}${s.id}.md`;
  if (!path && files.some((f) => f.path === target))
    throw new Error("A file with this name already exists.");
  localStorage.setItem(
    LIBRARY,
    JSON.stringify([
      ...files.filter((f) => f.path !== target),
      { path: target, content },
    ]),
  );
  return target;
}
export async function deleteSnippet(path: string, expected: string) {
  if (native) return invoke<void>("delete_snippet", { path, expected });
  const files = browserFiles();
  if (files.find((f) => f.path === path)?.content !== expected)
    throw new Error("File changed. Reload before deleting.");
  localStorage.setItem(
    LIBRARY,
    JSON.stringify(files.filter((f) => f.path !== path)),
  );
}
export async function exportSnippet(content: string, id: string) {
  if (native) return invoke<boolean>("export_snippet", { content, id });
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/markdown;charset=utf-8" }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = `${id}.md`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}
export async function openLibrary() {
  if (native) await invoke("open_library");
  else
    throw new Error(
      "Folder access is available in the desktop app. This preview stores snippets in your browser.",
    );
}
export async function copyText(text: string) {
  if (native) {
    const { writeText } = await import("@tauri-apps/plugin-clipboard-manager");
    await writeText(text);
  } else await navigator.clipboard.writeText(text);
}
