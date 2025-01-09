const { test, expect } = require("@playwright/test");
const { ScrapPage } = require("./pages/ScrapPage");

let scrapPage;

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/digital-scrapbook");
  scrapPage = new ScrapPage(page);
});

test.describe("Check selecting option from add scrap dropdown opens correct form", () => {
  test("should open film form when 'Film' is selected", async ({ page }) => {
    await scrapPage.addScrap("FILM");
    await expect(scrapPage.getAddScrapForm()).toBeVisible();
    await expect(scrapPage.getAddScrapForm()).toContainText("Add film");
    await expect(scrapPage.getRatingField()).toBeVisible();
    await expect(scrapPage.getDirectorField()).toBeVisible();
  });

  test("should open book form when 'Book' is selected", async ({ page }) => {
    await scrapPage.addScrap("BOOK");
    await expect(scrapPage.getAddScrapForm()).toBeVisible();
    await expect(scrapPage.getAddScrapForm()).toContainText("Add book");
    await expect(scrapPage.getAuthorField()).toBeVisible();
  });
});

test.describe("Check input validation", () => {
  test("should show alert when required fields are not filled in", async ({
    page,
  }) => {
    await scrapPage.addScrap("FILM");
    await scrapPage.submitForm();

    const nameField = await scrapPage.getNameField();
    const ratingField = await scrapPage.getRatingField();
    const directorField = await scrapPage.getDirectorField();
    const releaseYearField = await scrapPage.getReleaseYearField();
    const reviewField = await scrapPage.getReviewField();

    const nameValidity = await nameField.evaluate(
      (input) => input.validity.valueMissing
    );
    const ratingValidity = await ratingField.evaluate(
      (input) => input.validity.valueMissing
    );
    const directorValidity = await directorField.evaluate(
      (input) => input.validity.valueMissing
    );
    const releaseYearValidity = await releaseYearField.evaluate(
      (input) => input.validity.valueMissing
    );
    const reviewValidity = await reviewField.evaluate(
      (input) => input.validity.valueMissing
    );

    expect(nameValidity).toBeTruthy();
    expect(ratingValidity).toBeTruthy();
    expect(directorValidity).toBeTruthy();
    expect(releaseYearValidity).toBeTruthy();
    expect(reviewValidity).toBeTruthy();
  });

  test("should not allow user to enter non-number characters into rating field", async ({
    page,
  }) => {
    await scrapPage.addScrap("FILM");
    await scrapPage.setNameField("Inception");
    await scrapPage.setRatingField("not a number");
    await scrapPage.setDirectorField("Christopher Nolan");
    await scrapPage.setReleaseYearField("2010");
    await scrapPage.setReviewField("A movie about dreams");

    await scrapPage.submitForm();

    await expect(scrapPage.getRatingField()).toHaveText("");
  });

  test("should show alert when image field is empty", async ({ page }) => {
    await page.route("http://localhost:8080/api/scraps", async (route) => {
      const json = {
        scraptype: "FILM",
        field: "img",
        validationError: "isNotEmpty",
        message: "Image required. Upload an image or provide a URL.",
      };
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 400,
          contentType: "application/json",
          body: JSON.stringify(json),
        });
      }
    });
    await scrapPage.addScrap("FILM");
    await scrapPage.setNameField("Inception");
    await scrapPage.setRatingField("5");
    await scrapPage.setDirectorField("Christopher Nolan");
    await scrapPage.setReleaseYearField("2010");
    await scrapPage.setReviewField("A movie about dreams");

    await scrapPage.submitForm();

    await expect(scrapPage.getErrorMessage()).toHaveText(
      "Image required. Upload an image or provide a URL."
    );
  });

  test("Should so error message when rating is out of bounds", async ({
    page,
  }) => {
    await page.route("http://localhost:8080/api/scraps", async (route) => {
      const json = {
        scraptype: "FILM",
        field: "rating",
        validationError: "isInRange",
        message: "Rating must be in the range 1-5.",
      };
      if (route.request().method() === "POST") {
        await route.fulfill({
          status: 400,
          contentType: "application/json",
          body: JSON.stringify(json),
        });
      }
    });

    await scrapPage.addScrap("FILM");
    await scrapPage.setNameField("Inception");
    await scrapPage.setRatingField("6");
    await scrapPage.setDirectorField("Christopher Nolan");
    await scrapPage.setReleaseYearField("2010");
    await scrapPage.setReviewField("A movie about dreams");

    await scrapPage.submitForm();

    await expect(scrapPage.getErrorMessage()).toHaveText(
      "Rating must be in the range 1-5."
    );
  });
});
