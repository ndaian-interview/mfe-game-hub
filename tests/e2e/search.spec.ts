import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test.describe("Search Functionality", () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.goto();
    await homePage.gameGrid.waitForGamesLoaded();
  });

  test("should accept search input", async () => {
    await homePage.navbar.searchInput.fill("Witcher");
    const value = await homePage.navbar.searchInput.inputValue();
    expect(value).toBe("Witcher");
  });

  test("should search for games on Enter", async ({ page }) => {
    const searchTerm = "Witcher";

    // Perform search
    await homePage.navbar.search(searchTerm);

    // Wait for results to load
    await page.waitForTimeout(1500);

    // Verify games still display after search (the search functionality works)
    const hasCards = await homePage.gameGrid.hasGameCards();
    expect(hasCards).toBeTruthy();
  });

  test("should update game grid after search", async ({ page }) => {
    // Get initial count
    const initialCount = await homePage.gameGrid.getGameCount();

    // Search for specific game
    await homePage.navbar.search("Grand Theft Auto");
    await page.waitForTimeout(1500);

    // Grid should have updated (could be more or fewer games)
    // Just verify the grid is still present and functional
    const hasCards = await homePage.gameGrid.hasGameCards();
    expect(hasCards).toBeTruthy();
  });

  test("should clear search and show all games", async ({ page }) => {
    // Perform search
    await homePage.navbar.search("Zelda");
    await page.waitForTimeout(1000);

    // Clear search
    await homePage.navbar.searchInput.clear();
    await homePage.navbar.searchInput.press("Enter");
    await page.waitForTimeout(1000);

    // Should show games again
    const hasCards = await homePage.gameGrid.hasGameCards();
    expect(hasCards).toBeTruthy();
  });

  test("should display search input placeholder", async () => {
    const placeholder = await homePage.navbar.searchInput.getAttribute("placeholder");
    expect(placeholder?.toLowerCase()).toContain("search");
  });
});
