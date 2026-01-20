import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly navbar: NavBarComponent;
  readonly genreList: GenreListComponent;
  readonly platformSelector: PlatformSelectorComponent;
  readonly sortSelector: SortSelectorComponent;
  readonly gameGrid: GameGridComponent;
  readonly gameHeading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navbar = new NavBarComponent(page);
    this.genreList = new GenreListComponent(page);
    this.platformSelector = new PlatformSelectorComponent(page);
    this.sortSelector = new SortSelectorComponent(page);
    this.gameGrid = new GameGridComponent(page);
    this.gameHeading = page.locator("h1");
  }

  async goto() {
    await this.page.goto("/");
  }

  async isLoaded() {
    await this.navbar.isVisible();
    await this.gameGrid.isVisible();
  }
}

export class NavBarComponent {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly logo: Locator;
  readonly colorModeSwitch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder(/search/i);
    this.logo = page.locator('img[src*="logo"]');
    // Color mode switch is now a button with adjacent span text
    this.colorModeSwitch = page.locator("button").filter({
      has: page.locator("span.rounded-full.bg-white"),
    });
  }

  async isVisible() {
    await this.logo.waitFor({ state: "visible" });
  }

  async search(query: string) {
    await this.searchInput.fill(query);
    await this.searchInput.press("Enter");
  }

  async toggleColorMode() {
    await this.colorModeSwitch.click();
  }
}

export class GenreListComponent {
  readonly page: Page;
  readonly container: Locator;

  constructor(page: Page) {
    this.page = page;
    // Genre list is in the aside sidebar
    this.container = page.locator("aside").first();
  }

  async selectGenre(genreName: string) {
    await this.container.locator("button", { hasText: new RegExp(genreName, "i") }).click();
  }

  async getSelectedGenre() {
    const selected = this.container
      .locator('button[data-selected="true"]')
      .or(this.container.locator("button").filter({ has: this.page.locator('[class*="selected"]') }));
    return await selected.textContent();
  }

  async isVisible() {
    await this.container.waitFor({ state: "visible", timeout: 5000 }).catch(() => {
      // Genre list might not be visible on mobile
    });
  }
}

export class PlatformSelectorComponent {
  readonly page: Page;
  readonly button: Locator;
  readonly menu: Locator;

  constructor(page: Page) {
    this.page = page;
    // Platform selector is now a native select element
    this.button = page.locator("select").first();
    this.menu = page.locator("select").first();
  }

  async selectPlatform(platformName: string) {
    // Select dropdown by finding option that matches the platform name
    const options = await this.button.locator("option").all();
    for (const option of options) {
      const text = await option.textContent();
      if (text && new RegExp(platformName, "i").test(text)) {
        await this.button.selectOption({ label: text });
        return;
      }
    }
  }

  async isVisible() {
    await this.button.waitFor({ state: "visible" });
  }
}

export class SortSelectorComponent {
  readonly page: Page;
  readonly button: Locator;
  readonly menu: Locator;

  constructor(page: Page) {
    this.page = page;
    // Sort selector is now a native select element
    this.button = page.locator("select").nth(1);
    this.menu = page.locator("select").nth(1);
  }

  async selectSortOrder(sortOption: string) {
    // Select dropdown by finding option that matches the sort option
    const options = await this.button.locator("option").all();
    for (const option of options) {
      const text = await option.textContent();
      if (text && new RegExp(sortOption, "i").test(text)) {
        await this.button.selectOption({ label: text });
        return;
      }
    }
  }

  async isVisible() {
    await this.button.waitFor({ state: "visible" });
  }
}

export class GameGridComponent {
  readonly page: Page;
  readonly container: Locator;
  readonly gameCards: Locator;
  readonly skeletons: Locator;

  constructor(page: Page) {
    this.page = page;
    // Game grid is the main grid container with game cards
    this.container = page.locator("div.grid.gap-6");
    this.gameCards = page.getByRole("article");
    this.skeletons = page.locator("div.animate-pulse");
  }

  async isVisible() {
    await this.container.waitFor({ state: "visible" });
  }

  async getGameCount() {
    await this.page.waitForTimeout(500); // Wait for any loading to complete
    return await this.gameCards.count();
  }

  async getGameCardByIndex(index: number) {
    return this.gameCards.nth(index);
  }

  async waitForGamesLoaded() {
    // Wait for skeletons to disappear
    await this.skeletons
      .first()
      .waitFor({ state: "detached", timeout: 10000 })
      .catch(() => {
        // Skeletons might not exist or already gone
      });
    // Wait for at least one game card
    await this.gameCards.first().waitFor({ state: "visible", timeout: 10000 });
  }

  async hasGameCards() {
    return (await this.getGameCount()) > 0;
  }
}
