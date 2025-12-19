# Quickstart: Article Listing Search

## Development Setup
1. Switch to the feature branch: `git checkout 002-article-search`.
2. Ensure dependencies are installed: `pnpm install`.
3. Start the dev server: `pnpm run dev`.

## Key Files
- `src/lib/components/pages/ArticleListing.svelte`: The main component to modify.
- `src/lib/utils/blogPosts.ts`: Contains the logic for fetching articles (if filtering logic is moved to a utility).

## Running Tests
- Unit tests: `pnpm run test` (Add tests in `src/lib/components/pages/ArticleListing.test.ts`).
- E2E tests: `pnpm run test:e2e` (Add a new test case in `playwright/search.spec.ts`).

## Verification Steps
1. Navigate to `/articles`.
2. Type a known word from an article title into the search bar.
3. Verify the list filters immediately.
4. Press `Cmd+K` and verify focus.
5. Resize to mobile width, click the search icon, and verify the overlay.
6. Verify the URL updates to include `?q=...`.
