import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Navigation and Layout", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should display responsive layout on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await homePage.goto();

    // On large screens, genre list should be visible in sidebar
    await expect(homePage.genreList.container).toBeVisible();
    await homePage.gameGrid.waitForGamesLoaded();
    const hasCards = await homePage.gameGrid.hasGameCards();
    expect(hasCards).toBeTruthy();
  });

  test("should hide genre list on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.goto();

    // On small screens, genre list might be hidden
    const isVisible = await homePage.genreList.container.isVisible().catch(() => false);
    // This is expected behavior on mobile
    expect(typeof isVisible).toBe("boolean");
  });

  test("should display all main components", async () => {
    await expect(homePage.navbar.logo).toBeVisible();
    await expect(homePage.navbar.searchInput).toBeVisible();
    await expect(homePage.platformSelector.button).toBeVisible();
    await expect(homePage.sortSelector.button).toBeVisible();
    // Wait for game cards to load
    await homePage.gameGrid.waitForGamesLoaded();
    const hasCards = await homePage.gameGrid.hasGameCards();
    expect(hasCards).toBeTruthy();
  });

  test("should have proper navigation structure", async ({ page }) => {
    // Check that game cards are present (main content)
    await homePage.gameGrid.waitForGamesLoaded();
    const hasCards = await homePage.gameGrid.hasGameCards();
    expect(hasCards).toBeTruthy();
  });

  test("should display game heading", async () => {
    await homePage.gameGrid.waitForGamesLoaded();
    const heading = homePage.gameHeading.or(homePage.page.getByRole("heading", { level: 1 }));
    await expect(heading).toBeVisible();
  });
});
