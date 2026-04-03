import { Page, Locator } from "@playwright/test";

export class productPage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartCount: Locator;
  readonly checkout: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator(".add-to-cart");
    this.cartCount = page.locator("#cart-target-desktop");
    this.checkout = page.locator(".checkout");
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async gotoCheckout() {
    await this.checkout.click();
  }
}
