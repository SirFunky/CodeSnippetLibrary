import { bundledCounts } from "../bundled-counts";
import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import { parse } from "yaml";

test("browses and copies a complete everyday example in all eleven sections", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const labels: Record<string, string> = {
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
  const cases = JSON.parse(
    readFileSync("scripts/everyday-cases.json", "utf8"),
  ) as Record<string, { path: string; language: string }>;
  const results = page.getByRole("listbox").getByRole("option");
  const search = page.getByRole("textbox", { name: "Search snippets" });
  for (const [language, label] of Object.entries(labels)) {
    await page
      .getByRole("button", { name: `${label} section`, exact: true })
      .click();
    await search.fill("");
    await expect(results).toHaveCount(bundledCounts[language]);
    const example = Object.values(cases).find((e) => e.language === language)!;
    const raw = readFileSync(example.path, "utf8").replace(/\r\n/g, "\n");
    const metadata = parse(raw.match(/^---\n([\s\S]*?)\n---/)![1]);
    const code = raw.match(/^```\w+\n([\s\S]*?)^```/m)![1].trimEnd();
    await search.fill(metadata.title);
    await results.filter({ hasText: metadata.title }).click();
    await expect(page.locator("main h2")).toHaveText(metadata.title);
    await expect(page.locator(".code-container .shiki")).toBeVisible();
    await page.getByRole("button", { name: "Copy code", exact: true }).click();
    expect(
      (await page.evaluate(() => navigator.clipboard.readText()))
        .replace(/\r\n/g, "\n")
        .trimEnd(),
    ).toBe(code);
  }
  await search.fill("");
  await page.reload();
  await expect(results).toHaveCount(bundledCounts.cobol);
  await expect(
    page.getByRole("button", { name: "COBOL section", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
