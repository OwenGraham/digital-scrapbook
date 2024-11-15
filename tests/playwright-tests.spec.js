const { test, expect } = require('@playwright/test');

test.describe("Check initial state of page after load", () => {
    test("should have the correct title", async ({ page }) => {
        await page.goto("http://localhost:3000/digital-scrapbook");
        await expect(page).toHaveTitle("Digital Scrapbook");
    });

    test("No filters selected message should be shown", async ({ page }) => {
        await page.goto("http://localhost:3000/digital-scrapbook");
        await expect(page.getByTestId("no-filters-message")).toHaveText("No filters selected");
    });

    test("All filters should be not selected", async ({ page }) => {
        await page.goto("http://localhost:3000/digital-scrapbook");
        const filters = await page.locator("[data-testid='filter']");
        const count = await filters.count();
        for (let i = 0; i < count; i++) {
            const filter = filters.nth(i);
            await expect(filter).not.toHaveClass("selected");
        }
    });

    test("No scrap previews should be shown", async ({ page }) => {
        await page.goto("http://localhost:3000/digital-scrapbook");
        await expect(page.locator(".scrap-preview")).not.toBeVisible();
    });
});