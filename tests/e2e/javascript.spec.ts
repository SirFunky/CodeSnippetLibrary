import { test, expect } from "@playwright/test";
test("manages a separate JavaScript section with versions and imports", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const results = page.getByRole("listbox").getByRole("option");
  await page
    .getByRole("button", { name: "JavaScript section", exact: true })
    .click();
  await expect(results).toHaveCount(44);
  const version = page.getByLabel("Filter by JavaScript version");
  await version.selectOption("2020");
  await expect(results).toHaveCount(42);
  await version.selectOption("2022");
  await expect(results).toHaveCount(44);
  await version.selectOption("");
  const search = page.getByRole("textbox", { name: "Search snippets" });
  await search.fill("Import a function from a local module");
  await results
    .filter({ hasText: "Import a function from a local module" })
    .click();
  await expect(
    page.getByRole("button", { name: "Snippet.js", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".code-container .code-view")).toHaveAttribute(
    "data-language",
    "javascript",
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
  ).toContain('import { greet } from "./greeting.js";\n\nconst message');
  await page.getByRole("button", { name: "Add to favorites" }).click();
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "JavaScript section" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(results).toHaveCount(1);
  await page.getByRole("button", { name: "SQL section", exact: true }).click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(44);
  await page
    .getByRole("button", { name: "JavaScript section", exact: true })
    .click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await search.fill("");
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const editor = page.getByRole("textbox", { name: "Snippet Markdown" });
  const draft = await editor.inputValue();
  expect(draft).toContain("language: javascript");
  expect(draft).toContain("javascriptVersion: 2020");
  expect(draft).not.toContain("javaVersion:");
  await editor.fill(
    draft
      .replace("my-new-snippet", "js-ui")
      .replace("My new snippet", "Created JavaScript snippet"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await expect(page.locator("main h2")).toHaveText(
    "Created JavaScript snippet",
  );
  await page.getByRole("button", { name: "Edit snippet", exact: true }).click();
  await editor.fill(
    (await editor.inputValue()).replace(
      "Hello, JavaScript!",
      "Hello, edited JavaScript!",
    ),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Hello, edited JavaScript!",
  );
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export snippet", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("js-ui.md");
  await page.getByRole("button", { name: "Java section", exact: true }).click();
  const imported =
    "---\nid: js-imported\nlanguage: javascript\ntitle: Imported JavaScript\ndescription: Imported example.\ncategory: Modules\ntags: []\njavascriptVersion: 2022\n---\n\n```javascript\nconst value = 42;\n```\n";
  await page.locator("input[type=file]").setInputFiles({
    name: "js-imported.md",
    mimeType: "text/markdown",
    buffer: Buffer.from(imported),
  });
  await expect(page.getByRole("status")).toContainText("Imported 1 snippet");
  await expect(results).toHaveCount(43);
  await page
    .getByRole("button", { name: "JavaScript section", exact: true })
    .click();
  await search.fill("Imported JavaScript");
  await results.filter({ hasText: "Imported JavaScript" }).click();
  await page.getByRole("button", { name: "More snippet actions" }).click();
  await page
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await expect(results.filter({ hasText: "Imported JavaScript" })).toHaveCount(
    0,
  );
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const invalid = await editor.inputValue();
  await editor.fill(
    invalid.replace("javascriptVersion: 2020", 'javascriptVersion: "2020"'),
  );
  await expect(
    page.getByRole("button", { name: "Save snippet", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Close editor" }).click();
  await page
    .getByRole("button", { name: "Discard changes", exact: true })
    .click();
  await page.setViewportSize({ width: 960, height: 640 });
  await expect(
    page.getByRole("button", { name: "JavaScript section" }),
  ).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Import snippets", exact: true }),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Collapse navigation" }).click();
  await expect(
    page.getByRole("button", { name: "JavaScript section" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Expand navigation" }).click();
  await page.setViewportSize({ width: 1440, height: 940 });
  await search.fill("Read nested data with optional chaining");
  await results
    .filter({ hasText: "Read nested data with optional chaining" })
    .click();
  if (await page.getByRole("button", { name: "Dismiss notification" }).count())
    await page.getByRole("button", { name: "Dismiss notification" }).click();
  await page.screenshot({
    path: "artifacts/javascript-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "light", exact: true }).click();
  await page.getByRole("button", { name: "Close settings" }).click();
  await page.screenshot({
    path: "artifacts/javascript-light.png",
    fullPage: true,
    animations: "disabled",
  });
});
