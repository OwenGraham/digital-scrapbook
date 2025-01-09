const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/digital-scrapbook");
});

test.describe("Check initial state of page after load", () => {
  test("should have the correct title", async ({ page }) => {
    await expect(page).toHaveTitle("Digital Scrapbook");
  });

  test("No filters selected message should be shown", async ({ page }) => {
    await expect(page.getByTestId("no-filters-message")).toHaveText(
      "No filters selected"
    );
  });

  test("All filters should be visible on the page", async ({ page }) => {
    const filters = await page.locator("[data-testid='filter']");
    await expect(filters).toHaveText([
      "All",
      "Events",
      "Wishlist",
      "Films",
      "Books",
      "Albums",
      "Recipes",
      "Trips",
    ]);
  });

  test("All filters should be not selected", async ({ page }) => {
    const filters = await page.locator("[data-testid='filter']");
    const count = await filters.count();
    for (let i = 0; i < count; i++) {
      const filter = filters.nth(i);
      await expect(filter).not.toHaveClass("selected");
    }
  });

  test("No scrap previews should be shown", async ({ page }) => {
    await expect(page.locator(".scrap-preview")).not.toBeVisible();
  });

  test("sort dropdown should be set to 'New to Old'", async ({ page }) => {
    const sortDropdown = await page.locator("#sortBy");
    await expect(sortDropdown).toHaveValue("newToOld");
  });
});
