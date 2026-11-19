import { useEffect, useState } from "react";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import java from "@shikijs/langs/java";
import python from "@shikijs/langs/python";
import csharp from "@shikijs/langs/csharp";
import type { Language } from "../models/snippet";
import dark from "@shikijs/themes/github-dark";
import light from "@shikijs/themes/github-light";
const highlighter = createHighlighterCore({
  themes: [dark, light],
  langs: [java, python, csharp],
  engine: createJavaScriptRegexEngine(),
});
// C++ has a large grammar; load the bundled chunk only when its section is used.
let cppLanguage: Promise<void> | undefined;
let cLanguage: Promise<void> | undefined;
let sqlLanguage: Promise<void> | undefined;
let typescriptLanguage: Promise<void> | undefined;
let javascriptLanguage: Promise<void> | undefined;
let goLanguage: Promise<void> | undefined;
let kotlinLanguage: Promise<void> | undefined;
let cobolLanguage: Promise<void> | undefined;
export default function CodeView({
  code,
  fontSize = 13,
  language = "java",
}: {
  code: string;
  fontSize?: number;
  language?: Language;
}) {
  const [html, setHtml] = useState("");
  useEffect(() => {
    let active = true;
    setHtml("");
    highlighter
      .then(async (h) => {
        if (language === "c")
          await (cLanguage ??= import("@shikijs/langs/c").then(
            ({ default: grammar }) => h.loadLanguage(grammar),
          ));
        if (language === "cpp")
          await (cppLanguage ??= import("@shikijs/langs/cpp").then(
            ({ default: grammar }) => h.loadLanguage(grammar),
          ));
        if (language === "sql")
          await (sqlLanguage ??= import("@shikijs/langs/sql").then(
            ({ default: grammar }) => h.loadLanguage(grammar),
          ));
        if (language === "cobol")
          await (cobolLanguage ??= import("../languages/cobol").then(
            ({ default: grammar }) => h.loadLanguage(grammar),
          ));
        if (language === "kotlin")
          await (kotlinLanguage ??= import("@shikijs/langs/kotlin").then(
            ({ default: grammar }) => h.loadLanguage(grammar),
          ));
        if (language === "go")
          await (goLanguage ??= import("@shikijs/langs/go").then(
            ({ default: grammar }) => h.loadLanguage(grammar),
          ));
        if (language === "javascript")
          await (javascriptLanguage ??= import(
            "@shikijs/langs/javascript"
          ).then(({ default: grammar }) => h.loadLanguage(grammar)));
        if (language === "typescript")
          await (typescriptLanguage ??= import(
            "@shikijs/langs/typescript"
          ).then(({ default: grammar }) => h.loadLanguage(grammar)));
        if (active)
          setHtml(
            h.codeToHtml(code, {
              lang: language,
              themes: { light: "github-light", dark: "github-dark" },
              defaultColor: false,
            }),
          );
      })
      .catch(() => {
        if (active) setHtml("");
      });
    return () => {
      active = false;
    };
  }, [code, language]);
  return (
    <div className="code-view" data-language={language} style={{ fontSize }}>
      {html ? (
        <div dangerouslySetInnerHTML={{ __html: html }} />
      ) : (
        <pre>
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
