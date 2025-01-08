class ScrapPage {
  constructor(page) {
    this.page = page;
    this.scrapPreviews = page.locator(".scrap-preview");
    this.filters = page.locator("[data-testid='filter']");
    this.sortDropdown = page.locator("#sortBy");
    this.noScrapsMessage = page.locator(".no-scraps-message");
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
}

module.exports = { ScrapPage };
