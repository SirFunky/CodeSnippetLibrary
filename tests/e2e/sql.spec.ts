import { test, expect } from "@playwright/test";
test("SQL queries and stored procedures have dialect-aware filters and full management", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const results = page.getByRole("listbox").getByRole("option");
  await expect(results).toHaveCount(43);
  await page.getByRole("button", { name: "SQL section", exact: true }).click();
  await expect(results).toHaveCount(44);
  await expect(
    page.getByRole("button", { name: "Queries", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Stored Procedures", exact: true }),
  ).toBeVisible();
  await expect(page.getByLabel("Filter by database version")).toBeDisabled();
  await page.getByLabel("Filter by SQL type").selectOption("query");
  await expect(results).toHaveCount(28);
  await page.getByLabel("Filter by SQL dialect").selectOption("sqlite");
  await page.getByLabel("Filter by database version").selectOption("3.25");
  await expect(results).toHaveCount(28);
  await page.getByLabel("Filter by SQL type").selectOption("procedure");
  await expect(results).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear all filters", exact: true })
    .click();
  await expect(results).toHaveCount(44);
  await expect(page.getByLabel("Filter by SQL dialect")).toHaveValue("");
  await expect(page.getByLabel("Filter by SQL type")).toHaveValue("");
  await page.getByLabel("Filter by SQL type").selectOption("procedure");
  await page.getByLabel("Filter by SQL dialect").selectOption("sqlserver");
  await expect(results).toHaveCount(16);
  await page.getByLabel("Filter by database version").selectOption("2017");
  await expect(results).toHaveCount(16);
  await expect(
    page
      .getByLabel("Filter by database version")
      .locator('option[value="3.25"]'),
  ).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("output parameter");
  await results
    .filter({ hasText: "Return a value through an output parameter" })
    .click();
  await expect(
    page.getByRole("button", { name: "Snippet.sql", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".code-container .code-view")).toHaveAttribute(
    "data-language",
    "sql",
  );
  await expect(page.locator(".code-container .shiki")).toBeVisible();
  await expect(
    page.getByText("SQL Server 2017+", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("ADDITIONAL EXAMPLES", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Copy with imports", exact: true }),
  ).toHaveCount(0);
  await expect(page.getByRole("button", { name: /^Imports/ })).toHaveCount(0);
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  const code = (
    await page.evaluate(() => navigator.clipboard.readText())
  ).replace(/\r\n/g, "\n");
  expect(code).toContain("CREATE OR ALTER PROCEDURE dbo.CountCustomersByCity");
  expect(code).toContain("    SET NOCOUNT ON;");
  expect(code).not.toContain("EXEC dbo.CountCustomersByCity");
  await page.getByRole("button", { name: "Add to favorites" }).click();
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(1);
  await page.getByRole("button", { name: "C++ section", exact: true }).click();
  await expect(results).toHaveCount(42);
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(0);
  await page.getByRole("button", { name: "SQL section", exact: true }).click();
  await expect(results).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "SQL section" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(results).toHaveCount(1);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.getByLabel("Filter by SQL type").selectOption("procedure");
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const editor = page.getByRole("textbox", { name: "Snippet Markdown" }),
    draft = await editor.inputValue();
  expect(draft).toContain("language: sql");
  expect(draft).toContain("sqlDialect: sqlserver");
  expect(draft).toContain("sqlKind: procedure");
  expect(draft).toContain('sqlVersion: "2017"');
  expect(draft).toContain("CREATE OR ALTER PROCEDURE");
  expect(draft).not.toContain("javaVersion:");
  await editor.fill(
    draft
      .replace("my-new-snippet", "sql-ui")
      .replace("My new snippet", "Created SQL procedure"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await expect(page.locator("main h2")).toHaveText("Created SQL procedure");
  await page.getByRole("button", { name: "Edit snippet", exact: true }).click();
  const editing = page.getByRole("textbox", { name: "Snippet Markdown" });
  await editing.fill(
    (await editing.inputValue()).replace("Hello, SQL!", "Hello, edited SQL!"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Hello, edited SQL!",
  );
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export snippet", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("sql-ui.md");
  await page.getByRole("button", { name: "C# section", exact: true }).click();
  await expect(results).toHaveCount(43);
  await page
    .locator("input[type=file]")
    .setInputFiles({
      name: "postgres.md",
      mimeType: "text/markdown",
      buffer: Buffer.from(
        "---\nid: sql-imported\nlanguage: sql\ntitle: Imported PostgreSQL procedure\ndescription: Test import.\ncategory: Stored Procedures\ntags: [test]\nsqlDialect: postgresql\nsqlKind: procedure\nsqlVersion: \"14\"\n---\n\n```sql\nCREATE OR REPLACE PROCEDURE public.say_hello()\nLANGUAGE plpgsql AS $$\nBEGIN\n    RAISE NOTICE 'Hello';\nEND;\n$$;\n```\n",
      ),
    });
  await expect(page.getByRole("status")).toContainText("Imported 1 snippet");
  await expect(results).toHaveCount(43);
  await page.getByRole("button", { name: "SQL section", exact: true }).click();
  await page.getByLabel("Filter by SQL dialect").selectOption("postgresql");
  await expect(results).toHaveCount(1);
  await expect(page.locator("main h2")).toHaveText(
    "Imported PostgreSQL procedure",
  );
  await expect(page.getByText("PostgreSQL 14+", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "More snippet actions" }).click();
  await page
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await expect(results).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear all filters", exact: true })
    .click();
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const queryEditor = page.getByRole("textbox", { name: "Snippet Markdown" }),
    queryDraft = await queryEditor.inputValue();
  expect(queryDraft).toContain("sqlKind: query");
  await queryEditor.fill(
    queryDraft
      .replace("sqlKind: query", "sqlKind: procedure")
      .replace("sqlDialect: sqlserver", "sqlDialect: sqlite")
      .replace('sqlVersion: "2017"', 'sqlVersion: "3.25"'),
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
    page.getByRole("button", { name: "SQL section" }),
  ).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Import snippets", exact: true }),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Collapse navigation" }).click();
  await expect(page.getByRole("button", { name: "SQL section" })).toBeVisible();
  await page.getByRole("button", { name: "Expand navigation" }).click();
  await page.setViewportSize({ width: 1440, height: 940 });
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("output parameter");
  await results
    .filter({ hasText: "Return a value through an output parameter" })
    .click();
  if (await page.getByRole("button", { name: "Dismiss notification" }).count())
    await page.getByRole("button", { name: "Dismiss notification" }).click();
  await page.screenshot({
    path: "artifacts/sql-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "light", exact: true }).click();
  await page.getByRole("button", { name: "Close settings" }).click();
  await page.screenshot({
    path: "artifacts/sql-light.png",
    fullPage: true,
    animations: "disabled",
  });
});
