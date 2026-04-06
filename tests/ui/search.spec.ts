import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";
import { SearchPage } from "../../pages/searchPage";
import { ProductPage } from "../../pages/productPage";

test.describe("Product search", () => {
  let homePage: HomePage;
  let searchPage: SearchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.goto();
  });
  test("should display results for valid search", async ({ page }) => {
    await homePage.searchForProduct("Jacket");
    expect(await searchPage.getProductCount()).toBeGreaterThan(0);

    const productName = await searchPage.getFirstProductName();
    await searchPage.clickProduct(productName);
    const productPage = new ProductPage(page);
    await expect(productPage.addToCartButton).toBeVisible();
  });

  test("should show no results message for nonexistent product", async ({
    page,
  }) => {
    const searchInput = Date.now().toString();
    await homePage.searchForProduct(searchInput);
    expect(await searchPage.getProductCount()).toBe(0);
    await expect(
      page.getByText(`No results found for ${searchInput}`),
    ).toBeVisible();
  });

  test("should show empty search when no input is provided", async ({
    page,
  }) => {
    await homePage.searchForProduct("");
    expect(await searchPage.getProductCount()).toBe(0);
    await expect(page.getByText("No search performed.")).toBeVisible();
  });
});
