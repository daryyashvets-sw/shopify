import { test, expect } from "@playwright/test";
import { homePage } from "../../pages/homePage";

test.describe("home page", () => {
  let homePageInstance: homePage;
  test.beforeEach(async ({ page }) => {
    homePageInstance = new homePage(page);
    await homePageInstance.goto();
  });

  test("should load the main page", async ({ page }) => {
    await expect(homePageInstance.productCards.first()).toBeVisible();
  });

  test("should display the correct number of products", async ({ page }) => {
    expect(await homePageInstance.getProductCount()).toBe(3);
  });

  test("should display correct product name", async ({ page }) => {
    expect(await homePageInstance.getProductName("product-1")).toBe(
      "Grey jacket",
    );
  });

  test("should display correct price", async ({ page }) => {
    expect(await homePageInstance.getProductPrice("product-1")).toMatch(
      /£55\.00/,
    );
  });

  test("should open product page", async ({ page }) => {
    await homePageInstance.clickProduct("Grey jacket");
    await expect(page).toHaveTitle("Grey jacket – Sauce Demo");
  });
});
