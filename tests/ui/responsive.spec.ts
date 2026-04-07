import { test, expect, devices } from "@playwright/test";
import { BasePage } from "../../pages/basePage";

test.describe("Responsive Design", () => {
  test("should load mobile version on small screen", async ({ browser }) => {
    // Create mobile context
    const mobileContext = await browser.newContext({
      ...devices["iPhone 13"],
    });
    const mobilePage = await mobileContext.newPage();
    const basePage = new BasePage(mobilePage);

    await basePage.goto();

    await expect(basePage.mobileMenuToggle).toBeVisible();
    await expect(basePage.homeNavigationItem).not.toBeVisible();

    await mobileContext.close();
  });

  test("should load desktop version on large screen", async ({ page }) => {
    const basePage = new BasePage(page);

    await basePage.goto();

    await expect(basePage.homeNavigationItem).toBeVisible();

    await expect(basePage.mobileMenuToggle).not.toBeVisible();
  });

  test("should switch from desktop to mobile on viewport resize", async ({
    page,
  }) => {
    const basePage = new BasePage(page);

    await basePage.goto();

    // Start with desktop
    await expect(basePage.homeNavigationItem).toBeVisible();

    await page.setViewportSize({ width: 375, height: 667 });

    await expect(basePage.mobileMenuToggle).toBeVisible();
    await expect(basePage.homeNavigationItem).not.toBeVisible();
  });
});
