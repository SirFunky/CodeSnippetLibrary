import { it, expect } from "vitest";
import { createHighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import dark from "@shikijs/themes/github-dark";
import light from "@shikijs/themes/github-light";
import cobol from "../src/languages/cobol";
it("highlights COBOL through Shiki and escapes source text in both themes", async () => {
  const h = await createHighlighterCore({
    themes: [dark, light],
    langs: [cobol],
    engine: createJavaScriptRegexEngine(),
  });
  try {
    const tokens = h
      .codeToTokens("           DISPLAY WS-DISPLAY", {
        lang: "cobol",
        theme: "github-dark",
      })
      .tokens.flat();
    expect(tokens.some((token) => token.content.includes("WS-DISPLAY"))).toBe(true);
    for (const theme of ["github-dark", "github-light"]) {
      const html = h.codeToHtml(
        '       IDENTIFICATION DIVISION.\n       PROGRAM-ID. DEMO.\n       PROCEDURE DIVISION.\n           DISPLAY "<script>alert(1)</script>"\n           STOP RUN.',
        { lang: "cobol", theme },
      );
      expect(html).toContain('class="shiki');
      expect(html).toContain("color:");
      expect(html).toContain("&#x3C;script>");
      expect(html).not.toContain("<script>");
    }
  } finally {
    h.dispose();
  }
});
