import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class SearchPage extends BasePage {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }
}
