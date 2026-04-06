import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";
import { ProductPage } from "../../pages/productPage";

test.describe("Home page", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should load the main page", async () => {
    await expect(homePage.productCards.first()).toBeVisible();
  });

  test("should display products", async () => {
    expect(await homePage.getProductCount()).toBeGreaterThan(0);
  });

  test("should display product name", async () => {
    await expect(homePage.productCards.first().locator("h3")).toBeVisible();
  });

  test("should display product price", async () => {
    await expect(homePage.productCards.first().locator("h4")).toBeVisible();
  });

  test("should open correct product page with matching name", async ({
    page,
  }) => {
    const productPage = new ProductPage(page);

    const productNameFromHomepage = await homePage.getFirstProductName();
    await homePage.clickProduct(productNameFromHomepage);
    const productNameFromProductPage = await productPage.getProductName();
    expect(productNameFromHomepage).toBe(productNameFromProductPage);

    await expect(productPage.addToCartButton).toBeVisible();
  });
});
