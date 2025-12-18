# Data Model: Article Listing Search

## Entities

### SearchState
Represents the current state of the search interface.

| Field | Type | Description |
|-------|------|-------------|
| query | String | The literal text typed by the user. |
| isActive | Boolean | (Mobile only) Whether the search overlay is visible. |
| results | Array<Article> | The filtered list of articles matching the query. |

## Relationships
- **SearchState** filters the **Article Listing**.
- **SearchState** is synchronized with the **URL Query Parameters** (`?q=`).

## Validation Rules
- `query` must be a string (can be empty).
- `query` matching is case-insensitive.
- `query` matching is literal substring.

## State Transitions
1. **Idle**: Search field is empty or contains previous query from URL.
2. **Searching**: User types in field; `query` updates; `results` update in real-time.
3. **Overlay Active**: (Mobile) User clicks icon; `isActive` becomes true.
4. **Cleared**: User clicks "Clear", presses "Escape", or deletes text; `query` returns to empty string.
