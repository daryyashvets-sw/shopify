import { Page, Locator } from "@playwright/test";

export class homePage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productCards = page.locator('a[id^="product-"]');
    this.productNames = page.locator('a[id^="product-"] h3');
    this.productPrices = page.locator('a[id^="product-"] h4');
    this.cartCount = page.locator("#cart-target-desktop");
  }

  async goto() {
    await this.page.goto("/");
  }

  async getProductCount() {
    return await this.productCards.count();
  }

  async getProductName(id: string) {
    return await this.page.locator(`#${id} h3`).textContent();
  }

  async getProductPrice(id: string) {
    return await this.page.locator(`#${id} h4`).textContent();
  }

  async clickProduct(name: string) {
    await this.productCards.filter({ hasText: name }).click();
  }
}
