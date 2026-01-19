import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Theme Toggle", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should toggle between light and dark mode", async ({ page }) => {
    // Get initial theme
    const initialBg = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);

    // Toggle theme
    await homePage.navbar.toggleColorMode();
    await page.waitForTimeout(500); // Wait for theme transition

    // Get new theme
    const newBg = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);

    // Background should have changed
    expect(initialBg).not.toBe(newBg);
  });

  test("should persist theme after page reload", async ({ page }) => {
    // Toggle to a specific mode
    await homePage.navbar.toggleColorMode();
    await page.waitForTimeout(500);

    const themeAfterToggle = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);

    // Reload page
    await page.reload();
    await page.waitForTimeout(500);

    const themeAfterReload = await page.locator("body").evaluate((el) => getComputedStyle(el).backgroundColor);

    // Theme should be the same
    expect(themeAfterToggle).toBe(themeAfterReload);
  });

  test("should display color mode switch button", async () => {
    await expect(homePage.navbar.colorModeSwitch).toBeVisible();
    await expect(homePage.navbar.colorModeSwitch).toBeEnabled();
  });
});
