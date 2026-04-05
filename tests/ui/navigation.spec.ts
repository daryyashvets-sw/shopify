import { test, expect } from "@playwright/test";
import { HomePage } from "../../pages/homePage";

test.describe("navigating on the app", () => {
  test("User should be able to navigate throughout the app", async ({
    page,
  }) => {
    const homePageInstance = new HomePage(page);
    await homePageInstance.goto();

    await homePageInstance.goToCatalog();
    await expect(page).toHaveURL("/collections/all");
    await expect(page).toHaveTitle("Products – Sauce Demo");

    await homePageInstance.goToBlog();
    await expect(page).toHaveURL("blogs/news");
    await expect(page).toHaveTitle("News – Sauce Demo");

    await homePageInstance.goToAboutUs();
    await expect(page).toHaveURL("pages/about-us");
    await expect(page).toHaveTitle("About Us – Sauce Demo");
  });
});
