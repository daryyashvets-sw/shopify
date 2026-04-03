import { test, expect } from "@playwright/test";
import { homePage } from "../../pages/homePage";
import { productPage } from "../../pages/productPage";

test.describe("buying a product", () => {
  test("User should be able to buy a product", async ({ page }) => {
    // Setup homepage
    const homePageInstance = new homePage(page);
    await homePageInstance.goto();

    // Verify cart starts empty
    await expect(homePageInstance.cartCount).toHaveText("(0)");

    // Add first product
    await homePageInstance.clickProduct("Grey jacket");
    const productPageInstance = new productPage(page);
    await productPageInstance.addToCart();

    // Verify cart count updates (added timeout because there is a delay bacause of animation)
    await expect(productPageInstance.cartCount).toHaveText("(1)", {
      timeout: 10000,
    });

    // open checkout page"
    await productPageInstance.gotoCheckout();
  });
});

// Next: fill out details and pay
