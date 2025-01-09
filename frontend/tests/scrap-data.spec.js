const { test, expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { ScrapPage } = require("./pages/ScrapPage");

test.describe("Check scrap data", () => {
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

  test("Check that the correct film data is displayed", async ({ page }) => {
    await scrapPage.selectFilter("Films");
    await scrapPage.getScrapPreviews().first().click();

    const name = await scrapPage.getName();
    const director = await scrapPage.getDirector();
    const year = await scrapPage.getReleaseYear();
    const rating = await scrapPage.getStarRating();
    const review = await scrapPage.getReview();

    expect(name).toEqual("Test Film");
    expect(director).toEqual("Test Director");
    expect(year).toEqual("1111");
    expect(rating).toEqual(1);
    expect(review).toEqual("Test film review");
  });

  test("Check that the correct book data is displayed", async ({ page }) => {
    await scrapPage.selectFilter("Books");
    await scrapPage.getScrapPreviews().first().click();

    const name = await scrapPage.getName();
    const author = await scrapPage.getAuthor();
    const year = await scrapPage.getReleaseYear();
    const rating = await scrapPage.getStarRating();
    const review = await scrapPage.getReview();

    expect(name).toEqual("Test Book");
    expect(author).toEqual("Test Author");
    expect(year).toEqual("2222");
    expect(rating).toEqual(2);
    expect(review).toEqual("Test book review");
  });
});
