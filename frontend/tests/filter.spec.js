const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { ScrapPage } = require("./pages/ScrapPage");

test.describe("Check filter functionality", () => {
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
  });

  test("should select filter when clicked", async ({ page }) => {
    const filter = await scrapPage.getFilter("Films");
    await filter.click();
    await expect(filter).toHaveClass("selected");
  });

  test("should deselect filter when clicked twice", async ({ page }) => {
    const filter = await scrapPage.getFilter("Films");
    await filter.click();
    await filter.click();
    await expect(filter).not.toHaveClass("selected");
  });

  test("should show scrap previews for selected filter", async ({ page }) => {
    await scrapPage.selectFilter("Films");
    await expect(scrapPage.getScrapPreviews()).toHaveCount(1);
  });

  test("selecting more than one filter should show preview scraps for all selected filters", async ({
    page,
  }) => {
    await scrapPage.selectFilter("Films");
    await scrapPage.selectFilter("Books");
    await expect(scrapPage.getScrapPreviews()).toHaveCount(2);
  });

  test("deselcting a filter should remove the previews for that filter", async ({
    page,
  }) => {
    await scrapPage.selectFilter("Films");
    await scrapPage.selectFilter("Books");
    await scrapPage.selectFilter("Films");
    await expect(scrapPage.getScrapPreviews()).toHaveCount(1);
  });

  test("selecting 'All' filter should show all scrap previews", async ({
    page,
  }) => {
    await scrapPage.selectFilter("All");
    await expect(scrapPage.getScrapPreviews()).toHaveCount(3);
  });

  test("should show 'No scraps found' message when no scraps match selected filters", async ({
    page,
  }) => {
    await scrapPage.selectFilter("Events");
    await expect(scrapPage.getNoScrapsMessage()).toBeVisible();
    await expect(scrapPage.getNoScrapsMessage()).toHaveText(
      "No scraps, make some!"
    );
  });

  test("the sort mode menu should show the selected sort mode", async ({
    page,
  }) => {
    await scrapPage.sortOldToNew();
    await expect(scrapPage.getSortDropDown()).toHaveValue("oldToNew");

    await scrapPage.sortNewToOld();
    await expect(scrapPage.getSortDropDown()).toHaveValue("newToOld");
  });

  test("selecting the all filter should select all filters", async ({
    page,
  }) => {
    const filters = scrapPage.getAllFilters();
    await scrapPage.selectFilter("All");
    for (let i = 1; i < filters.length; i++) {
      await expect(filters[i]).toHaveClass("selected");
    }
  });

  test("deselecting the all filter should deselect all filters", async ({
    page,
  }) => {
    const filters = scrapPage.getAllFilters();
    await scrapPage.selectFilter("All");
    await scrapPage.selectFilter("All");
    for (let i = 1; i < filters.length; i++) {
      await expect(filters[i]).not.toHaveClass("selected");
    }
  });

  test("deselcting a filter should deselect the all filter", async ({
    page,
  }) => {
    await scrapPage.selectFilter("All");
    await scrapPage.selectFilter("Films");
    await expect(scrapPage.getFilter("all")).not.toHaveClass("selected");
  });
});
