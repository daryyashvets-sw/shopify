import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";
import { ProductPage } from "../../pages/productPage";
import { CartPage } from "../../pages/cartPage";
import { checkoutData } from "../../fixtures/checkoutData";
import { CheckoutPage } from "../../pages/checkoutPage";

const SHOPIFY_ANIMATION_DURATION = 4000;

test.describe("cart and checkout", () => {
  test("should complete checkout flow up to payment", async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await homePage.goto();

    await expect(homePage.cartCount).toHaveText("(0)");

    const firstProductName = await homePage.getFirstProductName();
    const firstProductPrice = await homePage.getFirstProductPrice();
    await homePage.clickProduct(firstProductName);

    await productPage.addToCart();
    await expect(productPage.cartCount).toHaveText("(1)", {
      timeout: SHOPIFY_ANIMATION_DURATION,
    });
    await productPage.goToCart();

    await cartPage.goToCheckout();
    //  await expect(page.getByText(firstProductPrice).first()).toBeVisible();
    await checkoutPage.fillCheckoutForm(checkoutData);
    await checkoutPage.pay();
    // stopped the test here because the entire purchase flow cannot be tested without a mock card
  });

  test("should update total after changing quantity of products", async ({
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

  test("should display empty cart message after removing product", async ({
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
    await cartPageInstance.removeFromCart();
    await expect(page.getByText("It appears that your cart is")).toBeVisible();
  });
});
