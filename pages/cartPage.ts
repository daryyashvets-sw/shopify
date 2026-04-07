import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class CartPage extends BasePage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly productQuantity: Locator;
  readonly updateButton: Locator;
  readonly total: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.checkoutButton = page.getByRole("button", { name: "Check Out" });
    this.productQuantity = page.locator("#cart .quantity input");
    this.updateButton = page.getByRole("button", { name: "Update" });
    this.total = page.getByRole("heading").filter({ hasText: "Total £" });
    this.removeButton = page.getByRole("link", { name: "x" });
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async getProductQuantity() {
    const quantity = await this.productQuantity.inputValue();
    return quantity;
  }
  async changeProductQuantity(quantity: string) {
    await this.productQuantity.fill(quantity);
  }

  async getTotal() {
    const total = await this.total.textContent();
    return total?.trim() || "";
  }

  async updateCart() {
    await this.updateButton.click();
  }

  async removeFromCart() {
    await this.removeButton.click();
  }
}
