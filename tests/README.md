# Game Hub - Playwright Tests

This directory contains end-to-end tests for the Game Hub application using Playwright.

## Test Structure

```
tests/
├── e2e/                      # End-to-end test files
│   ├── app.spec.ts          # Smoke tests
│   ├── navigation.spec.ts   # Layout & navigation
│   ├── theme.spec.ts        # Dark/light mode
│   ├── search.spec.ts       # Search functionality
│   ├── filters.spec.ts      # Genre, platform, sort filters
│   └── game-grid.spec.ts    # Game display & grid
├── pages/                    # Page Object Models
│   └── HomePage.ts          # Components & interactions
└── fixtures/                 # Test utilities & data
    ├── mockData.ts          # Mock API responses
    └── testHelpers.ts       # Helper functions
```

## Running Tests

```bash
# Run all tests
npm run test:e2e

# Run tests in UI mode (interactive)
npm run test:e2e:ui

# Run tests in headed mode (see browser)
npm run test:e2e:headed

# Run tests in debug mode
npm run test:e2e:debug

# Run specific test file
npx playwright test tests/e2e/search.spec.ts

# Run tests on specific browser
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Test Coverage

### Smoke Tests (app.spec.ts)

- App loads successfully
- Main components render
- No console errors

### Navigation & Layout (navigation.spec.ts)

- Responsive layout (desktop/mobile)
- Component visibility
- Navigation structure

### Theme Toggle (theme.spec.ts)

- Light/dark mode switching
- Theme persistence

### Search (search.spec.ts)

- Search input interaction
- Search results filtering
- Clear search functionality

### Filters (filters.spec.ts)

- Genre filtering
- Platform selection
- Sort order
- Combined filters
- Search + filters

### Game Grid (game-grid.spec.ts)

- Game cards rendering
- Loading states
- Card content (images, titles, scores)
- Platform icons
- Responsive grid

## Configuration

Tests are configured in `playwright.config.ts`:

- Base URL: `http://localhost:5173`
- Browsers: Chromium, Firefox, WebKit
- Mobile viewports: Pixel 5, iPhone 12
- Auto-starts dev server before tests

## Page Object Model

The `HomePage` class provides a structured way to interact with the application:

```typescript
const homePage = new HomePage(page);
await homePage.goto();
await homePage.navbar.search("Witcher");
await homePage.genreList.selectGenre("Action");
await homePage.gameGrid.waitForGamesLoaded();
```

## Best Practices

1. **Wait for elements**: Use `waitFor()` and `waitForGamesLoaded()`
2. **Flexible selectors**: Tests use multiple selector strategies
3. **Viewport testing**: Tests cover desktop and mobile views
4. **Isolation**: Each test is independent
5. **Page Objects**: Reusable component abstractions

## Debugging

```bash
# Open Playwright Inspector
npm run test:e2e:debug

# View test report
npx playwright show-report

# Generate trace
npx playwright test --trace on
```

## CI/CD Integration

Tests automatically:

- Start the dev server
- Run in parallel (locally)
- Run sequentially (CI)
- Capture screenshots on failure
- Generate HTML reports

## Adding New Tests

1. Create test file in `tests/e2e/`
2. Import `HomePage` or create new Page Object
3. Use descriptive test names
4. Follow existing patterns
5. Test both desktop and mobile when relevant

## Common Issues

**Tests timeout**: Increase `timeout` in test or use `test.slow()`
**Flaky tests**: Add proper waits, avoid `waitForTimeout` when possible
**Element not found**: Update selectors in Page Object Models
**API issues**: Consider adding API mocks in `testHelpers.ts`
