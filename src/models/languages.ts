import type { Language, Metadata } from "./snippet";
export const languageNames: Record<Language, string> = {
  java: "Java",
  python: "Python",
  csharp: "C#",
  cpp: "C++",
  c: "C",
  sql: "SQL",
  typescript: "TypeScript",
  javascript: "JavaScript",
  go: "Go",
  kotlin: "Kotlin",
  cobol: "COBOL",
};
export const languages = [
  "java",
  "python",
  "csharp",
  "cpp",
  "c",
  "sql",
  "typescript",
  "javascript",
  "go",
  "kotlin",
  "cobol",
] as const;
export const languageExtensions: Record<Language, string> = {
  java: "java",
  python: "py",
  csharp: "cs",
  cpp: "cpp",
  c: "c",
  sql: "sql",
  typescript: "ts",
  javascript: "js",
  go: "go",
  kotlin: "kt",
  cobol: "cob",
};
export const languageSymbols: Record<Language, string> = {
  java: "J",
  python: "Py",
  csharp: "C#",
  cpp: "C++",
  c: "C",
  sql: "SQL",
  typescript: "TS",
  javascript: "JS",
  go: "Go",
  kotlin: "Kt",
  cobol: "COB",
};
export const libraryFolders: Record<Language, string> = {
  java: "",
  python: "Python/",
  csharp: "CSharp/",
  cpp: "Cpp/",
  c: "C/",
  sql: "SQL/",
  typescript: "TypeScript/",
  javascript: "JavaScript/",
  go: "Go/",
  kotlin: "Kotlin/",
  cobol: "COBOL/",
};
export const languageVersions: Record<Language, string[]> = {
  java: ["8", "11", "17", "21", "25"],
  python: ["3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.14"],
  csharp: ["7.0", "7.3", "8.0", "9.0", "10.0", "11.0", "12.0", "13.0", "14.0"],
  cpp: ["11", "14", "17", "20", "23"],
  c: ["89", "99", "11", "17", "23"],
  sql: [],
  typescript: ["3.8", "4.0", "4.1", "4.9", "5.0", "5.7"],
  javascript: Array.from({ length: 11 }, (_, i) => String(2015 + i)),
  go: ["1.16", "1.18", "1.20", "1.21", "1.22", "1.23"],
  kotlin: ["1.8", "1.9", "2.0", "2.1", "2.2"],
  cobol: ["1985", "2002", "2014", "2023"],
};
export const sqlDialects = [
  "sqlserver",
  "postgresql",
  "mysql",
  "sqlite",
] as const;
export const sqlDialectNames = {
  sqlserver: "SQL Server",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  sqlite: "SQLite",
} as const;
export const sqlKindNames = {
  query: "Query",
  procedure: "Stored procedure",
} as const;
export function versionLabel(snippet: Metadata): string {
  return `${snippet.language === "sql" ? sqlDialectNames[snippet.sqlDialect!] : languageNames[snippet.language ?? "java"]} ${minimumVersion(snippet)}`;
}
export function minimumVersion(snippet: Metadata): string {
  if (snippet.language === "cobol") return String(snippet.cobolVersion);
  if (snippet.language === "kotlin") return snippet.kotlinVersion!;
  if (snippet.language === "go") return snippet.goVersion!;
  if (snippet.language === "javascript")
    return String(snippet.javascriptVersion);
  if (snippet.language === "typescript") return snippet.typescriptVersion!;
  if (snippet.language === "sql") return snippet.sqlVersion!;
  if (snippet.language === "c") return String(snippet.cVersion);
  if (snippet.language === "cpp") return String(snippet.cppVersion);
  if (snippet.language === "csharp") return snippet.csharpVersion!;
  return snippet.language === "python"
    ? snippet.pythonVersion!
    : String(snippet.javaVersion);
}
/** Compare version components, so Python 3.10 is newer than 3.9. */
export function supportsVersion(snippet: Metadata, version: string): boolean {
  if (snippet.language === "c") {
    const standards = languageVersions.c;
    const target = standards.indexOf(version),
      minimum = standards.indexOf(String(snippet.cVersion));
    return target >= 0 && minimum >= 0 && minimum <= target;
  }
  const minimum = minimumVersion(snippet).split(".").map(Number),
    target = version.split(".").map(Number);
  for (let i = 0; i < Math.max(minimum.length, target.length); i++) {
    const delta = (minimum[i] ?? 0) - (target[i] ?? 0);
    if (delta !== 0) return delta < 0;
  }
  return true;
}
export function importLines(snippet: Metadata): string[] {
  if (snippet.language === "sql" || snippet.language === "cobol") return [];
  if (snippet.language === "kotlin")
    return (snippet.imports ?? []).map((path) => `import ${path}`);
  if (snippet.language === "go")
    return snippet.imports?.length
      ? ["import (", ...snippet.imports.map((path) => `    "${path}"`), ")"]
      : [];
  if (snippet.language === "typescript" || snippet.language === "javascript")
    return (snippet.imports ?? []).map((line) => `${line};`);
  return (snippet.imports ?? []).map((line) =>
    snippet.language === "cpp" || snippet.language === "c"
      ? `#include ${line}`
      : snippet.language === "python"
        ? line
        : snippet.language === "csharp"
          ? `using ${line};`
          : `import ${line};`,
  );
}
