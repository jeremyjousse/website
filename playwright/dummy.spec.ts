import { expect, test } from "@playwright/test";

test("HP has heading", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page.getByRole("heading", { level: 2 })).toBeDefined();
});

test("load articles page", async ({ page }) => {
  await page.goto("/");

  // Click the get started link.
  await page.getByRole("link", { name: "Articles" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByTestId("articles-section")).toBeDefined();
});
