import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProductPage extends BasePage {
  readonly page: Page;
  readonly addToCartButton: Locator;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly soldOutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.addToCartButton = page.locator(".add-to-cart");
    this.cartButton = page.locator(".checkout");
    this.checkoutButton = page.getByRole("button", { name: "Check Out" });
    this.soldOutButton = page.getByRole("button", { name: "Sold Out" });
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
