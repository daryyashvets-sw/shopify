import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class AccountPage extends BasePage {
  readonly page: Page;
  readonly accountPageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.accountPageHeading = page.getByRole("heading", {
      name: "Account Details",
    });
  }
}
