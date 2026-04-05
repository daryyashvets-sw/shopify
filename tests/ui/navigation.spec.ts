import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";

test.describe("Main Navigation", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should navigate to Catalog page", async ({ page }) => {
    await homePage.goToCatalog();
    await expect(page).toHaveURL(/\/collections\/all/);
    await expect(page).toHaveTitle("Products – Sauce Demo");
  });

  test("should navigate to Blog page", async ({ page }) => {
    await homePage.goToBlog();
    await expect(page).toHaveURL(/\/blogs\/news/);
    await expect(page).toHaveTitle("News – Sauce Demo");
  });

  test("should navigate to About Us page", async ({ page }) => {
    await homePage.goToAboutUs();
    await expect(page).toHaveURL(/\/pages\/about-us/);
    await expect(page).toHaveTitle("About Us – Sauce Demo");
  });
});
