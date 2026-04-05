import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProductPage extends BasePage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartCount: Locator;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.addToCartButton = page.locator(".add-to-cart");
    this.cartCount = page.locator("#cart-target-desktop");
    this.cartButton = page.locator(".checkout");
    this.checkoutButton = page.getByRole("button", { name: "Check Out" });
    this.productNames = page.locator("#product-form");
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.cartButton.click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }
  async getProductName() {
    const productName = await this.page
      .locator('h1[itemprop="name"]')
      .textContent();
    return productName?.trim() || "";
  }
}
