# Copilot Instructions: Svelte 5 + SvelteKit 2 + Tailwind 4

You are an expert web developer specializing in **Svelte 5**, **SvelteKit 2**, **Tailwind CSS 4**, and **TypeScript**.

## 1. Core Technologies & Conventions

### Svelte 5 (Runes Mode)

- **State Management:** Use Runes exclusively.
  - State: `$state(initialValue)`
  - Derived State: `$derived(expression)`
  - Effects: `$effect(() => { ... })`
  - Props: `let { propName = defaultValue }: { propName?: string } = $props();`
  - **Do NOT** use the legacy `$:` reactive syntax.
  - **Do NOT** use `export let` for props.
- **Components:**
  - Use `<script lang="ts">`.
  - Use `snippet` for reusable template parts instead of `<slot>`.
- **Events:**
  - Use standard HTML attributes for events: `onclick={handler}` instead of `on:click={handler}`.

### SvelteKit 2

- **Routing:** Follow the standard file-based routing: `src/routes/...`.
- **Loading Data:**
  - Use `+page.ts` / `+page.server.ts` for data loading.
  - Type load functions using generated types: `import type { PageLoad } from './$types';`.
- **Links & Navigation:**
  - Use standard `<a href="...">` tags. SvelteKit intercepts them.
  - **Base Path:** The project is deployed to a subdirectory (`/website`).
  - When referencing static assets (images in `static/`) or constructing paths manually in JS, **ALWAYS** use the `base` import:
    ```typescript
    import { base } from '$app/paths';
    const imagePath = `${base}/my-image.png`;
    ```

### Tailwind CSS 4

- **Styling:** Use utility classes directly in markup.
- **Configuration:** Tailwind 4 uses CSS-first configuration. Check `src/lib/styles/app.css` for `@theme` or `@import` rules.
- **Dynamic Styles:** For highly dynamic values, use `style` attributes with CSS variables or Svelte derived values, combined with Tailwind utilities.

## 2. Project Architecture

### Directory Structure

- `src/routes`: Application pages and API routes.
- `src/lib/components`: Shared Svelte components.
  - `atoms`, `molecules`, `organisms`, `layout`, (Atomic Design).
- `src/lib/utils`: Helper functions.
- `src/lib/stores`: Svelte stores (prefer Runes state in components/context where possible).
- `src/content`: Markdown files processed by `mdsvex`.

### Static Site Generation (GitHub Pages)

- **Adapter:** `@sveltejs/adapter-static`.
- **Prerendering:** The site is fully static.
  - Ensure `export const prerender = true;` is set in the root layout or individual pages where strictly necessary (though usually handled globally).
  - Avoid server-side only logic (`+page.server.ts`) unless it's for build-time data fetching that `adapter-static` can execute.

## 3. Testing

- **Unit Tests (`vitest`):**
  - Co-locate tests or place in `src` with `*.test.ts`.
  - Use `@testing-library/svelte` for component testing.
- **E2E Tests (`playwright`):**
  - Located in `playwright/`.

## 4. Example: Svelte 5 Component

```svelte
<script lang="ts">
	import { base } from '$app/paths';

	let { title, active = false }: { title: string; active?: boolean } = $props();

	let count = $state(0);
	let double = $derived(count * 2);

	function increment() {
		count += 1;
	}
</script>

<div
	class="rounded-lg border p-4 {active ? 'border-blue-200 bg-blue-50' : 'border-gray-200 bg-white'}"
>
	<h2 class="text-xl font-bold">{title}</h2>
	<p>Count: {count} (Double: {double})</p>

	<button
		onclick={increment}
		class="mt-2 rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
	>
		Increment
	</button>

	<img src="{base}/icons/icon.svg" alt="Icon" class="mt-2 h-6 w-6" />
</div>
```
