const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/digital-scrapbook");
});

test.describe("Check initial state of page after load", () => {
    test("should have the correct title", async ({ page }) => {
        await expect(page).toHaveTitle("Digital Scrapbook");
    });

    test("No filters selected message should be shown", async ({ page }) => {
        await expect(page.getByTestId("no-filters-message")).toHaveText("No filters selected");
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
});

test.describe("Check filter functionality", () => {
    test("should select filter when clicked", async ({ page }) => {
        const filter = await page.locator("[data-testid='filter']").first();
        await filter.click();
        await expect(filter).toHaveClass("selected");
    });

    test("should deselect filter when clicked twice", async ({ page }) => {
        const filter = await page.locator("[data-testid='filter']").first();
        await filter.click();
        await filter.click();
        await expect(filter).not.toHaveClass("selected");
    });

    test("should show scrap previews when filter is selected", async ({ page }) => {
        const filter = await page.locator("[data-testid='filter']").first();
        await filter.click();
        const count = await page.locator(".scrap-preview").count();
        await expect(count).toBeGreaterThan(0);
    });

    test("should hide scrap previews when filter is deselected", async ({ page }) => {
        const filter = await page.locator("[data-testid='filter']").first();
        await filter.click();
        await filter.click();
        await expect(page.locator(".scrap-preview")).toHaveCount(0);
    });
});

test.describe("Check scrap preview functionality", () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText("Films").click();
        await page.locator(".scrap-preview").first().click();
    });

    test("clicking a scrap preview should open the scrap", async ({ page }) => {
        await expect(page.locator(".scrap")).toBeVisible();
    });

    test("clicking outside of the scrap should close it", async ({ page }) => {
        const scrap = await page.locator(".scrap");
        const boundingBox = await scrap.boundingBox();
        if (boundingBox) {
            await page.mouse.click(boundingBox.x - 10, boundingBox.y - 10);
        }
        await expect(page.locator(".scrap")).not.toBeVisible();
    });
});