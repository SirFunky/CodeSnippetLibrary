import { test, expect } from "@playwright/test";
test("separates C++ and supports headers and full snippet management", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const results = page.getByRole("listbox").getByRole("option");
  await expect(results).toHaveCount(43);
  await page.getByRole("button", { name: "C++ section", exact: true }).click();
  await expect(results).toHaveCount(42);
  await expect(page.getByLabel("Filter by C++ version")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "C++ Basics", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "C# Basics", exact: true }),
  ).toHaveCount(0);
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("read text file");
  await results.filter({ hasText: "Read a text file" }).click();
  await expect(
    page.getByRole("button", { name: "Snippet.cpp", exact: true }),
  ).toBeVisible();
  await expect(page.locator(".code-container .code-view")).toHaveAttribute(
    "data-language",
    "cpp",
  );
  await expect(page.locator(".code-container .shiki")).toBeVisible({
    timeout: 15000,
  });
  await page
    .getByRole("button", { name: "Copy with headers", exact: true })
    .click();
  const copied = (
    await page.evaluate(() => navigator.clipboard.readText())
  ).replace(/\r\n/g, "\n");
  expect(copied).toContain(
    "#include <fstream>\n#include <iterator>\n#include <string>\n#include <stdexcept>\n\n",
  );
  expect(copied).toContain("std::string content");
  expect(copied).not.toContain("import ");
  await page.getByRole("button", { name: "Headers 4", exact: true }).click();
  await expect(page.locator(".code-container .shiki")).toContainText(
    "#include <fstream>",
  );
  await page.getByRole("button", { name: "Add to favorites" }).click();
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(1);
  await page.getByRole("button", { name: "C# section", exact: true }).click();
  await expect(results).toHaveCount(43);
  await page
    .getByRole("button", { name: "Favorites", exact: false })
    .first()
    .click();
  await expect(results).toHaveCount(0);
  await page.getByRole("button", { name: "C++ section", exact: true }).click();
  await expect(results).toHaveCount(1);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "C++ section" }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(results).toHaveCount(1);
  await page
    .getByRole("button", { name: "All snippets", exact: false })
    .first()
    .click();
  await page.getByLabel("Filter by C++ version").selectOption("17");
  await expect(
    results.filter({ hasText: "Check whether a map contains a key" }),
  ).toHaveCount(0);
  await page.getByLabel("Filter by C++ version").selectOption("20");
  await expect(
    results.filter({ hasText: "Check whether a map contains a key" }),
  ).toHaveCount(1);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.getByRole("button", { name: "New snippet", exact: false }).click();
  const editor = page.getByRole("textbox", { name: "Snippet Markdown" }),
    draft = await editor.inputValue();
  expect(draft).toContain("language: cpp");
  expect(draft).toContain("cppVersion: 17");
  expect(draft).not.toContain("javaVersion:");
  await editor.fill(
    draft
      .replace("my-new-snippet", "cpp-ui")
      .replace("My new snippet", "Created Cpp snippet"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await expect(page.locator("main h2")).toHaveText("Created Cpp snippet");
  await page.getByRole("button", { name: "Edit snippet", exact: true }).click();
  const editing = page.getByRole("textbox", { name: "Snippet Markdown" });
  await editing.fill(
    (await editing.inputValue()).replace("Hello, C++!", "Hello, edited C++!"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await page
    .getByRole("button", { name: "Copy with headers", exact: true })
    .click();
  expect(
    (await page.evaluate(() => navigator.clipboard.readText())).replace(
      /\r\n/g,
      "\n",
    ),
  ).toBe('#include <iostream>\n\nstd::cout << "Hello, edited C++!\\n";');
  const download = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Export snippet", exact: true })
    .click();
  expect((await download).suggestedFilename()).toBe("cpp-ui.md");
  await page.getByRole("button", { name: "Java section", exact: true }).click();
  await expect(results).toHaveCount(43);
  await page
    .locator("input[type=file]")
    .setInputFiles({
      name: "import-cpp.md",
      mimeType: "text/markdown",
      buffer: Buffer.from(
        '---\nid: cpp-imported\nlanguage: cpp\ntitle: Imported Cpp\ndescription: Test import.\ncategory: C++ Basics\ntags: [test]\ncppVersion: 17\nimports: ["<iostream>"]\n---\n\n```cpp\nstd::cout << 42;\n```\n',
      ),
    });
  await expect(page.getByRole("status")).toContainText("Imported 1 snippet");
  await expect(results).toHaveCount(43);
  await page.getByRole("button", { name: "C++ section", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("Imported Cpp");
  await results.filter({ hasText: "Imported Cpp" }).click();
  await page.getByRole("button", { name: "More snippet actions" }).click();
  await page
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await page
    .getByRole("alertdialog")
    .getByRole("button", { name: "Delete snippet", exact: true })
    .click();
  await expect(results.filter({ hasText: "Imported Cpp" })).toHaveCount(0);
  await page
    .getByRole("button", { name: "Clear filters", exact: true })
    .click();
  await page.setViewportSize({ width: 960, height: 640 });
  await expect(
    page.getByRole("button", { name: "C++ section" }),
  ).toBeInViewport();
  await expect(
    page.getByRole("button", { name: "Import snippets", exact: true }),
  ).toBeInViewport();
  await page.getByRole("button", { name: "Collapse navigation" }).click();
  await expect(page.getByRole("button", { name: "C++ section" })).toBeVisible();
  await page.getByRole("button", { name: "Expand navigation" }).click();
  await page.setViewportSize({ width: 1440, height: 940 });
  await page
    .getByRole("textbox", { name: "Search snippets" })
    .fill("read text file");
  await results.filter({ hasText: "Read a text file" }).click();
  if (await page.getByRole("button", { name: "Dismiss notification" }).count())
    await page.getByRole("button", { name: "Dismiss notification" }).click();
  await page.screenshot({
    path: "artifacts/cpp-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "light", exact: true }).click();
  await page.getByRole("button", { name: "Close settings" }).click();
  await page.screenshot({
    path: "artifacts/cpp-light.png",
    fullPage: true,
    animations: "disabled",
  });
});
