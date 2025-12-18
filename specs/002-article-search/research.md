# Research: Article Listing Search

## Technical Decisions

### URL State Management
- **Decision**: Use SvelteKit's `goto` with `replaceState: true` and `keepFocus: true` to synchronize the search query with the `?q=` URL parameter.
- **Rationale**: This allows for real-time URL updates without triggering full page reloads or adding every keystroke to the browser history, while maintaining the user's focus on the input field.
- **Alternatives considered**: 
    - `page.url.searchParams`: Reactive but doesn't handle updates as cleanly as `goto`.
    - Native `history.replaceState`: Avoided to stay within the SvelteKit idiomatic way of handling navigation.

### Search Logic
- **Decision**: Implement a simple client-side filter using `String.prototype.includes()` (case-insensitive) on the combined searchable fields (title, category, excerpt).
- **Rationale**: Given the project is a static site (SPA) with a manageable number of articles, client-side filtering is instantaneous and requires no backend infrastructure.
- **Alternatives considered**:
    - FlexSearch/Lunr.js: Overkill for the current scale of the blog.
    - Fuse.js: Good for fuzzy matching, but requirements specifically asked for literal substring matching.

### Responsive UI Pattern
- **Decision**: Use Tailwind's responsive classes (`hidden md:block` for desktop input, `block md:hidden` for mobile icon) and a Svelte state variable to toggle the mobile search overlay.
- **Rationale**: Tailwind provides a robust way to handle responsive layouts. A dedicated mobile overlay ensures the search input is easily accessible on small screens without cluttering the header.

### Keyboard Shortcut
- **Decision**: Use a global `window` keydown listener (or Svelte's `<svelte:window on:keydown={...} />`) to intercept `Cmd+K` and `Ctrl+K`.
- **Reasoning**: Standard web practice for "Quick Search" functionality.

## Best Practices
- **Accessibility**: Use `aria-label` for the search input and buttons. Ensure the mobile overlay traps focus or at least receives it when opened.
- **Performance**: Debounce the URL update (not the filter) if keystrokes are very rapid, though for local filtering, it might not be strictly necessary.
