import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly homeNavigationItem: Locator;
  readonly catalogNavigationItem: Locator;
  readonly blogNavigationItem: Locator;
  readonly aboutUsNavigationItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeNavigationItem = page.getByRole("link", { name: "Home" });
    this.catalogNavigationItem = page.getByRole("link", { name: "Catalog" });
    this.blogNavigationItem = page.getByRole("link", { name: "Blog" });
    this.aboutUsNavigationItem = page
      .locator("#main-menu")
      .getByRole("link", { name: "About us" });
  }
  async goToHome() {
    await this.homeNavigationItem.click();
  }
  async goToCatalog() {
    await this.catalogNavigationItem.click();
  }
  async goToBlog() {
    await this.blogNavigationItem.click();
  }
  async goToAboutUs() {
    await this.aboutUsNavigationItem.click();
  }
}
