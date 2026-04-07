import { test, expect } from "@playwright/test";
import { ProductPage } from "../../pages/productPage";
import { BasePage } from "../../pages/basePage";

test.describe("Product search", () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.goto();
  });

  test("should display results for valid search", async () => {
    await basePage.searchForProduct("Jacket");
    expect(await basePage.getProductCount()).toBeGreaterThan(0);

    const productName = await basePage.getFirstProductName();
    await basePage.clickProduct(productName);
    const productPage = new ProductPage(basePage.page);
    await expect(productPage.addToCartButton).toBeVisible();
  });

  test("should show no results message for nonexistent product", async () => {
    const searchInput = "productThatDoesntExist";
    await basePage.searchForProduct(searchInput);
    expect(await basePage.getProductCount()).toBe(0);
    await expect(
      basePage.page.getByText(`No results found for ${searchInput}`),
    ).toBeVisible();
  });

  test("should show empty search when no input is provided", async () => {
    await basePage.searchForProduct("");
    expect(await basePage.getProductCount()).toBe(0);
    await expect(basePage.page.getByText("No search performed.")).toBeVisible();
  });
});
