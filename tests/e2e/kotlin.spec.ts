import { test, expect } from "@playwright/test";
test("manages a separate Kotlin section with versions and imports", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const results = page.getByRole("listbox").getByRole("option");
  await page
    .getByRole("button", { name: "Kotlin section", exact: true })
    .click();
  await expect(results).toHaveCount(42);
  const version = page.getByLabel("Filter by Kotlin version");
  await version.selectOption("1.8");
  await expect(results).toHaveCount(40);
  await version.selectOption("1.9");
  await expect(results).toHaveCount(42);
  await version.selectOption("");
  const search = page.getByRole("textbox", { name: "Search snippets" });
  await search.fill("Read a UTF-8 text file");
  await results.filter({ hasText: "Read a UTF-8 text file" }).click();
  await expect(
    page.getByRole("button", { name: "Snippet.kt", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".code-container .code-view")).toHaveAttribute(
    "data-language",
    "kotlin",
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
  ).toContain("package snippets\n\nimport java.io.File");
  await page.getByRole("button", { name: "Add to favorites" }).click();
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Kotlin section" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(results).toHaveCount(1);
  await page.getByRole("button", { name: "SQL section", exact: true }).click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(44);
  await page
    .getByRole("button", { name: "Kotlin section", exact: true })
    .click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await search.fill("");
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const editor = page.getByRole("textbox", { name: "Snippet Markdown" });
  const draft = await editor.inputValue();
  expect(draft).toContain("language: kotlin");
  expect(draft).toContain('kotlinVersion: "1.8"');
  expect(draft).not.toContain("javaVersion:");
  expect(draft).toContain("jvmTarget: 8");
  await editor.fill(
    draft
      .replace("my-new-snippet", "kt-ui")
      .replace("My new snippet", "Created Kotlin snippet"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await expect(page.locator("main h2")).toHaveText("Created Kotlin snippet");
  await page.getByRole("button", { name: "Edit snippet", exact: true }).click();
  await editor.fill(
    (await editor.inputValue()).replace(
      "Hello, Kotlin!",
      "Hello, edited Kotlin!",
    ),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Hello, edited Kotlin!",
  );
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export snippet", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("kt-ui.md");
  await page.getByRole("button", { name: "Java section", exact: true }).click();
  const imported =
    '---\nid: kt-imported\nlanguage: kotlin\ntitle: Imported Kotlin\ndescription: Imported example.\ncategory: Modules\ntags: []\nkotlinVersion: "1.9"\njvmTarget: 8\n---\n\n```kotlin\npackage snippets\n\nfun main() {}\n```\n';
  await page.locator("input[type=file]").setInputFiles({
    name: "kt-imported.md",
    mimeType: "text/markdown",
    buffer: Buffer.from(imported),
  });
  await expect(page.getByRole("status")).toContainText("Imported 1 snippet");
  await expect(results).toHaveCount(43);
  await page
    .getByRole("button", { name: "Kotlin section", exact: true })
    .click();
  await search.fill("Imported Kotlin");
  await results.filter({ hasText: "Imported Kotlin" }).click();
  await page.getByRole("button", { name: "More snippet actions" }).click();
  await page
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await expect(results.filter({ hasText: "Imported Kotlin" })).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const invalid = await editor.inputValue();
  await editor.fill(
    invalid.replace('kotlinVersion: "1.8"', "kotlinVersion: 1.8"),
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
    page.getByRole("button", { name: "Kotlin section" }),
  ).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Import snippets", exact: true }),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Collapse navigation" }).click();
  await expect(
    page.getByRole("button", { name: "Kotlin section" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Expand navigation" }).click();
  await page.setViewportSize({ width: 1440, height: 940 });
  await search.fill("Copy a data class with changed fields");
  await results
    .filter({ hasText: "Copy a data class with changed fields" })
    .click();
  if (await page.getByRole("button", { name: "Dismiss notification" }).count())
    await page.getByRole("button", { name: "Dismiss notification" }).click();
  await page.screenshot({
    path: "artifacts/kotlin-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "light", exact: true }).click();
  await page.getByRole("button", { name: "Close settings" }).click();
  await page.screenshot({
    path: "artifacts/kotlin-light.png",
    fullPage: true,
    animations: "disabled",
  });
});
