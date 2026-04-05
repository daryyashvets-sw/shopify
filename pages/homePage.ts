import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class HomePage extends BasePage {
  readonly page: Page;
  readonly productCards: Locator;
  readonly cartCount: Locator;

  constructor(page: Page) {
    super(page);

    this.page = page;
    this.productCards = page.locator('a[id^="product-"]');
    this.cartCount = page.locator("#cart-target-desktop");
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
}
