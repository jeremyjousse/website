# Feature Specification: Article Listing Search

**Feature Branch**: `002-article-search`  
**Created**: 2025-12-18  
**Status**: Draft  
**Input**: User description: "add a search form in ArticleListing.svelte . This form is responsive, in desktop is acks as a simple search field and there is a focus using command + K shortcut. in mobile the field is hidden and we see a search icon. by clicking on it the search field is displayed almost full page width hover the page. The search update the listing. Do not forget that is it a simgle page app and there is not backend ."

## Clarifications

### Session 2025-12-18

- Q: What type of matching logic should the search use? → A: Literal substring matching.
- Q: What content should be searchable? → A: Titles, Categories, and Excerpts/Descriptions.
- Q: What should happen when the "Escape" key is pressed? → A: Clear input and close overlay (mobile).
- Q: Should matching text be highlighted in the results? → A: No highlighting.
- Q: Should the search state be reflected in the URL? → A: Yes, update URL with `?q=` parameter.

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Desktop Search (Priority: P1)

As a reader on a desktop device, I want to quickly find specific articles by typing in a search field so that I can see relevant content without scrolling through the entire list.

**Why this priority**: Core functionality that enables users to navigate content efficiently on the primary platform.

**Independent Test**: Can be tested by typing "test" into the search field and verifying the article list updates to only show articles containing "test".

**Acceptance Scenarios**:

1. **Given** I am on the article listing page on desktop, **When** I type into the search field, **Then** the list of articles updates in real-time to match my query.
2. **Given** I have typed a search query, **When** I clear the search field, **Then** all articles are displayed again.

---

### User Story 2 - Keyboard Accessibility (Priority: P1)

As a power user, I want to focus the search field using a keyboard shortcut so that I can start searching without using my mouse.

**Why this priority**: Enhances accessibility and power-user efficiency, as specifically requested in the requirements.

**Independent Test**: Press `Cmd + K` (or `Ctrl + K`) on the keyboard and verify the search input receives focus.

**Acceptance Scenarios**:

1. **Given** the article listing page is open, **When** I press the `Cmd + K` keyboard shortcut, **Then** the search input field is focused and ready for typing.

---

### User Story 3 - Mobile Search Toggle (Priority: P2)

As a reader on a mobile device, I want a compact search interface that only expands when needed so that the screen remains uncluttered but I can still find specific articles.

**Why this priority**: Essential for a good mobile user experience where screen space is limited.

**Independent Test**: Tap the search icon on a mobile device and verify the search bar appears as an overlay.

**Acceptance Scenarios**:

1. **Given** I am on the article listing page on mobile, **When** I tap the search icon, **Then** a search input field appears covering almost the full width of the page.
2. **Given** the mobile search overlay is open, **When** I tap outside the field or a "close" button, **Then** the search field disappears and the icon returns.

---

### Edge Cases

- **No Results**: When a search query matches no articles, a friendly "No articles found" message should be displayed.
- **Special Characters**: The search should handle special characters (e.g., accents, symbols) gracefully without breaking the filtering logic.
- **Large Lists**: The filtering should remain performant even if the number of articles grows significantly (client-side performance).

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: The system MUST filter the displayed articles in real-time based on the user's input string.
- **FR-002**: The search logic MUST be executed entirely on the client-side (SPA context).
- **FR-003**: On desktop viewports, the search input MUST be visible by default as a standard form field on le right top of the article page, other side than the tag list.
- **FR-004**: On mobile viewports, the search input MUST be hidden initially, replaced by a toggleable search icon.
- **FR-005**: The system MUST support a `Cmd + K` (and `Ctrl + K` for Windows/Linux) shortcut to focus the search input.
- **FR-006**: The mobile search input MUST appear as an overlay (hover) covering the top area of the page when active.
- **FR-007**: The search MUST be case-insensitive.
- **FR-008**: The search MUST match against article titles, categories, and excerpts/descriptions using literal substring matching.
- **FR-009**: Pressing the `Escape` key MUST clear the search query and, on mobile, close the search overlay.
- **FR-010**: The system SHOULD NOT highlight matching text within the search results (keep UI simple).
- **FR-011**: The system MUST synchronize the search query with a `q` URL parameter (e.g., `?q=searchterm`) to support bookmarking and sharing.

### Key Entities

- **Article Listing**: The collection of articles being displayed and filtered.
- **Search Query**: The current string input by the user used for filtering.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: Users can filter the article list and see updated results in less than 100ms after typing.
- **SC-002**: The search field is focused within 10ms of pressing the keyboard shortcut.
- **SC-003**: 100% of the article filtering happens without any network requests to a backend.
- **SC-004**: On mobile devices, the search input occupies at least 90% of the screen width when expanded.
