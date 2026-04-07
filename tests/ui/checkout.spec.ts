import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";
import { ProductPage } from "../../pages/productPage";
import { CartPage } from "../../pages/cartPage";
import { userData } from "../../fixtures/userData";
import { CheckoutPage } from "../../pages/checkoutPage";

test.describe("Checkout operations", () => {
  let basePage: BasePage;
  let productPage: ProductPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
  });

  test("should complete checkout flow up to payment", async () => {
    await basePage.goto();

    await expect(basePage.cartCount).toHaveText("(0)");

    const firstProductName = await basePage.getFirstProductName();
    await basePage.clickProduct(firstProductName);

    await productPage.addToCart();
    await expect(productPage.cartCount).toHaveText("(1)");

    await productPage.goToCart();
    await cartPage.goToCheckout();

    await expect(checkoutPage.email).toBeVisible();

    await checkoutPage.fillCheckoutForm(userData);
    await checkoutPage.pay();
  });

  test("should validate empty checkout form", async () => {
    await basePage.goto();

    const firstProductName = await basePage.getFirstProductName();
    await basePage.clickProduct(firstProductName);

    await productPage.addToCart();

    await expect(productPage.cartCount).toHaveText("(1)");

    await productPage.goToCart();
    await cartPage.goToCheckout();

    await checkoutPage.pay();

    await expect(checkoutPage.page.getByText("Enter an email")).toBeVisible();
    await expect(checkoutPage.payButton).toBeVisible();
  });
});
