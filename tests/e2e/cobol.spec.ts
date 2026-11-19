import { test, expect } from "@playwright/test";
test("manages a separate COBOL section with versions and imports", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const results = page.getByRole("listbox").getByRole("option");
  await page
    .getByRole("button", { name: "COBOL section", exact: true })
    .click();
  await expect(results).toHaveCount(42);
  const version = page.getByLabel("Filter by COBOL version");
  await version.selectOption("1985");
  await expect(results).toHaveCount(13);
  await version.selectOption("2002");
  await expect(results).toHaveCount(42);
  await version.selectOption("");
  const search = page.getByRole("textbox", { name: "Search snippets" });
  await search.fill("Display a message");
  await results.filter({ hasText: "Display a message" }).click();
  await expect(
    page.getByRole("button", { name: "Snippet.cob", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".code-container .code-view")).toHaveAttribute(
    "data-language",
    "cobol",
  );
  await expect(page.locator(".code-container .shiki")).toBeVisible({
    timeout: 15000,
  });
  await expect(
    page.getByRole("button", { name: "Copy with imports", exact: true }),
  ).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^Imports/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).replace(
      /\r\n/g,
      "\n",
    ),
  ).toContain("       IDENTIFICATION DIVISION.\n       PROGRAM-ID. EX-HELLO.");
  await page.getByRole("button", { name: "Add to favorites" }).click();
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "COBOL section" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(results).toHaveCount(1);
  await page.getByRole("button", { name: "SQL section", exact: true }).click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(44);
  await page
    .getByRole("button", { name: "COBOL section", exact: true })
    .click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await search.fill("");
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const editor = page.getByRole("textbox", { name: "Snippet Markdown" });
  const draft = await editor.inputValue();
  expect(draft).toContain("language: cobol");
  expect(draft).toContain("cobolVersion: 2002");
  expect(draft).toContain("cobolFormat: free");
  expect(draft).not.toContain("javaVersion:");
  await editor.fill(
    draft
      .replace("my-new-snippet", "cobol-ui")
      .replace("My new snippet", "Created COBOL snippet"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await expect(page.locator("main h2")).toHaveText("Created COBOL snippet");
  await page.getByRole("button", { name: "Edit snippet", exact: true }).click();
  await editor.fill(
    (await editor.inputValue()).replace(
      "Hello, COBOL!",
      "Hello, edited COBOL!",
    ),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Hello, edited COBOL!",
  );
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export snippet", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("cobol-ui.md");
  await page.getByRole("button", { name: "Java section", exact: true }).click();
  const imported =
    "---\nid: cobol-imported\nlanguage: cobol\ntitle: Imported COBOL\ndescription: Imported example.\ncategory: Modules\ntags: []\ncobolVersion: 2002\ncobolFormat: free\n---\n\n```cobol\nIDENTIFICATION DIVISION.\nPROGRAM-ID. IMPORTED-EXAMPLE.\nPROCEDURE DIVISION.\n    DISPLAY 42\n    STOP RUN.\n```\n";
  await page.locator("input[type=file]").setInputFiles({
    name: "cobol-imported.md",
    mimeType: "text/markdown",
    buffer: Buffer.from(imported),
  });
  await expect(page.getByRole("status")).toContainText("Imported 1 snippet");
  await expect(results).toHaveCount(43);
  await page
    .getByRole("button", { name: "COBOL section", exact: true })
    .click();
  await search.fill("Imported COBOL");
  await results.filter({ hasText: "Imported COBOL" }).click();
  await page.getByRole("button", { name: "More snippet actions" }).click();
  await page
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await expect(results.filter({ hasText: "Imported COBOL" })).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const invalid = await editor.inputValue();
  await editor.fill(
    invalid.replace("cobolVersion: 2002", 'cobolVersion: "2002"'),
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
    page.getByRole("button", { name: "COBOL section" }),
  ).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Import snippets", exact: true }),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Collapse navigation" }).click();
  await expect(
    page.getByRole("button", { name: "COBOL section" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Expand navigation" }).click();
  await page.setViewportSize({ width: 1440, height: 940 });
  await search.fill("Round a fixed-point decimal");
  await results.filter({ hasText: "Round a fixed-point decimal" }).click();
  if (await page.getByRole("button", { name: "Dismiss notification" }).count())
    await page.getByRole("button", { name: "Dismiss notification" }).click();
  await page.screenshot({
    path: "artifacts/cobol-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "light", exact: true }).click();
  await page.getByRole("button", { name: "Close settings" }).click();
  await page.screenshot({
    path: "artifacts/cobol-light.png",
    fullPage: true,
    animations: "disabled",
  });
});
