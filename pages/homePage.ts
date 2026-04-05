import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly cartCount: Locator;
  readonly catalogNavigationItem: Locator;
  readonly blogNavigationItem: Locator;
  readonly aboutUsNavigationItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('a[id^="product-"]');
    this.cartCount = page.locator("#cart-target-desktop");
    this.catalogNavigationItem = page.getByRole("link", { name: "Catalog" });
    this.blogNavigationItem = page.getByRole("link", { name: "Blog" });
    this.aboutUsNavigationItem = page
      .locator("#main-menu")
      .getByRole("link", { name: "About us" });
  }

  async goto() {
    await this.page.goto("/");
  }
  async getFirstProductName() {
    const name = await this.productCards.first().locator("h3").textContent();
    return name?.trim() || "";
  }

  async getFirstProductPrice() {
    const name = await this.productCards.first().locator("h4").textContent();
    return name?.trim() || "";
  }

  async getProductCount() {
    return await this.productCards.count();
  }

  async clickProduct(name: string) {
    await this.productCards.filter({ hasText: name }).click();
  }
  async clickFirstProduct() {
    const firstProduct = this.productCards.first();
    const productName = await firstProduct.locator("h3").textContent();
    await firstProduct.click();
    return productName?.trim() || "";
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
