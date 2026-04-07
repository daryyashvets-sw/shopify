import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { UserData } from "../fixtures/userData";

export class SignupPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly createButton: Locator;
  readonly createAccountHeading: Locator;
  readonly duplicateEmailError: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator("input#first_name");
    this.lastNameInput = page.locator("input#last_name");
    this.emailInput = page.locator("input#email");
    this.passwordInput = page.locator("input#password");
    this.createButton = page.getByRole("button", { name: "Create" });
    this.createAccountHeading = page.getByRole("heading", {
      name: "Create Account",
    });
    this.duplicateEmailError = page.getByText(
      "This email address is already associated with an account.",
    );
  }

  async fillSignupForm(data: UserData) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
  }

  async clickCreateButton() {
    await this.createButton.click();
  }
}
