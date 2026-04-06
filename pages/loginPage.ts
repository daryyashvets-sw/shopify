import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { ExistingUser } from "../fixtures/userData";

export class LoginPage extends BasePage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly SigninButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.emailInput = page.getByLabel("Email Address");
    this.passwordInput = page.getByLabel("Password");
    this.SigninButton = page.getByRole("button", { name: "Sign in" });
  }

  async fillLoginForm(data: ExistingUser) {
    await this.emailInput.fill(data.email as string);
    await this.passwordInput.fill(data.password as string);
  }

  async clickSigninButton() {
    await this.SigninButton.click();
  }
}
