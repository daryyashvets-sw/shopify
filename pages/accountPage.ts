import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class AccountPage extends BasePage {
  readonly accountPageHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.accountPageHeading = page.getByRole("heading", {
      name: "Account Details",
    });
  }
}
