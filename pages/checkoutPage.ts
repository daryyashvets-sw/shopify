import { Page, Locator } from "@playwright/test";
import { UserData } from "../fixtures/userData";
import { BasePage } from "./basePage";

export class CheckoutPage extends BasePage {
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
    super(page);
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

  async getPaymentFrame() {
    return this.page.locator("iframe").first().contentFrame();
  }

  async fillInPaymentFrame(selector: string, value: string) {
    const frame = await this.getPaymentFrame();
    await frame.locator(selector).fill(value);
  }

  async fillCardNumber(cardNumber: string) {
    await this.fillInPaymentFrame("#number", cardNumber);
  }

  async fillExpirationDate(expirationDate: string) {
    await this.fillInPaymentFrame("#expiry", expirationDate);
  }

  async fillSecurityCode(securityCode: string) {
    await this.fillInPaymentFrame("#verification_value", securityCode);
  }

  async fillNameOnCard(nameOnCard: string) {
    await this.fillInPaymentFrame("#name", nameOnCard);
  }

  async fillCheckoutForm(data: UserData) {
    await this.email.fill(data.email);
    await this.country.selectOption(data.country);
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
    const totalSum = totalText?.trim().substring(1) || "0";
    const parsed = parseFloat(totalSum);
    return isNaN(parsed) ? 0 : parsed;
  }

  async pay() {
    await this.payButton.click();
  }
}
