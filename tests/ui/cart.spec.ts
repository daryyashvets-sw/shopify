import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";
import { ProductPage } from "../../pages/productPage";
import { CartPage } from "../../pages/cartPage";

test.describe("Cart operations", () => {
  let basePage: BasePage;
  let productPage: ProductPage;
  let cartPage: CartPage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
  });

  test("should update total after changing quantity of products", async () => {
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
    expect(await cartPage.getProductQuantity()).toBe("2");
  });

  test("should display empty cart message after removing product", async () => {
    await basePage.goto();

    const productNameFromHomepage = await basePage.getFirstProductName();
    await basePage.clickProduct(productNameFromHomepage);

    await expect(productPage.addToCartButton).toBeVisible();
    await productPage.addToCart();
    await expect(productPage.cartCount).toHaveText("(1)");

    await productPage.goToCart();
    await cartPage.removeFromCart();

    await expect(
      cartPage.page.getByText("It appears that your cart is currently empty!"),
    ).toBeVisible();
    await expect(productPage.cartCount).toHaveText("(0)");
  });
});
