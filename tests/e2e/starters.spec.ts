import { test, expect } from "@playwright/test";
test("offers a complete Hello World template in every language and saves an independent copy", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/");
  const languages = [
    "Java",
    "Python",
    "C#",
    "C++",
    "C",
    "SQL",
    "TypeScript",
    "JavaScript",
    "Go",
    "Kotlin",
    "COBOL",
  ];
  const results = page.getByRole("listbox").getByRole("option");
  for (const language of languages) {
    await page
      .getByRole("button", { name: `${language} section`, exact: true })
      .click();
    await page
      .getByRole("button", { name: "Starter Templates", exact: true })
      .click();
    await expect(results).toHaveCount(1);
    await results.first().click();
    await expect(page.locator("main h2")).toHaveText(
      `Hello World — ${language}`,
    );
    await page.getByRole("button", { name: "Copy code", exact: true }).click();
    const copied = await page.evaluate(() => navigator.clipboard.readText());
    expect(copied).toContain("Hello, World!");
    if (language === "Java")
      expect(copied).toContain("public static void main");
    if (language === "C++") expect(copied).toContain("#include <iostream>");
    if (language === "Go") expect(copied).toContain('import "fmt"');
    await page
      .getByRole("button", { name: "Use as template", exact: true })
      .click();
    const editor = page.getByRole("textbox", { name: "Snippet Markdown" });
    const draft = await editor.inputValue();
    expect(draft).toContain(`My ${language} program`);
    expect(draft).not.toContain('id: "starter-');
    expect(draft).toContain("Hello, World!");
    await page
      .getByRole("button", { name: "Close editor", exact: true })
      .click();
  }
  await page.getByRole("button", { name: "Java section", exact: true }).click();
  await results.first().click();
  await page
    .getByRole("button", { name: "Use as template", exact: true })
    .click();
  const editor = page.getByRole("textbox", { name: "Snippet Markdown" });
  await editor.fill(
    (await editor.inputValue()).replace("Hello, World!", "Hello, my program!"),
  );
  await page.getByRole("button", { name: "Save snippet", exact: true }).click();
  await expect(page.locator("main h2")).toHaveText("My Java program");
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Hello, my program!",
  );
  await page
    .getByRole("button", { name: "Starter Templates", exact: true })
    .click();
  await results.filter({ hasText: "Hello World — Java" }).click();
  await page.getByRole("button", { name: "Copy code", exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "Hello, World!",
  );
  await page.setViewportSize({ width: 960, height: 640 });
  await expect(
    page.getByRole("button", { name: "Use as template", exact: true }),
  ).toBeInViewport();
  await page.reload();
  await expect(results).toHaveCount(2);
  await page.setViewportSize({ width: 1440, height: 940 });
  await results.filter({ hasText: "Hello World — Java" }).click();
  if (await page.getByRole("button", { name: "Dismiss notification" }).count())
    await page.getByRole("button", { name: "Dismiss notification" }).click();
  await page.screenshot({
    path: "artifacts/starters-dark.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "Settings", exact: true }).click();
  await page.getByRole("button", { name: "light", exact: true }).click();
  await page.getByRole("button", { name: "Close settings" }).click();
  await page.screenshot({
    path: "artifacts/starters-light.png",
    fullPage: true,
    animations: "disabled",
  });
});
