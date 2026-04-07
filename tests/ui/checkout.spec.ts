import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";
import { ProductPage } from "../../pages/productPage";
import { CartPage } from "../../pages/cartPage";
import { userData } from "../../fixtures/userData";
import { CheckoutPage } from "../../pages/checkoutPage";

test.describe("Cart and checkout", () => {
  let basePage: BasePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
  });

  test("should complete checkout flow up to payment", async ({ page }) => {
    const checkoutPage = new CheckoutPage(page);

    await basePage.goto();

    await expect(basePage.cartCount).toHaveText("(0)");

    const firstProductName = await basePage.getFirstProductName();
    await basePage.clickProduct(firstProductName);

    await productPage.addToCart();
    await expect(productPage.cartCount).toHaveText("(1)");
    await productPage.goToCart();

    await cartPage.goToCheckout();
    await checkoutPage.fillCheckoutForm(userData);
    await checkoutPage.pay();
    // stopped the test here because the entire purchase flow cannot be tested without a mock card
  });

  test("should update total after changing quantity of products", async ({
    page,
  }) => {
    await basePage.goto();

    const productNameFromHomepage = await basePage.getFirstProductName();
    await basePage.clickProduct(productNameFromHomepage);

    await expect(productPage.addToCartButton).toBeVisible();
    await productPage.addToCart();
    await expect(productPage.cartCount).toHaveText("(1)");

    await productPage.goToCart();

    expect(await cartPage.getProductQuantity()).toBe("1");

    const initialTotal = await cartPage.getTotal();
    const initialPrice = initialTotal.match(/£(\d+\.\d{2})/)?.[1];

    if (!initialPrice) {
      expect(initialPrice).toBeTruthy();
      return; // this is for TS to understand that initialPrice is defined
    }

    const expectedNewPrice = (parseFloat(initialPrice) * 2).toFixed(2);

    await cartPage.changeProductQuantity("2");

    await cartPage.updateCart();

    const newTotal = await cartPage.getTotal();
    expect(newTotal).toContain(`£${expectedNewPrice}`);
  });

  test("should display empty cart message after removing product", async ({
    page,
  }) => {
    await basePage.goto();

    const productNameFromHomepage = await basePage.getFirstProductName();
    await basePage.clickProduct(productNameFromHomepage);

    await expect(productPage.addToCartButton).toBeVisible();
    await productPage.addToCart();
    await expect(productPage.cartCount).toHaveText("(1)");

    await productPage.goToCart();
    await cartPage.removeFromCart();
    await expect(
      page.getByText("It appears that your cart is currently empty!"),
    ).toBeVisible();
  });
});
