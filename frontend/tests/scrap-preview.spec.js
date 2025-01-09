const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { ScrapPage } = require("./pages/ScrapPage");

test.describe("Check scrap preview functionality", async () => {
  let scrapPage;

  test.beforeEach(async ({ page }) => {
    await page.route("http://localhost:8080/api/scraps", async (route) => {
      const dataPath = path.resolve(__dirname, "./data/test-scraps.json");
      const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(data),
      });
    });

    await page.goto("http://localhost:3000/digital-scrapbook");

    scrapPage = new ScrapPage(page);

    await scrapPage.selectFilter("Films");
    await scrapPage.getScrapPreviews().first().click();
  });

  test("the correct number of scrap previews should be shown", async ({
    page,
  }) => {
    await expect(page.locator(".scrap-preview")).toHaveCount(1);
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
