import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  timeout: 60000,
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html"],
    [
      "allure-playwright",
      {
        outputFolder: "allure-results",
        detail: true,
        suiteTitle: false,
      },
    ],
  ],

  use: {
    trace: "on-first-retry",
    launchOptions: {
      slowMo: 500, // 500ms between each action
    },
  },

  projects: [
    {
      name: "ui-chrome",
      testDir: "./tests/ui",
      use: {
        baseURL: "https://sauce-demo.myshopify.com",
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "api-tests",
      testDir: "./tests/api",
      use: {
        baseURL: "https://restful-booker.herokuapp.com",
      },
    },
  ],
});
