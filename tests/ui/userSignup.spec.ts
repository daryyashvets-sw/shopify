import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";
import { SignupPage } from "../../pages/signupPage";
import { userData } from "../../fixtures/userData";

test.describe("User signup and duplicate email validation", () => {
  let homePage: HomePage;
  let signupPage: SignupPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    signupPage = new SignupPage(page);
    await homePage.goto();
  });

  test("should successfully signup and log out", async ({ page }) => {
    await homePage.clickSignupLink();

    await expect(
      page.getByRole("heading", { name: "Create Account" }),
    ).toBeVisible();

    await signupPage.fillSignupForm(userData);
    await signupPage.clickCreateButton();

    // using 'page' here to check the presence of 'My Account' link because it is in the header and available on all pages after login
    // CAPTCHA blocks automated execution
    await expect(page.getByRole("link", { name: "My Account" })).toBeVisible();

    await page.getByRole("link", { name: "My Account" }).click();

    await expect(
      page.getByRole("heading", { name: "Account Details and Order History" }),
    ).toBeVisible();

    await page.getByRole("link", { name: "Log out" }).click();

    // doublecheck if there is log in:
    await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
    await expect(page).toHaveTitle("Sauce Demo");
  });

  test("should not allow signup with duplicate email", async ({ page }) => {
    const duplicateEmail = `test${Date.now()}@example.com`;

    await homePage.clickSignupLink();

    await expect(
      page.getByRole("heading", { name: "Create Account" }),
    ).toBeVisible();

    await signupPage.fillSignupForm({
      ...userData,
      email: duplicateEmail,
    });

    // CAPTCHA blocks automated execution
    await signupPage.clickCreateButton();

    await expect(page).toHaveTitle("Sauce Demo");
    await expect(page.getByRole("link", { name: "My Account" })).toBeVisible();

    await page.getByRole("link", { name: "Log out" }).click();

    await homePage.clickSignupLink();

    await signupPage.fillSignupForm({
      ...userData,
      email: duplicateEmail,
    });

    await signupPage.clickCreateButton();

    await expect(
      page.getByText(
        "This email address is already associated with an account.",
      ),
    ).toBeVisible();
  });
});
