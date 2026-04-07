import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";
import { existingUser, invalidCredentials } from "../../fixtures/userData";
import { LoginPage } from "../../pages/loginPage";

test.describe.skip("User login", () => {
  let basePage: BasePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    loginPage = new LoginPage(page);
    await basePage.goto();
  });

  test("should login and logout successfully", async () => {
    await basePage.clickLoginLink();

    await loginPage.fillLoginForm({
      email: existingUser.email,
      password: existingUser.password,
    });

    // CAPTCHA blocks automated execution
    await loginPage.clickSigninButton();

    await expect(basePage.myAccountLink).toBeVisible();

    await basePage.logoutLink.click();
    await expect(basePage.loginLink).toBeVisible();
    await expect(basePage.page).toHaveTitle("Sauce Demo");
  });

  test("should reject login with incorrect password", async () => {
    await basePage.clickLoginLink();

    await loginPage.fillLoginForm({
      email: existingUser.email,
      password: invalidCredentials.wrongPassword,
    });

    // CAPTCHA blocks automated execution
    await loginPage.clickSigninButton();

    await expect(loginPage.invalidCredentialsError).toBeVisible();
    await expect(basePage.myAccountLink).not.toBeVisible();
  });

  test("should reject login with incorrect email", async () => {
    await basePage.clickLoginLink();

    await loginPage.fillLoginForm({
      email: invalidCredentials.wrongEmail,
      password: existingUser.password,
    });
    // CAPTCHA blocks automated execution
    await loginPage.clickSigninButton();

    await expect(loginPage.invalidCredentialsError).toBeVisible();
    await expect(basePage.myAccountLink).not.toBeVisible();
  });
});
