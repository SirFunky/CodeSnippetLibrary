export type Language =
  | "java"
  | "python"
  | "csharp"
  | "cpp"
  | "sql"
  | "typescript"
  | "c"
  | "javascript"
  | "go"
  | "kotlin"
  | "cobol";
export type SqlDialect = "sqlserver" | "postgresql" | "mysql" | "sqlite";
export type SqlKind = "query" | "procedure";
export interface Metadata {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  language?: Language;
  javaVersion?: number;
  pythonVersion?: string;
  csharpVersion?: string;
  dotnetVersion?: string;
  cppVersion?: number;
  cVersion?: number;
  sqlDialect?: SqlDialect;
  sqlKind?: SqlKind;
  sqlVersion?: string;
  typescriptVersion?: string;
  javascriptVersion?: number;
  goVersion?: string;
  kotlinVersion?: string;
  jvmTarget?: number;
  cobolVersion?: number;
  cobolFormat?: "fixed" | "free";
  imports?: string[];
  related?: string[];
  dependency?: string;
}
export interface Snippet extends Metadata {
  language: Language;
  code: string;
  blocks: string[];
  notes: string;
  raw: string;
  path: string;
}
export interface LibraryFile {
  path: string;
  content: string;
}
export interface LibraryResult {
  files: LibraryFile[];
  errors: string[];
  folder: string;
}
export interface Preferences {
  language: Language;
  categories: Record<Language, string>;
  favorites: string[];
  recent: string[];
  theme: "dark" | "light" | "system";
  category: string;
  fontSize: number;
  navWidth: number;
  listWidth: number;
  collapsed: boolean;
}
export const defaultPreferences: Preferences = {
  language: "java",
  categories: {
    java: "all",
    python: "all",
    csharp: "all",
    cpp: "all",
    c: "all",
    sql: "all",
    typescript: "all",
    javascript: "all",
    go: "all",
    kotlin: "all",
    cobol: "all",
  },
  favorites: [],
  recent: [],
  theme: "dark",
  category: "all",
  fontSize: 13,
  navWidth: 232,
  listWidth: 370,
  collapsed: false,
};
