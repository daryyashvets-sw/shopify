import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";
import { ProductPage } from "../../pages/productPage";

test.describe("home page", () => {
  let homePageInstance: HomePage;

  test.beforeEach(async ({ page }) => {
    homePageInstance = new HomePage(page);
    await homePageInstance.goto();
  });

  test("should load the main page", async () => {
    await expect(homePageInstance.productCards.first()).toBeVisible();
  });

  test("should display products", async () => {
    expect(await homePageInstance.getProductCount()).toBeGreaterThan(0);
  });

  test("should display product name", async () => {
    await expect(
      homePageInstance.productCards.first().locator("h3"),
    ).toBeVisible();
  });

  test("should display product price", async () => {
    await expect(
      homePageInstance.productCards.first().locator("h4"),
    ).toBeVisible();
  });

  test("should open correct product page with matching name", async ({
    page,
  }) => {
    const productNameFromHomepage = await homePageInstance.clickFirstProduct();
    const productPageInstance = new ProductPage(page);
    const productNameFromProductPage =
      await productPageInstance.getProductName();
    expect(productNameFromHomepage).toBe(productNameFromProductPage);

    await expect(productPageInstance.addToCartButton).toBeVisible();
  });
});
