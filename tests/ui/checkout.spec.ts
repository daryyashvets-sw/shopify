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

    const firstProductName = await homePageInstance.getFirstProductName();
    const firstProductPrice = await homePageInstance.getFirstProductPrice();
    await homePageInstance.clickProduct(firstProductName);

    await productPageInstance.addToCart();
    await expect(productPageInstance.cartCount).toHaveText("(1)", {
      timeout: SHOPIFY_ANIMATION_DURATION,
    });
    await productPageInstance.goToCart();

    await cartPageInstance.goToCheckout();
    //  await expect(page.getByText(firstProductPrice).first()).toBeVisible();
    await checkoutPageInstance.fillCheckoutForm(checkoutData);
    await checkoutPageInstance.pay();
    // stopped the test here because the entire purchase flow cannot be tested without a mock card
  });

  test("User should be able to change quantity of products in cart", async ({
    page,
  }) => {
    const homePageInstance = new HomePage(page);
    const productPageInstance = new ProductPage(page);
    const cartPageInstance = new CartPage(page);

    await homePageInstance.goto();

    const productNameFromHomepage =
      await homePageInstance.getFirstProductName();
    await homePageInstance.clickProduct(productNameFromHomepage);

    await expect(productPageInstance.addToCartButton).toBeVisible();
    await productPageInstance.addToCart();
    await expect(productPageInstance.cartCount).toHaveText("(1)", {
      timeout: SHOPIFY_ANIMATION_DURATION,
    });

    await productPageInstance.goToCart();

    expect(await cartPageInstance.getProductQuantity()).toBe("1");

    const initialTotal = await cartPageInstance.getTotal();
    const initialPrice = initialTotal.match(/£(\d+\.\d{2})/)?.[1];
    const expectedNewPrice = (parseFloat(initialPrice!) * 2).toFixed(2);

    await cartPageInstance.changeProductQuantity("2");

    await cartPageInstance.updateCart();

    const newTotal = await cartPageInstance.getTotal();
    expect(newTotal).toContain(`£${expectedNewPrice}`);
  });
});
