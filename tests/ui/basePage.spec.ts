import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";
import { ProductPage } from "../../pages/productPage";

test.describe("Product Listing", () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.goto();
  });

  test("should load the main page", async () => {
    await expect(basePage.productCards.first()).toBeVisible();
  });

  test("should display products", async () => {
    expect(await basePage.getProductCount()).toBeGreaterThan(0);
  });

  test("should display product name", async () => {
    await expect(basePage.productCards.first().locator("h3")).toBeVisible();
  });

  test("should display product price", async () => {
    await expect(basePage.productCards.first().locator("h4")).toBeVisible();
  });

  test("should open correct product page with matching name", async () => {
    const productPage = new ProductPage(basePage.page);

    const productNameFromHomepage = await basePage.getFirstProductName();
    await basePage.clickProduct(productNameFromHomepage);
    const productNameFromProductPage = await productPage.getProductName();
    expect(productNameFromHomepage).toBe(productNameFromProductPage);

    await expect(productPage.addToCartButton).toBeVisible();
  });

  test("should not let add sold out product to cart", async ({ page }) => {
    const productPage = new ProductPage(page);

    await basePage.goToCatalog();
    await basePage.clickSoldOutProduct();

    await expect(productPage.addToCartButton).not.toBeVisible();
    await expect(productPage.soldOutButton).toBeVisible();
  });
});
