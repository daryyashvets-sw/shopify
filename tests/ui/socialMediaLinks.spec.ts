import { test, expect } from "@playwright/test";
import { BasePage } from "../../pages/basePage";
import { socialMediaLinks } from "../../fixtures/userData";

test.describe("Social Media Links", () => {
  let basePage: BasePage;
  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.goto();
  });

  socialMediaLinks.forEach(({ name, urlPattern }) => {
    test(`${name} link should be valid and contain correct URL`, async ({
      page,
    }) => {
      const link = page.locator(`a[href*="${urlPattern}"]`);

      await expect(link).toBeVisible();

      const href = await link.getAttribute("href");
      expect(href).toContain(urlPattern);

      if (name !== "RSS") {
        expect(href).toMatch(/^https?:\/\//);
      }
    });
  });
});
