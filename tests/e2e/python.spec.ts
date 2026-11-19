import { test, expect } from "@playwright/test";
test("separates Java and Python and supports Python management", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const results = page.getByRole("listbox").getByRole("option");
  await expect(results).toHaveCount(43);
  await page
    .getByRole("button", { name: "Python section", exact: true })
    .click();
  await expect(results).toHaveCount(44);
  await expect(
    page.getByRole("button", { name: "Python section" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Filter by Python version")).toBeVisible();
  await expect(page.getByLabel("Filter by Java version")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Python Basics", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Java Basics", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("read text file");
  await results.filter({ hasText: "Read a text file" }).click();
  await expect(
    page.getByRole("button", { name: "Snippet.py", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".code-container .code-view")).toHaveAttribute(
    "data-language",
    "python",
  );
  await expect(page.locator(".code-container .shiki")).toBeVisible();
  await page
    .getByRole("button", { name: "Copy with imports", exact: true })
    .click();
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).replace(
      /\r\n/g,
      "\n",
    ),
  ).toBe(
    'from pathlib import Path\n\ncontent = Path("example.txt").read_text(encoding="utf-8")',
  );
  await page.getByRole("button", { name: "Add to favorites" }).click();
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(1);
  await page.getByRole("button", { name: "Java section", exact: true }).click();
  await expect(results).toHaveCount(43);
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(0);
  await page
    .getByRole("button", { name: "Python section", exact: true })
    .click();
  await expect(results).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Python section" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(results).toHaveCount(1);
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await page.getByLabel("Filter by Python version").selectOption("3.8");
  await expect(
    results.filter({ hasText: "Merge two dictionaries" }),
  ).toHaveCount(0);
  await page.getByLabel("Filter by Python version").selectOption("3.10");
  await expect(
    results.filter({ hasText: "Merge two dictionaries" }),
  ).toHaveCount(1);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const editor = page.getByRole("textbox", { name: "Snippet Markdown" }),
    draft = await editor.inputValue();
  expect(draft).toContain("language: python");
  expect(draft).toContain('pythonVersion: "3.9"');
  expect(draft).not.toContain("javaVersion:");
  await editor.fill(
    draft
      .replace("my-new-snippet", "test-python-ui")
      .replace("My new snippet", "Created Python snippet"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await expect(page.locator("main h2")).toHaveText("Created Python snippet");
  await expect(
    page.getByRole("button", { name: "Snippet.py", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Edit snippet", exact: true }).click();
  const editing = page.getByRole("textbox", { name: "Snippet Markdown" });
  await editing.fill(
    (await editing.inputValue()).replace(
      "Hello, Python!",
      "Hello, edited Python!",
    ),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    'print("Hello, edited Python!")',
  );
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export snippet", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("test-python-ui.md");
  await page.getByRole("button", { name: "Java section", exact: true }).click();
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(43);
  await page.locator("input[type=file]").setInputFiles({
    name: "python-import.md",
    mimeType: "text/markdown",
    buffer: Buffer.from(
      '---\nid: python-imported\nlanguage: python\ntitle: Imported Python\ndescription: Test Python import.\ncategory: Python Basics\ntags: [test]\npythonVersion: "3.10"\nimports: [import json]\n---\n\n```python\ntext = json.dumps({"answer": 42})\n```\n',
    ),
  });
  await expect(page.getByRole("status")).toContainText("Imported 1 snippet");
  await expect(results).toHaveCount(43);
  await page
    .getByRole("button", { name: "Python section", exact: true })
    .click();
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("Imported Python");
  await results.filter({ hasText: "Imported Python" }).click();
  await expect(page.locator("main h2")).toHaveText("Imported Python");
  await page.getByRole("button", { name: "More snippet actions" }).click();
  await page
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await expect(results.filter({ hasText: "Imported Python" })).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.setViewportSize({ width: 960, height: 640 });
  await expect(
    page.getByRole("button", { name: "Python section" }),
  ).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Import snippets", exact: true }),
  ).toBeInViewport();
  await page.setViewportSize({ width: 1440, height: 940 });
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("read text file");
  await results.filter({ hasText: "Read a text file" }).click();
  await page.getByRole("button", { name: "Dismiss notification" }).click();
  await page.screenshot({
    path: "artifacts/python-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "light", exact: true }).click();
  await page.getByRole("button", { name: "Close settings" }).click();
  await page.screenshot({
    path: "artifacts/python-light.png",
    fullPage: true,
    animations: "disabled",
  });
});
