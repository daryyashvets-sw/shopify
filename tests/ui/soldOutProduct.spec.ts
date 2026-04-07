import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";
import { ProductPage } from "../../pages/productPage";

test.describe("Purchase flow", () => {
  test("should not let add sold out product to cart", async ({ page }) => {
    const productPage = new ProductPage(page);
    const basePage = new BasePage(page);

    await basePage.goto();
    await basePage.goToCatalog();
    await basePage.clickSoldOutProduct();

    await expect(productPage.addToCartButton).not.toBeVisible();
    await expect(productPage.soldOutButton).toBeVisible();
  });
});
