import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { ExistingUser } from "../fixtures/userData";

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signinButton: Locator;
  readonly invalidCredentialsError: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByLabel("Email Address");
    this.passwordInput = page.getByLabel("Password");
    this.signinButton = page.getByRole("button", { name: "Sign in" });
    this.invalidCredentialsError = page.getByText(
      "Incorrect email or password.",
    );
  }

  async fillLoginForm(data: ExistingUser) {
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
  }

  async clickSigninButton() {
    await this.signinButton.click();
  }
}
