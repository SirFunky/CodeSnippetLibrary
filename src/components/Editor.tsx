import { useMemo, useState } from "react";
import { X, Save, Code2, AlertCircle } from "lucide-react";
import type { Snippet, Language, SqlKind } from "../models/snippet";
import { languageNames } from "../models/languages";
import {
  parseSnippet,
  serializeSnippet,
  templateDraft,
} from "../services/markdown";
import CodeView from "./CodeView";
export default function Editor({
  snippet,
  template,
  language,
  sqlKind = "query",
  onSave,
  onClose,
}: {
  snippet: Snippet | null;
  template?: Snippet | null;
  language: Language;
  sqlKind?: SqlKind;
  onSave: (raw: string) => Promise<void>;
  onClose: () => void;
}) {
  const [initial] = useState(
    () =>
      snippet?.raw ??
      (template
        ? templateDraft(
            template.raw,
            `my-${template.language}-program-${Date.now().toString(36)}`,
            `My ${languageNames[template.language]} program`,
          )
        : serializeSnippet(
            {
              id: "my-new-snippet",
              title: "My new snippet",
              description: "Describe what this snippet does.",
              category:
                language === "sql"
                  ? sqlKind === "procedure"
                    ? "Stored Procedures"
                    : "Queries"
                  : "Utilities",
              tags: ["example"],
              ...(language === "cobol"
                ? { language, cobolVersion: 2002, cobolFormat: "free" }
                : language === "kotlin"
                  ? { language, kotlinVersion: "1.8", jvmTarget: 8 }
                  : language === "go"
                    ? { language, goVersion: "1.20", imports: ["fmt"] }
                    : language === "javascript"
                      ? { language, javascriptVersion: 2020 }
                      : language === "c"
                        ? { language, cVersion: 11, imports: ["<stdio.h>"] }
                        : language === "typescript"
                          ? { language, typescriptVersion: "4.9" }
                          : language === "python"
                            ? { language, pythonVersion: "3.9" }
                            : language === "csharp"
                              ? {
                                  language,
                                  csharpVersion: "8.0",
                                  dotnetVersion: "8.0",
                                  imports: ["System"],
                                }
                              : language === "cpp"
                                ? {
                                    language,
                                    cppVersion: 17,
                                    imports: ["<iostream>"],
                                  }
                                : language === "sql"
                                  ? {
                                      language,
                                      sqlDialect: "sqlserver",
                                      sqlKind,
                                      sqlVersion: "2017",
                                    }
                                  : { javaVersion: 8 }),
            },
            language === "cobol"
              ? 'IDENTIFICATION DIVISION.\nPROGRAM-ID. HELLO-COBOL.\nPROCEDURE DIVISION.\n    DISPLAY "Hello, COBOL!"\n    STOP RUN.'
              : language === "kotlin"
                ? 'fun main() {\n    println("Hello, Kotlin!")\n}'
                : language === "go"
                  ? 'package main\n\nfunc main() {\n    fmt.Println("Hello, Go!")\n}'
                  : language === "javascript"
                    ? 'const message = "Hello, JavaScript!";\nconsole.log(message);'
                    : language === "c"
                      ? 'int main(void) {\n    puts("Hello, C!");\n    return 0;\n}'
                      : language === "typescript"
                        ? 'const message: string = "Hello, TypeScript!";\nconsole.log(message);'
                        : language === "python"
                          ? 'print("Hello, Python!")'
                          : language === "csharp"
                            ? 'Console.WriteLine("Hello, C#!");'
                            : language === "cpp"
                              ? 'std::cout << "Hello, C++!\\n";'
                              : language === "sql"
                                ? sqlKind === "procedure"
                                  ? "CREATE OR ALTER PROCEDURE dbo.MyProcedure\nAS\nBEGIN\n    SET NOCOUNT ON;\n    SELECT 'Hello, SQL!' AS message;\nEND;"
                                  : "SELECT 'Hello, SQL!' AS message;"
                                : 'System.out.println("Hello, Java!");',
          )),
  );
  const [raw, setRaw] = useState(initial),
    [busy, setBusy] = useState(false),
    [error, setError] = useState(""),
    [discard, setDiscard] = useState(false);
  const parsed = useMemo(() => {
    try {
      return { snippet: parseSnippet(raw), error: "" };
    } catch (e) {
      return { snippet: null, error: (e as Error).message };
    }
  }, [raw]);
  async function save() {
    setBusy(true);
    setError("");
    try {
      await onSave(raw);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="modal-backdrop">
      <section
        className="editor modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="editor-title"
      >
        <header>
          <div>
            <div className="eyebrow">LIBRARY EDITOR</div>
            <h2 id="editor-title">
              {snippet ? "Edit snippet" : "Create a snippet"}
            </h2>
          </div>
          <button
            aria-label="Close editor"
            disabled={busy}
            onClick={() => (raw !== initial ? setDiscard(true) : onClose())}
          >
            <X size={20} />
          </button>
        </header>
        <div className="editor-hint">
          Edit YAML metadata and Markdown. Use{" "}
          <code>```{language} primary</code> to choose a primary block.{" "}
          {language === "cobol"
            ? "Set language: cobol, integer cobolVersion (1985, 2002, 2014 or 2023), and cobolFormat (fixed or free). Preserve fixed-format columns. Keep COPY statements in source and copybook requirements in notes."
            : language === "kotlin"
              ? 'Set language: kotlin, quote kotlinVersion (e.g. "1.8"), and set integer jvmTarget (8, 11, 17 or 21). Imports are qualified names without import or semicolons, with optional as aliases.'
              : language === "go"
                ? 'Set language: go and quoted goVersion (e.g. "1.20"). List package paths such as fmt without quotes or import; Copy with imports inserts the block after the package declaration.'
                : language === "javascript"
                  ? "Set language: javascript and integer javascriptVersion (an ECMAScript year, e.g. 2020). Imports are complete single-line statements without semicolons. Document browser, Node or module requirements in notes."
                  : language === "c"
                    ? 'Set language: c and integer cVersion (89, 99, 11, 17 or 23). List headers as <stdio.h> or "project/header.h", without #include.'
                    : language === "typescript"
                      ? 'Set language: typescript and quote typescriptVersion (e.g. "4.9"). Imports are complete single-line statements without semicolons. Runtime requirements belong in notes.'
                      : language === "python"
                        ? 'Set language: python, quote pythonVersion (e.g. "3.9"), and list complete import statements.'
                        : language === "csharp"
                          ? 'Set language: csharp, quote csharpVersion and dotnetVersion (e.g. "8.0"). Imports are namespace/type names without using or semicolons.'
                          : language === "cpp"
                            ? 'Set language: cpp and an integer cppVersion (e.g. 17). List headers as <vector> or "project/header.hpp", without #include.'
                            : language === "sql"
                              ? "Set sqlDialect (sqlserver, postgresql, mysql or sqlite), sqlKind (query or procedure), and a quoted sqlVersion. Use notes for schema requirements and invocation examples."
                              : "Imports are qualified names without semicolons."}
        </div>
        <div className="editor-grid">
          <div className="source-editor">
            <div className="section-label">MARKDOWN SOURCE</div>
            <textarea
              aria-label="Snippet Markdown"
              autoFocus
              spellCheck={false}
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                  e.preventDefault();
                  if (!parsed.error && !busy) void save();
                }
                if (e.key === "Tab") {
                  e.preventDefault();
                  const t = e.currentTarget,
                    p = t.selectionStart;
                  setRaw(raw.slice(0, p) + "    " + raw.slice(t.selectionEnd));
                  requestAnimationFrame(() => {
                    t.selectionStart = t.selectionEnd = p + 4;
                  });
                }
              }}
            />
          </div>
          <div className="editor-preview">
            <div className="section-label">
              <Code2 size={14} /> LIVE{" "}
              {languageNames[
                parsed.snippet?.language ?? language
              ].toUpperCase()}{" "}
              PREVIEW
            </div>
            {parsed.snippet ? (
              <>
                <h3>{parsed.snippet.title}</h3>
                <p>{parsed.snippet.description}</p>
                <CodeView
                  code={parsed.snippet.code}
                  language={parsed.snippet.language}
                />
                {parsed.snippet.notes && (
                  <p className="notes-text">{parsed.snippet.notes}</p>
                )}
              </>
            ) : (
              <p className="error-inline">
                <AlertCircle size={16} />
                {parsed.error}
              </p>
            )}
          </div>
        </div>
        {error && (
          <p className="error-inline" role="alert">
            {error}
          </p>
        )}
        <footer>
          <span className={parsed.error ? "invalid" : "valid"}>
            {parsed.error || "Metadata valid · formatting preserved"}
          </span>
          <button
            className="primary"
            onClick={() => void save()}
            disabled={busy || !!parsed.error}
          >
            <Save size={16} />
            {busy ? "Saving…" : "Save snippet"}
          </button>
        </footer>
        {discard && (
          <div className="discard-bar">
            <span>Discard your unsaved changes?</span>
            <button onClick={() => setDiscard(false)}>Keep editing</button>
            <button className="danger" onClick={onClose}>
              Discard changes
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
