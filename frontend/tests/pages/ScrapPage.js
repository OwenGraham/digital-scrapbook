class ScrapPage {
  constructor(page) {
    this.page = page;
    this.scrapPreviews = page.locator(".scrap-preview");
    this.filters = page.locator("[data-testid='filter']");
    this.sortDropdown = page.locator("#sortBy");
    this.noScrapsMessage = page.locator(".no-scraps-message");
    this.starRating = page.locator("#star-rating label svg");
    this.name = page.locator("[data-testid='name']");
    this.director = page.locator("[data-testid='director']");
    this.author = page.locator("[data-testid='author']");
    this.releaseYear = page.locator("[data-testid='release-year']");
    this.review = page.locator(".review");
    this.addScrapDropdown = page.locator("#typeSelect");
    this.addScrapForm = page.locator(".add-scrap-form");
    this.nameField = page.locator("#name");
    this.ratingField = page.locator("#rating");
    this.directorField = page.locator("#director");
    this.authorField = page.locator("#author");
    this.releaseYearField = page.locator("#releaseYear");
    this.reviewField = page.locator("#review");
    this.errorMessage = page.locator(".error-message");
    this.submitButton = page.locator("button[type='submit']");
  }

  getAllFilters() {
    return this.filters;
  }

  getFilter(filterName) {
    return this.page.getByText(filterName);
  }

  async selectFilter(filterName) {
    await this.page.getByText(filterName).click();
  }

  getScrapPreviews() {
    return this.scrapPreviews;
  }

  getNoScrapsMessage() {
    return this.noScrapsMessage;
  }

  getSortDropDown() {
    return this.sortDropdown;
  }

  async getSortMode() {
    return this.sortDropdown.getValue();
  }

  async sortNewToOld() {
    await this.sortDropdown.selectOption("New to old");
  }

  async sortOldToNew() {
    await this.sortDropdown.selectOption("Old to new");
  }

  async getStarRating() {
    await this.starRating.first().waitFor({ state: "visible" });
    let rating = 0;
    for (let i = 0; i < (await this.starRating.count()); i++) {
      const star = this.starRating.nth(i);
      if ((await star.getAttribute("fill")) === "gold") {
        rating++;
      }
    }
    return rating;
  }

  async getName() {
    return this.name.innerText();
  }

  async getDirector() {
    return this.director.innerText();
  }

  async getAuthor() {
    return this.author.innerText();
  }

  async getReleaseYear() {
    return this.releaseYear.innerText();
  }

  async getReview() {
    return this.review.innerText();
  }

  getAddScrapDropdown() {
    return this.addScrapDropdown;
  }

  async addScrap(type) {
    await this.addScrapDropdown.selectOption(type);
  }

  getAddScrapForm() {
    return this.addScrapForm;
  }

  getNameField() {
    return this.nameField;
  }

  async setNameField(value) {
    await this.nameField.fill(value);
  }

  getRatingField() {
    return this.ratingField;
  }

  async setRatingField(value) {
    await this.ratingField.evaluate(
      (input, value) => (input.value = value),
      value
    );
  }

  getDirectorField() {
    return this.directorField;
  }

  async setDirectorField(value) {
    await this.directorField.fill(value);
  }

  getAuthorField() {
    return this.authorField;
  }

  async setAuthorField(value) {
    await this.authorField.fill(value);
  }

  getReleaseYearField() {
    return this.releaseYearField;
  }

  async setReleaseYearField(value) {
    await this.releaseYearField.fill(value);
  }

  getReviewField() {
    return this.reviewField;
  }

  async setReviewField(value) {
    await this.reviewField.fill(value);
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  async submitForm() {
    await this.submitButton.click();
  }
}

module.exports = { ScrapPage };
