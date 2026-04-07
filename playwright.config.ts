import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  timeout: 60000,
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["html"], // Keep default HTML reporter
    [
      "allure-playwright",
      {
        outputFolder: "allure-results",
        detail: true,
        suiteTitle: false,
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // baseURL: "https://sauce-demo.myshopify.com/",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
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
      name: "ui-firefox",
      testDir: "./tests/ui",
      use: {
        baseURL: "https://sauce-demo.myshopify.com",
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "ui-safari",
      testDir: "./tests/ui",
      use: {
        baseURL: "https://sauce-demo.myshopify.com",
        ...devices["Desktop Safari"],
      },
    },

    {
      name: "api-tests",
      testDir: "./tests/api",
      use: {
        baseURL: "https://restful-booker.herokuapp.com",
      },
    },
    // {
    //   name: "chromium",
    //   use: { ...devices["Desktop Chrome"] },
    // },

    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
