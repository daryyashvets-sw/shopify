import { Page, Locator, expect } from "@playwright/test";
import { CheckoutData } from "../fixtures/checkoutData";

export class CheckoutPage {
  readonly page: Page;
  readonly email: Locator;
  readonly country: Locator;
  readonly lastName: Locator;
  readonly address: Locator;
  readonly apartment: Locator;
  readonly postalCode: Locator;
  readonly city: Locator;
  readonly totalSum: Locator;
  readonly payButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email = page.getByRole("textbox", { name: "Email" });
    this.country = page.locator('select[name="countryCode"]');
    this.lastName = page.getByRole("textbox", { name: "Last Name" });
    this.address = page.getByRole("combobox", { name: "Address" });
    this.apartment = page.getByRole("textbox", {
      name: "Apartment, suite, etc. (",
    });
    this.postalCode = page.getByRole("textbox", { name: "Postal code" });
    this.city = page.getByRole("textbox", { name: "City" });

    this.totalSum = page.getByLabel("Cost summary");
    this.payButton = page.getByRole("button", { name: "Pay now" });
  }

  // Constructor can't handle async iframe access, so I use methods instead
  async getPaymentFrame() {
    return this.page.locator("iframe").first().contentFrame();
  }

  async fillCardNumber(cardNumber: string) {
    const frame = await this.getPaymentFrame();
    await frame.locator("#number").fill(cardNumber);
  }

  async fillExpirationDate(expirationDate: string) {
    const frame = await this.getPaymentFrame();
    await frame.locator("#expiry").fill(expirationDate);
  }

  async fillSecurityCode(securityCode: string) {
    const frame = await this.getPaymentFrame();
    await frame.locator("#verification_value").fill(securityCode);
  }

  async fillNameOnCard(nameOnCard: string) {
    const frame = await this.getPaymentFrame();
    await frame.locator("#name").fill(nameOnCard);
  }

  async fillCheckoutForm(data: CheckoutData) {
    await this.email.fill(data.email);
    await this.country.selectOption("NL");
    await this.lastName.fill(data.lastName);
    await this.apartment.fill(data.apartment);
    await this.postalCode.fill(data.postalCode);
    await this.city.fill(data.city);

    await this.fillCardNumber(data.cardNumber);
    await this.fillExpirationDate(data.expirationDate);
    await this.fillSecurityCode(data.securityCode);
    await this.fillNameOnCard(data.nameOnCard);
  }

  async getTotalSum() {
    const totalText = await this.totalSum.textContent();
    return totalText?.trim() || "";
  }

  async pay() {
    await this.payButton.click();
  }
}
