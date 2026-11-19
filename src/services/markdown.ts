import { parse, parseDocument, stringify } from "yaml";
import type { Metadata, Snippet, LibraryFile } from "../models/snippet";
import { languageNames, importLines, sqlDialects } from "../models/languages";
const required = ["id", "title", "description", "category"] as const;
export function validateMetadata(value: unknown): Metadata {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error("Metadata must be a YAML object.");
  const m = value as Record<string, unknown>;
  const language = m.language === undefined ? "java" : m.language;
  if (
    language !== "java" &&
    language !== "python" &&
    language !== "csharp" &&
    language !== "cpp" &&
    language !== "sql" &&
    language !== "typescript" &&
    language !== "c" &&
    language !== "javascript" &&
    language !== "go" &&
    language !== "kotlin" &&
    language !== "cobol"
  )
    throw new Error(
      "Language must be java, python, csharp, cpp, sql, typescript, c, javascript, go, kotlin or cobol.",
    );
  for (const key of required)
    if (typeof m[key] !== "string" || !(m[key] as string).trim())
      throw new Error(`${key} is required.`);
  if (
    (m.id as string).length > 180 ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(m.id as string)
  )
    throw new Error(
      "ID must use lowercase letters, numbers and single hyphens (maximum 180 characters).",
    );
  if (
    language === "java" &&
    (!Number.isInteger(m.javaVersion) ||
      Number(m.javaVersion) < 8 ||
      Number(m.javaVersion) > 99)
  )
    throw new Error("Minimum Java version must be an integer from 8 to 99.");
  if (
    language === "python" &&
    (typeof m.pythonVersion !== "string" ||
      !/^3\.(?:0|[1-9]\d?)$/.test(m.pythonVersion))
  )
    throw new Error(
      'Minimum Python version must be text in major.minor format, such as "3.9".',
    );
  if (
    (language !== "cobol" &&
      (m.cobolVersion !== undefined || m.cobolFormat !== undefined)) ||
    (language === "cobol" &&
      (m.javaVersion !== undefined || m.pythonVersion !== undefined)) ||
    (language !== "kotlin" &&
      (m.kotlinVersion !== undefined || m.jvmTarget !== undefined)) ||
    (language === "kotlin" &&
      (m.javaVersion !== undefined || m.pythonVersion !== undefined)) ||
    (language !== "go" && m.goVersion !== undefined) ||
    (language === "go" &&
      (m.javaVersion !== undefined || m.pythonVersion !== undefined)) ||
    (language !== "javascript" && m.javascriptVersion !== undefined) ||
    (language === "javascript" &&
      (m.javaVersion !== undefined || m.pythonVersion !== undefined)) ||
    (language !== "c" && m.cVersion !== undefined) ||
    (language === "c" &&
      (m.javaVersion !== undefined || m.pythonVersion !== undefined)) ||
    (language !== "typescript" && m.typescriptVersion !== undefined) ||
    (language === "typescript" &&
      (m.javaVersion !== undefined || m.pythonVersion !== undefined)) ||
    (language === "python" && m.javaVersion !== undefined) ||
    (language === "java" && m.pythonVersion !== undefined) ||
    (language !== "csharp" &&
      (m.csharpVersion !== undefined || m.dotnetVersion !== undefined)) ||
    (language === "csharp" &&
      (m.javaVersion !== undefined || m.pythonVersion !== undefined)) ||
    (language !== "cpp" && m.cppVersion !== undefined) ||
    (language === "cpp" &&
      (m.javaVersion !== undefined || m.pythonVersion !== undefined)) ||
    (language !== "sql" &&
      (m.sqlDialect !== undefined ||
        m.sqlKind !== undefined ||
        m.sqlVersion !== undefined)) ||
    (language === "sql" &&
      (m.javaVersion !== undefined || m.pythonVersion !== undefined))
  )
    throw new Error("Use only the version field for the selected language.");
  if (language === "cobol") {
    if (
      !Number.isInteger(m.cobolVersion) ||
      ![1985, 2002, 2014, 2023].includes(m.cobolVersion as number)
    )
      throw new Error(
        "COBOL standard must be an integer: 1985, 2002, 2014 or 2023.",
      );
    if (m.cobolFormat !== "fixed" && m.cobolFormat !== "free")
      throw new Error("COBOL source format must be fixed or free.");
    if (m.cobolFormat === "free" && Number(m.cobolVersion) < 2002)
      throw new Error("Free source format requires COBOL 2002 or later.");
    if (
      m.imports !== undefined &&
      (!Array.isArray(m.imports) || m.imports.length > 0)
    )
      throw new Error(
        "COBOL snippets do not use imports; keep COPY statements in source and document copybooks in notes.",
      );
  }
  if (
    language === "kotlin" &&
    (typeof m.kotlinVersion !== "string" ||
      !/^(?:[1-9]|[1-9]\d)\.(?:0|[1-9]\d?)$/.test(m.kotlinVersion))
  )
    throw new Error(
      'Minimum Kotlin version must be quoted major.minor text, such as "1.8".',
    );
  if (
    language === "kotlin" &&
    (!Number.isInteger(m.jvmTarget) ||
      ![8, 11, 17, 21].includes(m.jvmTarget as number))
  )
    throw new Error("Kotlin JVM target must be an integer: 8, 11, 17 or 21.");
  if (
    language === "go" &&
    (typeof m.goVersion !== "string" ||
      !/^1\.(?:0|[1-9]\d?)$/.test(m.goVersion))
  )
    throw new Error(
      'Minimum Go version must be quoted 1.minor text, such as "1.20".',
    );
  if (
    language === "javascript" &&
    (!Number.isInteger(m.javascriptVersion) ||
      Number(m.javascriptVersion) < 2015 ||
      Number(m.javascriptVersion) > 2099)
  )
    throw new Error(
      "Minimum JavaScript version must be an integer ECMAScript year from 2015 to 2099.",
    );
  if (
    language === "typescript" &&
    (typeof m.typescriptVersion !== "string" ||
      !/^(?:[1-9]|[1-9]\d)\.(?:0|[1-9]\d?)$/.test(m.typescriptVersion))
  )
    throw new Error(
      'Minimum TypeScript version must be quoted major.minor text, such as "4.9".',
    );
  if (language === "sql") {
    if (!sqlDialects.some((value) => value === m.sqlDialect))
      throw new Error(
        "SQL dialect must be sqlserver, postgresql, mysql or sqlite.",
      );
    if (m.sqlKind !== "query" && m.sqlKind !== "procedure")
      throw new Error("SQL kind must be query or procedure.");
    if (m.sqlDialect === "sqlite" && m.sqlKind === "procedure")
      throw new Error("SQLite does not support stored procedures.");
    if (
      typeof m.sqlVersion !== "string" ||
      !/^(?:0|[1-9]\d{0,3})(?:\.(?:0|[1-9]\d{0,3})){0,2}$/.test(m.sqlVersion)
    )
      throw new Error(
        'Database version must be quoted numeric text, such as "2017" or "3.25".',
      );
    if (
      m.imports !== undefined &&
      (!Array.isArray(m.imports) || m.imports.length > 0)
    )
      throw new Error(
        "SQL snippets do not use imports; put setup instructions in notes.",
      );
  }
  if (language === "sql") {
    const version = m.sqlVersion as string,
      major = Number(version.split(".")[0]);
    if (m.sqlDialect === "sqlserver" && !/^20\d{2}$/.test(version))
      throw new Error(
        'SQL Server versions use the release year, such as "2017" or "2022".',
      );
    if (m.sqlDialect === "sqlite" && !version.startsWith("3."))
      throw new Error('SQLite versions use 3.x, such as "3.25".');
    if (
      m.sqlKind === "procedure" &&
      m.sqlDialect === "postgresql" &&
      major < 11
    )
      throw new Error(
        "PostgreSQL stored procedures require version 11 or later.",
      );
    if (m.sqlKind === "procedure" && m.sqlDialect === "mysql" && major < 5)
      throw new Error("MySQL stored procedures require version 5 or later.");
  }
  if (
    language === "c" &&
    (!Number.isInteger(m.cVersion) ||
      ![89, 99, 11, 17, 23].includes(m.cVersion as number))
  )
    throw new Error(
      "Minimum C standard must be an integer: 89, 99, 11, 17 or 23.",
    );
  if (
    language === "cpp" &&
    (!Number.isInteger(m.cppVersion) ||
      ![11, 14, 17, 20, 23].includes(m.cppVersion as number))
  )
    throw new Error(
      "Minimum C++ standard must be an integer: 11, 14, 17, 20 or 23.",
    );
  if (
    language === "csharp" &&
    (typeof m.csharpVersion !== "string" ||
      !/^(?:[1-9]|[1-9]\d)\.(?:0|[1-9]\d?)$/.test(m.csharpVersion))
  )
    throw new Error(
      'Minimum C# version must be quoted major.minor text, such as "8.0".',
    );
  if (
    language === "csharp" &&
    (typeof m.dotnetVersion !== "string" ||
      !/^(?:[5-9]|[1-9]\d)\.0$/.test(m.dotnetVersion))
  )
    throw new Error(
      '.NET target must be quoted text for .NET 5 or later, such as "8.0".',
    );
  if (
    !Array.isArray(m.tags) ||
    !m.tags.every((t) => typeof t === "string" && t.trim())
  )
    throw new Error("Tags must be a list of nonempty strings.");
  for (const key of ["imports", "related"])
    if (
      m[key] !== undefined &&
      (!Array.isArray(m[key]) ||
        !(m[key] as unknown[]).every((t) => typeof t === "string" && t.trim()))
    )
      throw new Error(`${key} must be a list of nonempty strings.`);
  for (const key of ["subcategory", "dependency"])
    if (m[key] !== undefined && typeof m[key] !== "string")
      throw new Error(`${key} must be text.`);
  if (
    language === "java" &&
    m.imports &&
    (m.imports as string[]).some(
      (t) =>
        !/^(?:static )?[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*(?:\.\*)?$/.test(
          t,
        ),
    )
  )
    throw new Error(
      "Imports must be qualified Java names without import or semicolon.",
    );
  if (
    language === "python" &&
    m.imports &&
    (m.imports as string[]).some(
      (line) =>
        !/^(?:import [A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?: as [A-Za-z_]\w*)?|from [A-Za-z_]\w*(?:\.[A-Za-z_]\w*)* import (?:\*|[A-Za-z_]\w*(?: as [A-Za-z_]\w*)?(?:, [A-Za-z_]\w*(?: as [A-Za-z_]\w*)?)*))$/.test(
          line,
        ),
    )
  )
    throw new Error(
      "Python imports must be single-line import or from … import … statements.",
    );
  if (
    language === "csharp" &&
    m.imports &&
    (m.imports as string[]).some(
      (line) => !/^(?:static )?[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*$/.test(line),
    )
  )
    throw new Error(
      "C# imports must be namespace/type names without using or semicolons.",
    );
  if (
    (language === "cpp" || language === "c") &&
    m.imports &&
    (m.imports as string[]).some(
      (line) => !/^(?:<[A-Za-z0-9_./-]+>|"[A-Za-z0-9_./-]+")$/.test(line),
    )
  )
    throw new Error(
      'C/C++ headers must use <header> or "header.hpp", without #include.',
    );
  if (
    language === "typescript" &&
    m.imports &&
    (m.imports as string[]).some((line) => !/^import [^;\r\n]+['"]$/.test(line))
  )
    throw new Error(
      "TypeScript imports must be complete single-line import statements without semicolons.",
    );
  if (
    language === "javascript" &&
    m.imports &&
    (m.imports as string[]).some(
      (line) => !/^import (?!type\b)[^;\r\n]+['"]$/.test(line),
    )
  )
    throw new Error(
      "JavaScript imports must be complete single-line import statements without semicolons or TypeScript type imports.",
    );
  if (
    language === "go" &&
    m.imports &&
    (m.imports as string[]).some(
      (path) =>
        !/^[A-Za-z0-9][A-Za-z0-9._/-]*$/.test(path) ||
        path.split("/").some((part) => !part || part === "." || part === ".."),
    )
  )
    throw new Error(
      "Go imports must be unquoted package paths without import, aliases or empty/dot path segments.",
    );
  if (
    language === "kotlin" &&
    m.imports &&
    (m.imports as string[]).some(
      (path) =>
        !/^[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*(?:\.\*)?(?: as [A-Za-z_]\w*)?$/.test(
          path,
        ),
    )
  )
    throw new Error(
      "Kotlin imports must be qualified names with an optional alias, without import or semicolons.",
    );
  return { ...m, language } as unknown as Metadata;
}
export function parseSnippet(raw: string, path = ""): Snippet {
  if (new TextEncoder().encode(raw).length > 2_000_000)
    throw new Error("Snippet exceeds the 2 MB limit.");
  const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
  if (!match) throw new Error("Missing YAML frontmatter.");
  const metadata = validateMetadata(
    parse(match[1], { uniqueKeys: true, maxAliasCount: 0 }),
  );
  const body = normalized.slice(match[0].length);
  // Parse whole fences first so an example nested inside a different language
  // block cannot be mistaken for a primary snippet.
  const matches = [...body.matchAll(/^```([^\n]*)\n([\s\S]*?)^```[ \t]*$/gm)]
    .filter((m) =>
      new RegExp(`^${metadata.language}(?:[ \\t]+primary)?[ \\t]*$`).test(m[1]),
    )
    .map((m) => ({
      primary:
        m[1].trim().endsWith(" primary") || /\sprimary$/.test(m[1].trim()),
      code: m[2],
    }));
  const name = languageNames[metadata.language!];
  if (!matches.length || matches.every((m) => !m.code.trim()))
    throw new Error(
      `At least one nonempty fenced ${name} code block is required.`,
    );
  if (matches.filter((m) => m.primary).length > 1)
    throw new Error(`Only one ${name} block may be marked primary.`);
  const primary = matches.find((m) => m.primary) ?? matches[0];
  if (!primary.code.trim())
    throw new Error("Primary code block cannot be empty.");
  const blocks = matches.map((m) => m.code.replace(/\n$/, ""));
  const notes = body
    .replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm, "")
    .replace(/^##\s+Notes\s*$/m, "")
    .trim();
  return {
    ...metadata,
    language: metadata.language!,
    code: primary.code.replace(/\n$/, ""),
    blocks,
    notes,
    raw,
    path,
  };
}
export function indexLibrary(files: LibraryFile[]) {
  const snippets: Snippet[] = [],
    errors: string[] = [],
    ids = new Set<string>();
  for (const file of [...files].sort((a, b) => a.path.localeCompare(b.path)))
    try {
      const snippet = parseSnippet(file.content, file.path);
      if (ids.has(snippet.id)) throw new Error(`Duplicate ID: ${snippet.id}`);
      ids.add(snippet.id);
      snippets.push(snippet);
    } catch (error) {
      errors.push(`${file.path}: ${(error as Error).message}`);
    }
  snippets.sort((a, b) => a.title.localeCompare(b.title));
  return { snippets, errors };
}
/** Reserve IDs even when another field or a code block in the file is invalid. */
export function frontmatterId(raw: string): string | undefined {
  try {
    const match = raw
      .replace(/^\uFEFF/, "")
      .replace(/\r\n/g, "\n")
      .match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
    if (!match) return;
    const value = parse(match[1], { uniqueKeys: true, maxAliasCount: 0 });
    return typeof value?.id === "string" ? value.id : undefined;
  } catch {
    return;
  }
}
export function serializeSnippet(
  metadata: Metadata,
  code: string,
  notes = "",
): string {
  return `---\n${stringify(metadata, { lineWidth: 0 })}---\n\n\`\`\`${metadata.language ?? "java"}\n${code}\n\`\`\`\n${notes ? `\n## Notes\n\n${notes}\n` : ""}`;
}
export function withImports(s: Snippet) {
  if (s.language === "kotlin" && s.imports?.length) {
    const block = importLines(s).join("\n");
    const packageLine =
      /^package[ \t]+[A-Za-z_]\w*(?:\.[A-Za-z_]\w*)*[ \t]*(?:;[ \t]*)?(?:\/\/[^\n]*)?$/m.exec(
        s.code,
      );
    if (packageLine) {
      const end = packageLine.index + packageLine[0].length;
      return s.code.slice(0, end) + "\n\n" + block + s.code.slice(end);
    }
    return block + "\n\n" + s.code;
  }
  if (s.language === "go" && s.imports?.length) {
    const block = importLines(s).join("\n");
    const packageLine =
      /^package[ \t]+[A-Za-z_]\w*[ \t]*(?:\/\/[^\n]*)?$/m.exec(s.code);
    if (packageLine) {
      const end = packageLine.index + packageLine[0].length;
      return s.code.slice(0, end) + "\n\n" + block + s.code.slice(end);
    }
    return block + "\n\n" + s.code;
  }
  return [...importLines(s), ...(s.imports?.length ? [""] : []), s.code].join(
    "\n",
  );
}

/** Change only the new copy's identity; retain the source body and other metadata. */
export function templateDraft(raw: string, id: string, title: string): string {
  parseSnippet(raw);
  const normalized = raw.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---(?:\n|$)/)!;
  const document = parseDocument(match[1], { uniqueKeys: true });
  document.set("id", id);
  document.set("title", title);
  const result = `---\n${document.toString({ lineWidth: 0 })}---\n${normalized.slice(match[0].length)}`;
  parseSnippet(result);
  return result;
}
