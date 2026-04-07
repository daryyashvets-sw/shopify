import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProductPage extends BasePage {
  readonly addToCartButton: Locator;
  readonly checkoutLink: Locator;
  readonly checkoutButton: Locator;
  readonly soldOutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole("button", { name: "Add to Cart" });
    this.checkoutLink = page.getByRole("link", { name: "Check Out" });
    this.checkoutButton = page.getByRole("button", { name: "Check Out" });
    this.soldOutButton = page.getByRole("button", { name: "Sold Out" });
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goToCart() {
    await this.checkoutLink.click();
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
