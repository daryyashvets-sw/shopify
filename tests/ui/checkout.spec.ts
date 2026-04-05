import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";
import { ProductPage } from "../../pages/productPage";
import { CartPage } from "../../pages/cartPage";
import { checkoutData } from "../../fixtures/checkoutData";
import { CheckoutPage } from "../../pages/checkoutPage";

const SHOPIFY_ANIMATION_DURATION = 4000;

test.describe("buying a product", () => {
  test("User should be able to buy a product", async ({ page }) => {
    const homePageInstance = new HomePage(page);
    const productPageInstance = new ProductPage(page);
    const cartPageInstance = new CartPage(page);
    const checkoutPageInstance = new CheckoutPage(page);

    await homePageInstance.goto();

    await expect(homePageInstance.cartCount).toHaveText("(0)");

    await homePageInstance.clickProduct("Grey jacket");

    await productPageInstance.addToCart();

    await expect(productPageInstance.cartCount).toHaveText("(1)", {
      timeout: SHOPIFY_ANIMATION_DURATION,
    });

    await productPageInstance.goToCart();

    await cartPageInstance.goToCheckout();
    expect(await checkoutPageInstance.getTotalSum()).toMatch("£55.00");

    await checkoutPageInstance.fillCheckoutForm(checkoutData);

    await checkoutPageInstance.pay();
  });
});
