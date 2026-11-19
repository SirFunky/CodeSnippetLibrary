import { test, expect } from "@playwright/test";
test("manages a separate TypeScript section with versions and imports", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const results = page.getByRole("listbox").getByRole("option");
  await page
    .getByRole("button", { name: "TypeScript section", exact: true })
    .click();
  await expect(results).toHaveCount(43);
  const version = page.getByLabel("Filter by TypeScript version");
  await version.selectOption("4.9");
  await expect(results).toHaveCount(41);
  await version.selectOption("5.0");
  await expect(results).toHaveCount(43);
  await version.selectOption("");
  const search = page.getByRole("textbox", { name: "Search snippets" });
  await search.fill("Import a type from a local module");
  await results
    .filter({ hasText: "Import a type from a local module" })
    .click();
  await expect(
    page.getByRole("button", { name: "Snippet.ts", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".code-container .code-view")).toHaveAttribute(
    "data-language",
    "typescript",
  );
  await expect(page.locator(".code-container .shiki")).toBeVisible({
    timeout: 15000,
  });
  await page
    .getByRole("button", { name: "Copy with imports", exact: true })
    .click();
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).replace(
      /\r\n/g,
      "\n",
    ),
  ).toContain('import type { User } from "./models";\n\nconst user: User');
  await page.getByRole("button", { name: "Add to favorites" }).click();
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "TypeScript section" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(results).toHaveCount(1);
  await page.getByRole("button", { name: "SQL section", exact: true }).click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(44);
  await page
    .getByRole("button", { name: "TypeScript section", exact: true })
    .click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await search.fill("");
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const editor = page.getByRole("textbox", { name: "Snippet Markdown" });
  const draft = await editor.inputValue();
  expect(draft).toContain("language: typescript");
  expect(draft).toContain('typescriptVersion: "4.9"');
  expect(draft).not.toContain("javaVersion:");
  await editor.fill(
    draft
      .replace("my-new-snippet", "ts-ui")
      .replace("My new snippet", "Created TypeScript snippet"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await expect(page.locator("main h2")).toHaveText(
    "Created TypeScript snippet",
  );
  await page.getByRole("button", { name: "Edit snippet", exact: true }).click();
  await editor.fill(
    (await editor.inputValue()).replace(
      "Hello, TypeScript!",
      "Hello, edited TypeScript!",
    ),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Hello, edited TypeScript!",
  );
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export snippet", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("ts-ui.md");
  await page.getByRole("button", { name: "Java section", exact: true }).click();
  const imported =
    '---\nid: ts-imported\nlanguage: typescript\ntitle: Imported TypeScript\ndescription: Imported example.\ncategory: Modules\ntags: []\ntypescriptVersion: "5.0"\n---\n\n```typescript\nconst value: number = 42;\n```\n';
  await page
    .locator("input[type=file]")
    .setInputFiles({
      name: "ts-imported.md",
      mimeType: "text/markdown",
      buffer: Buffer.from(imported),
    });
  await expect(page.getByRole("status")).toContainText("Imported 1 snippet");
  await expect(results).toHaveCount(43);
  await page
    .getByRole("button", { name: "TypeScript section", exact: true })
    .click();
  await search.fill("Imported TypeScript");
  await results.filter({ hasText: "Imported TypeScript" }).click();
  await page.getByRole("button", { name: "More snippet actions" }).click();
  await page
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await expect(results.filter({ hasText: "Imported TypeScript" })).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const invalid = await editor.inputValue();
  await editor.fill(invalid.replace('"4.9"', "4.9"));
  await expect(
    page.getByRole("button", { name: "Save snippet", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Close editor" }).click();
  await page
    .getByRole("button", { name: "Discard changes", exact: true })
    .click();
  await page.setViewportSize({ width: 960, height: 640 });
  await expect(
    page.getByRole("button", { name: "TypeScript section" }),
  ).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Import snippets", exact: true }),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Collapse navigation" }).click();
  await expect(
    page.getByRole("button", { name: "TypeScript section" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Expand navigation" }).click();
  await page.setViewportSize({ width: 1440, height: 940 });
  await search.fill("Validate a configuration with satisfies");
  await results
    .filter({ hasText: "Validate a configuration with satisfies" })
    .click();
  if (await page.getByRole("button", { name: "Dismiss notification" }).count())
    await page.getByRole("button", { name: "Dismiss notification" }).click();
  await page.screenshot({
    path: "artifacts/typescript-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "light", exact: true }).click();
  await page.getByRole("button", { name: "Close settings" }).click();
  await page.screenshot({
    path: "artifacts/typescript-light.png",
    fullPage: true,
    animations: "disabled",
  });
});
