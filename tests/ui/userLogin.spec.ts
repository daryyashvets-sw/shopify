import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";
import { SignupPage } from "../../pages/signupPage";
import { existingUser } from "../../fixtures/userData";
import { LoginPage } from "../../pages/loginPage";

test.describe("User login", () => {
  let homePage: HomePage;
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    await homePage.goto();
  });

  test("should login and logout successfully", async ({ page }) => {
    await homePage.clickLoginLink();

    await loginPage.fillLoginForm({
      email: existingUser.email,
      password: existingUser.password,
    });

    // CAPTCHA blocks automated execution
    await loginPage.clickSigninButton();

    await expect(page.getByRole("link", { name: "My Account" })).toBeVisible();

    await page.getByRole("link", { name: "Log out" }).click();
    await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
    await expect(page).toHaveTitle("Sauce Demo");
  });

  test("should reject login with incorrect password", async ({ page }) => {
    await homePage.clickLoginLink();

    await loginPage.fillLoginForm({
      email: existingUser.email,
      password: "incorrectPassword",
    });

    // CAPTCHA blocks automated execution
    await loginPage.clickSigninButton();

    await expect(page.getByText("Incorrect email or password.")).toBeVisible({
      timeout: 100000,
    });
  });

  test("should reject login with incorrect email", async ({ page }) => {
    await homePage.clickLoginLink();
    await loginPage.fillLoginForm({
      email: "nonexistent@example.com",
      password: existingUser.password,
    });
    // CAPTCHA blocks automated execution
    await loginPage.clickSigninButton();

    await expect(page.getByText("Incorrect email or password.")).toBeVisible();
  });
});
