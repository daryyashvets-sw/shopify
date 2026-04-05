import { Page, Locator } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.getByRole("button", { name: "Check Out" });
  }
  async goToCheckout() {
    await this.checkoutButton.click();
  }
}

// check price
//check product name
// remove
//change quant
