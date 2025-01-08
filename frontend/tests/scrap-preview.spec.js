const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.route("http://localhost:8080/api/scraps", async (route) => {
    const json = {
      scraps: [
        {
          name: "Test Film",
          img: "https://pic.pnnet.dev/256x256?text=Lorem%20Picsum",
          director: "Test Director",
          releaseYear: 1111,
          rating: 1,
          review: "Test film review",
          type: "FILM",
        },
        {
          name: "Test Book",
          img: "https://pic.pnnet.dev/256x256?text=Lorem%20Picsum",
          author: "Test Author",
          releaseYear: 2222,
          rating: 2,
          review: "Test book review",
          type: "BOOK",
        },
      ],
    };
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(json),
    });
  });

  await page.goto("http://localhost:3000/digital-scrapbook");
});

test.describe("Check scrap preview functionality", async () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Films").click();
    await page.locator(".scrap-preview").first().click();
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
