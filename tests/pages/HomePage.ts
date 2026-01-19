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
    this.colorModeSwitch = page
      .locator("button")
      .filter({ hasText: /dark|light/i })
      .or(page.locator("label").filter({ has: page.locator('input[type="checkbox"]') }));
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
    this.container = page
      .locator("aside")
      .or(page.getByRole("list").filter({ has: page.getByText(/action|adventure|rpg/i) }));
  }

  async selectGenre(genreName: string) {
    await this.container.getByRole("button", { name: new RegExp(genreName, "i") }).click();
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
    this.button = page
      .getByRole("button", { name: "Platforms" })
      .or(page.getByRole("button").filter({ hasText: /^(PC|PlayStation|Xbox|Nintendo)/ }));
    this.menu = page.getByRole("menu").or(page.locator('[role="listbox"]'));
  }

  async selectPlatform(platformName: string) {
    await this.button.click();
    await this.menu
      .getByRole("menuitem", { name: new RegExp(platformName, "i") })
      .or(this.page.getByText(new RegExp(platformName, "i")))
      .click();
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
    this.button = page.getByRole("button", { name: /sort|order|relevance/i });
    this.menu = page.getByRole("menu").or(page.locator('[role="listbox"]'));
  }

  async selectSortOrder(sortOption: string) {
    await this.button.click();
    await this.menu
      .getByRole("menuitem", { name: new RegExp(sortOption, "i") })
      .or(this.page.getByText(new RegExp(sortOption, "i")))
      .click();
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
    this.container = page
      .locator('[class*="css-"]')
      .filter({ has: page.locator('[class*="card"]') })
      .first();
    this.gameCards = page.locator('[class*="card"]').or(page.getByRole("article"));
    this.skeletons = page.locator('[class*="skeleton"]').or(page.locator('[data-loading="true"]'));
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
