import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("App Smoke Tests", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should load the app successfully", async ({ page }) => {
    await expect(page).toHaveTitle(/gamehub/i);
    await homePage.isLoaded();
  });

  test("should display logo", async () => {
    await expect(homePage.navbar.logo).toBeVisible();
  });

  test("should display search input", async () => {
    await expect(homePage.navbar.searchInput).toBeVisible();
  });

  test("should display color mode switch", async () => {
    await expect(homePage.navbar.colorModeSwitch).toBeVisible();
  });

  test("should load game cards", async () => {
    await homePage.gameGrid.waitForGamesLoaded();
    const hasCards = await homePage.gameGrid.hasGameCards();
    expect(hasCards).toBeTruthy();
  });

  test("should have no console errors", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") {
        errors.push(msg.text());
      }
    });

    await homePage.goto();
    await page.waitForTimeout(2000);

    expect(errors).toHaveLength(0);
  });
});
