import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";

test.describe("Main Navigation", () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.goto();
  });

  test("should navigate to Catalog page", async ({ page }) => {
    await basePage.goToCatalog();
    await expect(page).toHaveURL(/\/collections\/all/);
    await expect(page).toHaveTitle("Products – Sauce Demo");
  });

  test("should navigate to Blog page", async ({ page }) => {
    await basePage.goToBlog();
    await expect(page).toHaveURL(/\/blogs\/news/);
    await expect(page).toHaveTitle("News – Sauce Demo");
  });

  test("should navigate to About Us page", async ({ page }) => {
    await basePage.goToAboutUs();
    await expect(page).toHaveURL(/\/pages\/about-us/);
    await expect(page).toHaveTitle("About Us – Sauce Demo");
  });
});
