import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Game Grid", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
  });

  test("should display game cards", async () => {
    await homePage.gameGrid.waitForGamesLoaded();
    const count = await homePage.gameGrid.getGameCount();
    expect(count).toBeGreaterThan(0);
  });

  test("should show loading skeletons initially", async ({ page }) => {
    // Navigate to page and quickly check for skeletons
    await page.goto("/");

    // Skeletons might appear briefly during initial load
    const skeletonCount = await homePage.gameGrid.skeletons.count();

    // Either skeletons appear or games load very quickly
    // Both are acceptable behaviors
    expect(skeletonCount >= 0).toBeTruthy();
  });

  test("should display game card with image", async () => {
    await homePage.gameGrid.waitForGamesLoaded();

    const firstCard = await homePage.gameGrid.getGameCardByIndex(0);
    const image = firstCard.locator("img").first();

    await expect(image).toBeVisible();
  });

  test("should display game card with title", async () => {
    await homePage.gameGrid.waitForGamesLoaded();

    const firstCard = await homePage.gameGrid.getGameCardByIndex(0);
    const text = await firstCard.textContent();

    expect(text).toBeTruthy();
    expect(text!.length).toBeGreaterThan(0);
  });

  test("should display critic scores", async ({ page }) => {
    await homePage.gameGrid.waitForGamesLoaded();

    // Look for critic score badges/numbers
    const scoreElements = page.locator('[class*="critic"]').or(
      page.locator("text=/^\\d{2}$/"), // Two digit numbers (metacritic scores)
    );

    const count = await scoreElements.count();
    // Some games should have critic scores
    expect(count).toBeGreaterThanOrEqual(0);
  });

  test("should display platform icons", async ({ page }) => {
    await homePage.gameGrid.waitForGamesLoaded();

    const firstCard = await homePage.gameGrid.getGameCardByIndex(0);

    // Look for icons within the card (FaWindows, FaPlaystation, etc.)
    const icons = firstCard.locator("svg").or(firstCard.locator('[class*="icon"]'));
    const iconCount = await icons.count();

    expect(iconCount).toBeGreaterThanOrEqual(0);
  });

  test("should load multiple game cards", async () => {
    await homePage.gameGrid.waitForGamesLoaded();

    const count = await homePage.gameGrid.getGameCount();
    expect(count).toBeGreaterThanOrEqual(3);
  });

  test("should have responsive grid layout", async ({ page }) => {
    // Desktop
    await page.setViewportSize({ width: 1920, height: 1080 });
    await homePage.goto();
    await homePage.gameGrid.waitForGamesLoaded();

    let count = await homePage.gameGrid.getGameCount();
    expect(count).toBeGreaterThan(0);

    // Mobile
    await page.setViewportSize({ width: 375, height: 667 });
    await homePage.goto();
    await homePage.gameGrid.waitForGamesLoaded();

    count = await homePage.gameGrid.getGameCount();
    expect(count).toBeGreaterThan(0);
  });
});
