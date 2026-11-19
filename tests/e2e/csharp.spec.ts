import { test, expect } from "@playwright/test";
test("separates C# and supports its full snippet workflow", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const results = page.getByRole("listbox").getByRole("option");
  await expect(results).toHaveCount(43);
  await page.getByRole("button", { name: "C# section", exact: true }).click();
  await expect(results).toHaveCount(43);
  await expect(
    page.getByRole("button", { name: "C# section" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByLabel("Filter by C# version")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "C# Basics", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Python Basics", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("read text file");
  await results.filter({ hasText: "Read a text file asynchronously" }).click();
  await expect(
    page.getByRole("button", { name: "Snippet.cs", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".code-container .code-view")).toHaveAttribute(
    "data-language",
    "csharp",
  );
  await expect(page.locator(".code-container .shiki")).toBeVisible();
  await expect(page.getByText(".NET target", { exact: true })).toBeVisible();
  await expect(page.getByText(".NET 8.0+", { exact: true })).toBeVisible();
  await page
    .getByRole("button", { name: "Copy with imports", exact: true })
    .click();
  const clipboard = (
    await page.evaluate(() => navigator.clipboard.readText())
  ).replace(/\r\n/g, "\n");
  expect(clipboard).toBe(
    'using System.IO;\nusing System.Text;\n\nvar content = await File.ReadAllTextAsync(\n    "example.txt", Encoding.UTF8);',
  );
  await page.getByRole("button", { name: "Imports 2", exact: true }).click();
  await expect(page.locator(".code-container .shiki")).toContainText(
    "using System.IO;",
  );
  await page.getByRole("button", { name: "Add to favorites" }).click();
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(1);
  await page
    .getByRole("button", { name: "Python section", exact: true })
    .click();
  await expect(results).toHaveCount(44);
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(0);
  await page.getByRole("button", { name: "C# section", exact: true }).click();
  await expect(results).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "C# section" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(results).toHaveCount(1);
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await page.getByLabel("Filter by C# version").selectOption("8.0");
  await expect(
    results.filter({ hasText: "Create an array with a collection expression" }),
  ).toHaveCount(0);
  await page.getByLabel("Filter by C# version").selectOption("12.0");
  await expect(
    results.filter({ hasText: "Create an array with a collection expression" }),
  ).toHaveCount(1);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const editor = page.getByRole("textbox", { name: "Snippet Markdown" }),
    draft = await editor.inputValue();
  expect(draft).toContain("language: csharp");
  expect(draft).toContain('csharpVersion: "8.0"');
  expect(draft).toContain('dotnetVersion: "8.0"');
  expect(draft).not.toContain("javaVersion:");
  expect(draft).not.toContain("pythonVersion:");
  await editor.fill(
    draft
      .replace("my-new-snippet", "csharp-ui")
      .replace("My new snippet", "Created C# snippet"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await expect(page.locator("main h2")).toHaveText("Created C# snippet");
  await page.getByRole("button", { name: "Edit snippet", exact: true }).click();
  const editing = page.getByRole("textbox", { name: "Snippet Markdown" });
  await editing.fill(
    (await editing.inputValue()).replace("Hello, C#!", "Hello, edited C#!"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await page
    .getByRole("button", { name: "Copy with imports", exact: true })
    .click();
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).replace(
      /\r\n/g,
      "\n",
    ),
  ).toBe('using System;\n\nConsole.WriteLine("Hello, edited C#!");');
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export snippet", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("csharp-ui.md");
  await page.getByRole("button", { name: "Java section", exact: true }).click();
  await expect(results).toHaveCount(43);
  await page.locator("input[type=file]").setInputFiles({
    name: "import-csharp.md",
    mimeType: "text/markdown",
    buffer: Buffer.from(
      '---\nid: csharp-imported\nlanguage: csharp\ntitle: Imported CSharp\ndescription: Test import.\ncategory: C# Basics\ntags: [test]\ncsharpVersion: "8.0"\ndotnetVersion: "8.0"\nimports: [System]\n---\n\n```csharp\nConsole.WriteLine(42);\n```\n',
    ),
  });
  await expect(page.getByRole("status")).toContainText("Imported 1 snippet");
  await expect(results).toHaveCount(43);
  await page.getByRole("button", { name: "C# section", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("Imported CSharp");
  await results.filter({ hasText: "Imported CSharp" }).click();
  await page.getByRole("button", { name: "More snippet actions" }).click();
  await page
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await expect(results.filter({ hasText: "Imported CSharp" })).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.setViewportSize({ width: 960, height: 640 });
  await expect(
    page.getByRole("button", { name: "C# section" }),
  ).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Import snippets", exact: true }),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Collapse navigation" }).click();
  await expect(page.getByRole("button", { name: "C# section" })).toBeVisible();
  await page.getByRole("button", { name: "Expand navigation" }).click();
  await page.setViewportSize({ width: 1440, height: 940 });
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("read text file");
  await results.filter({ hasText: "Read a text file asynchronously" }).click();
  if (await page.getByRole("button", { name: "Dismiss notification" }).count())
    await page.getByRole("button", { name: "Dismiss notification" }).click();
  await page.screenshot({
    path: "artifacts/csharp-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "light", exact: true }).click();
  await page.getByRole("button", { name: "Close settings" }).click();
  await page.screenshot({
    path: "artifacts/csharp-light.png",
    fullPage: true,
    animations: "disabled",
  });
});
