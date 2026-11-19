import { Code2, Braces, Hash, FileCode2, Database } from "lucide-react";
import type { Language, Snippet } from "../models/snippet";
import { languageNames, languages } from "../models/languages";
export default function LanguageSections({
  language,
  snippets,
  onChange,
}: {
  language: Language;
  snippets: Snippet[];
  onChange: (language: Language) => void;
}) {
  return (
    <div
      className="language-sections"
      role="group"
      aria-label="Snippet language"
    >
      {languages.map((value) => {
        const Icon =
          value === "java"
            ? Code2
            : value === "python" ||
                value === "javascript" ||
                value === "go" ||
                value === "kotlin"
              ? Braces
              : value === "cpp" ||
                  value === "c" ||
                  value === "typescript" ||
                  value === "cobol"
                ? FileCode2
                : value === "sql"
                  ? Database
                  : Hash;
        return (
          <button
            key={value}
            aria-label={`${languageNames[value]} section`}
            aria-pressed={language === value}
            className={language === value ? "active" : ""}
            title={`${languageNames[value]} section`}
            onClick={() => onChange(value)}
          >
            <Icon size={17} />
            <span>{languageNames[value]}</span>
            <em>{snippets.filter((s) => s.language === value).length}</em>
          </button>
        );
      })}
    </div>
  );
}
