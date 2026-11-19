import { test, expect } from "@playwright/test";
test("manages a separate C section with versions and imports", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const results = page.getByRole("listbox").getByRole("option");
  await page.getByRole("button", { name: "C section", exact: true }).click();
  await expect(results).toHaveCount(42);
  const version = page.getByLabel("Filter by C version");
  await expect(version.locator("option")).toHaveText([
    "Any C version",
    "C 89 compatible",
    "C 99 compatible",
    "C 11 compatible",
    "C 17 compatible",
    "C 23 compatible",
  ]);
  await version.selectOption("11");
  await expect(results).toHaveCount(40);
  await version.selectOption("17");
  await expect(results).toHaveCount(42);
  await version.selectOption("");
  const search = page.getByRole("textbox", { name: "Search snippets" });
  await search.fill("Read a small text file with a size limit");
  await results
    .filter({ hasText: "Read a small text file with a size limit" })
    .click();
  await expect(
    page.getByRole("button", { name: "Snippet.c", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".code-container .code-view")).toHaveAttribute(
    "data-language",
    "c",
  );
  await expect(page.locator(".code-container .shiki")).toBeVisible({
    timeout: 15000,
  });
  await page
    .getByRole("button", { name: "Copy with headers", exact: true })
    .click();
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).replace(
      /\r\n/g,
      "\n",
    ),
  ).toContain("#include <stdio.h>\n\nint main(void)");
  await page.getByRole("button", { name: "Add to favorites" }).click();
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(1);
  await page.reload();
  await expect(page.getByRole("button", { name: "C section" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(results).toHaveCount(1);
  await page.getByRole("button", { name: "SQL section", exact: true }).click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(44);
  await page.getByRole("button", { name: "C section", exact: true }).click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await search.fill("");
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const editor = page.getByRole("textbox", { name: "Snippet Markdown" });
  const draft = await editor.inputValue();
  expect(draft).toContain("language: c");
  expect(draft).toContain("cVersion: 11");
  expect(draft).not.toContain("javaVersion:");
  await editor.fill(
    draft
      .replace("my-new-snippet", "c-ui")
      .replace("My new snippet", "Created C snippet"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await expect(page.locator("main h2")).toHaveText("Created C snippet");
  await page.getByRole("button", { name: "Edit snippet", exact: true }).click();
  await editor.fill(
    (await editor.inputValue()).replace("Hello, C!", "Hello, edited C!"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Hello, edited C!",
  );
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export snippet", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("c-ui.md");
  await page.getByRole("button", { name: "Java section", exact: true }).click();
  const imported =
    "---\nid: c-imported\nlanguage: c\ntitle: Imported C\ndescription: Imported example.\ncategory: Modules\ntags: []\ncVersion: 17\n---\n\n```c\nint value = 42;\n```\n";
  await page.locator("input[type=file]").setInputFiles({
    name: "c-imported.md",
    mimeType: "text/markdown",
    buffer: Buffer.from(imported),
  });
  await expect(page.getByRole("status")).toContainText("Imported 1 snippet");
  await expect(results).toHaveCount(43);
  await page.getByRole("button", { name: "C section", exact: true }).click();
  await search.fill("Imported C");
  await results.filter({ hasText: "Imported C" }).click();
  await page.getByRole("button", { name: "More snippet actions" }).click();
  await page
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await expect(results.filter({ hasText: "Imported C" })).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const invalid = await editor.inputValue();
  await editor.fill(invalid.replace("cVersion: 11", 'cVersion: "11"'));
  await expect(
    page.getByRole("button", { name: "Save snippet", exact: true }),
  ).toBeDisabled();
  await page.getByRole("button", { name: "Close editor" }).click();
  await page
    .getByRole("button", { name: "Discard changes", exact: true })
    .click();
  await page.setViewportSize({ width: 960, height: 640 });
  await expect(
    page.getByRole("button", { name: "C section" }),
  ).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Import snippets", exact: true }),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Collapse navigation" }).click();
  await expect(page.getByRole("button", { name: "C section" })).toBeVisible();
  await page.getByRole("button", { name: "Expand navigation" }).click();
  await page.setViewportSize({ width: 1440, height: 940 });
  await search.fill("Format text and detect truncation");
  await results
    .filter({ hasText: "Format text and detect truncation" })
    .click();
  if (await page.getByRole("button", { name: "Dismiss notification" }).count())
    await page.getByRole("button", { name: "Dismiss notification" }).click();
  await page.screenshot({
    path: "artifacts/c-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "light", exact: true }).click();
  await page.getByRole("button", { name: "Close settings" }).click();
  await page.screenshot({
    path: "artifacts/c-light.png",
    fullPage: true,
    animations: "disabled",
  });
});
