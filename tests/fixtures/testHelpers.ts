import { Page } from "@playwright/test";
import { mockGames, mockGenres, mockPlatforms } from "./mockData";

/**
 * Mock API responses for testing
 */
export async function mockAPIResponses(page: Page) {
  // Mock games endpoint
  await page.route("**/api/games*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        count: mockGames.length,
        results: mockGames,
      }),
    });
  });

  // Mock genres endpoint
  await page.route("**/api/genres*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        count: mockGenres.length,
        results: mockGenres,
      }),
    });
  });

  // Mock platforms endpoint
  await page.route("**/api/platforms/lists/parents*", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        count: mockPlatforms.length,
        results: mockPlatforms,
      }),
    });
  });
}

/**
 * Wait for page to be fully loaded
 */
export async function waitForPageLoad(page: Page) {
  await page.waitForLoadState("networkidle");
}

/**
 * Get the current theme (light/dark)
 */
export async function getTheme(page: Page): Promise<string> {
  const html = page.locator("html");
  const dataTheme = await html.getAttribute("data-theme");
  const colorScheme = await html.evaluate((el) => getComputedStyle(el).colorScheme);
  return dataTheme || colorScheme || "unknown";
}
