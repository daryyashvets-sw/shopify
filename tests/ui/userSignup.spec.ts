import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";
import { SignupPage } from "../../pages/signupPage";
import { existingUser, userData } from "../../fixtures/userData";
import { AccountPage } from "../../pages/accountPage";

test.describe.skip("User signup and duplicate email validation", () => {
  let basePage: BasePage;
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    signupPage = new SignupPage(page);

    await basePage.goto();
  });

  test("should successfully signup and log out", async () => {
    const accountPage = new AccountPage(basePage.page);

    await basePage.clickSignupLink();

    await expect(signupPage.createAccountHeading).toBeVisible();

    await signupPage.fillSignupForm(userData);
    await signupPage.clickCreateButton();

    // CAPTCHA blocks automated execution
    await expect(basePage.myAccountLink).toBeVisible();

    await basePage.myAccountLink.click();

    await expect(accountPage.accountPageHeading).toBeVisible();

    await accountPage.logoutLink.click();

    await expect(basePage.loginLink).toBeVisible();
    await expect(basePage.signupLink).toBeVisible();
    await expect(basePage.myAccountLink).not.toBeVisible();
    await expect(basePage.page).toHaveTitle("Sauce Demo");
  });

  test("should not allow signup with duplicate email", async () => {
    await basePage.clickSignupLink();

    await expect(signupPage.createAccountHeading).toBeVisible();

    await signupPage.fillSignupForm({
      ...userData,
      email: existingUser.email,
    });

    // CAPTCHA blocks automated execution
    await signupPage.clickCreateButton();

    await expect(signupPage.duplicateEmailError).toBeVisible();
    await expect(signupPage.myAccountLink).not.toBeVisible();
  });
});
