# Tasks: Article Listing Search

**Feature Branch**: `002-article-search`
**Status**: Completed

## Phase 1: Setup
>
> **Goal**: Prepare the environment and test infrastructure.

- [x] T001 Create test file `src/routes/articles/search.test.ts`

## Phase 2: Foundational
>
> **Goal**: Implement core search logic and state management.

- [x] T002 [P] [US1] Implement `filterArticles` function in `src/lib/utils/search.ts`
- [x] T003 [US1] Add `searchQuery` state and reactive filtered list in `src/routes/articles/+page.svelte`

## Phase 3: User Story 1 - Desktop Search
>
> **Goal**: Enable users to search articles on desktop with URL sync.
> **Independent Test**: Type "test" in search bar -> URL updates to `?q=test` -> List filters.

- [x] T004 [US1] Add search input field (desktop view) in `src/routes/articles/+page.svelte`
- [x] T005 [US1] Bind input to `searchQuery` state in `src/routes/articles/+page.svelte`
- [x] T006 [US1] Implement URL synchronization with `goto` in `src/routes/articles/+page.svelte`

## Phase 4: User Story 2 - Keyboard Accessibility
>
> **Goal**: Allow power users to focus search with keyboard shortcuts.
> **Independent Test**: Press Cmd+K -> Search input focused.

- [x] T007 [US2] Add global window keydown listener in `src/routes/articles/+page.svelte`
- [x] T008 [US2] Implement `Cmd+K` / `Ctrl+K` handler to focus input in `src/routes/articles/+page.svelte`

## Phase 5: User Story 3 - Mobile Search Toggle
>
> **Goal**: Provide a compact search experience for mobile users.
> **Independent Test**: Click search icon -> Overlay opens. Press Escape -> Overlay closes.

- [x] T009 [US3] Add `isSearchActive` state for mobile overlay in `src/routes/articles/+page.svelte`
- [x] T010 [US3] Add search icon button (mobile only) in `src/routes/articles/+page.svelte`
- [x] T011 [US3] Implement mobile overlay UI with input in `src/routes/articles/+page.svelte`
- [x] T012 [US3] Handle `Escape` key to close overlay and clear search in `src/routes/articles/+page.svelte`

## Phase 6: Polish & Cross-Cutting Concerns
>
> **Goal**: Handle edge cases and ensure accessibility.

- [x] T013 Add "No articles found" message in `src/routes/articles/+page.svelte`
- [x] T014 Ensure accessibility attributes (aria-label, focus trap) in `src/routes/articles/+page.svelte`

## Dependencies

- US1 (Desktop Search) is the foundation.
- US2 (Keyboard) depends on the input existing (US1).
- US3 (Mobile) depends on the state logic (US1) but has independent UI.

## Parallel Execution Examples

- T002 (Logic) and T004 (UI) can be started in parallel.
- T007 (Keyboard) can be implemented once T004 is done.
- T010 (Mobile Icon) can be implemented in parallel with Desktop UI.

## Implementation Strategy

1. **MVP**: Desktop search with URL sync (US1).
2. **Enhancement**: Keyboard shortcuts (US2).
3. **Mobile**: Responsive overlay (US3).
