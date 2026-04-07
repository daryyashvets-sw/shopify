import { Page, Locator } from "@playwright/test";

export class BasePage {
  readonly page: Page;
  readonly homeNavigationItem: Locator;
  readonly catalogNavigationItem: Locator;
  readonly blogNavigationItem: Locator;
  readonly aboutUsNavigationItem: Locator;
  readonly signupLink: Locator;
  readonly myAccountLink: Locator;
  readonly logoutLink: Locator;
  readonly loginLink: Locator;
  readonly searchInput: Locator;
  readonly productCards: Locator;
  readonly cartCount: Locator;
  readonly mobileMenuToggle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homeNavigationItem = page.getByRole("link", { name: "Home" });
    this.catalogNavigationItem = page.getByRole("link", { name: "Catalog" });
    this.blogNavigationItem = page.getByRole("link", { name: "Blog" });
    this.aboutUsNavigationItem = page
      .locator("#main-menu")
      .getByRole("link", { name: "About us" });
    this.signupLink = page.getByRole("link", { name: "Sign up" });
    this.myAccountLink = page.getByRole("link", { name: "My Account" });
    this.logoutLink = page.getByRole("link", { name: "Log out" });
    this.loginLink = page.getByRole("link", { name: "Log in" });
    this.searchInput = page.getByRole("textbox", { name: "Search" });
    this.productCards = page.locator('a[id^="product-"]');
    this.cartCount = page.locator("#cart-target-desktop");
    this.mobileMenuToggle = page.locator("#toggle-menu");
  }
  async goto() {
    await this.page.goto("/");
  }

  async goToHome() {
    await this.homeNavigationItem.click();
  }

  async goToCatalog() {
    await this.catalogNavigationItem.click();
  }

  async goToBlog() {
    await this.blogNavigationItem.click();
  }

  async goToAboutUs() {
    await this.aboutUsNavigationItem.click();
  }

  async clickSignupLink() {
    await this.signupLink.click();
  }

  async clickMyAccountLink() {
    await this.myAccountLink.click();
  }

  async clickLogoutLink() {
    await this.logoutLink.click();
  }

  async clickLoginLink() {
    await this.loginLink.click();
  }

  async getProductCount() {
    return await this.productCards.count();
  }

  async searchForProduct(productName: string) {
    await this.searchInput.fill(productName);
    await this.searchInput.press("Enter");
  }

  async getFirstProductName() {
    const name = await this.productCards.first().locator("h3").textContent();
    return name?.trim() || "";
  }

  async getFirstProductPrice() {
    const name = await this.productCards.first().locator("h4").textContent();
    return name?.trim() || "";
  }

  async clickProduct(name: string) {
    await this.productCards.filter({ hasText: name }).click();
  }

  async clickSoldOutProduct() {
    await this.productCards.filter({ hasText: "Sold Out" }).first().click();
  }
}
