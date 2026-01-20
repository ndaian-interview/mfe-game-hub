import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Theme Toggle", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should toggle between light and dark mode", async ({ page }) => {
    // Check initial dark class on html
    const initialHasDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));

    // Toggle theme
    await homePage.navbar.toggleColorMode();
    await page.waitForTimeout(500); // Wait for theme transition

    // Check new dark class state
    const newHasDark = await page.locator("html").evaluate((el) => el.classList.contains("dark"));

    // Dark class should have toggled
    expect(initialHasDark).not.toBe(newHasDark);
  });

  test("should persist theme after page reload", async ({ page }) => {
    // Wait for initial load
    await homePage.navbar.logo.waitFor({ state: "visible" });
    await page.waitForTimeout(1000);

    // Toggle to a specific mode
    await homePage.navbar.toggleColorMode();
    await page.waitForTimeout(500);

    const darkClassAfterToggle = await page.locator("html").evaluate((el) => el.classList.contains("dark"));

    // Reload page
    await page.reload();
    // Wait for the React app to initialize
    await homePage.navbar.logo.waitFor({ state: "visible" });
    await page.waitForTimeout(1500);

    const darkClassAfterReload = await page.locator("html").evaluate((el) => el.classList.contains("dark"));

    // Theme should be the same
    expect(darkClassAfterToggle).toBe(darkClassAfterReload);
  });

  test("should display color mode switch button", async () => {
    await expect(homePage.navbar.colorModeSwitch).toBeVisible();
    await expect(homePage.navbar.colorModeSwitch).toBeEnabled();
  });
});
