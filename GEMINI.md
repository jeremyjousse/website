# Project Context: Personal Website (SvelteKit)

## Overview

This is a personal website and blog built with [SvelteKit](https://kit.svelte.dev/) (using Svelte 5). It serves as a portfolio and technical/personal blog. The project is designed to be statically generated and deployed (likely to GitHub Pages).

## Architecture & Technologies

- **Framework:** SvelteKit (Static Adapter)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v4)
- **Content:** Markdown (`mdsvex`) with metadata.
- **Testing:**
  - Unit/Component: `vitest` + `@testing-library/svelte`
  - E2E: `playwright`
- **Linting/Formatting:** ESLint, Prettier

## Directory Structure

- `src/content/posts`: Markdown files for blog posts, organized by category (cuisine, tech, voyages).
- `src/lib`: Shared code.
  - `components`: Svelte components (atomic design: atoms, molecules, blocks, layout, pages).
  - `styles`: Global and specific CSS files.
  - `types`: TypeScript interfaces/types.
  - `utils`: Helper functions.
- `src/routes`: SvelteKit application routes.
- `static`: Static assets (images, favicons).
- `playwright`: End-to-End tests.
- `vitest`: Vitest configuration and mocks.

## Development & Usage

### Setup

Install dependencies:

```bash
pnpm install
```

### Key Commands

| Command             | Description                                                     |
| :------------------ | :-------------------------------------------------------------- |
| `pnpm run dev`      | Start the development server (default: <http://localhost:3000>) |
| `pnpm run build`    | Build the application for production (static export)            |
| `pnpm run preview`  | Preview the production build locally                            |
| `pnpm run check`    | Run TypeScript/Svelte checks                                    |
| `pnpm run test`     | Run unit tests (Vitest)                                         |
| `pnpm run test:e2e` | Run end-to-end tests (Playwright)                               |
| `pnpm run lint`     | Run linting (ESLint + Prettier)                                 |
| `pnpm run format`   | Format code with Prettier                                       |

### Configuration Notes

- **Base Path:** In production (`NODE_ENV === 'production'`), the site is built with the base path `/website` (configured in `svelte.config.js`).
- **Markdown:** `mdsvex` is configured to process `.md` files. External links are automatically modified to open in a new tab (`rehype-external-links`).
- **Aliases:**
  - `$lib` -> `src/lib`
  - `vitest` -> `./vitest`

### Testing Conventions

- Unit tests are co-located with source files or in `src` matching `*.test.ts` or `*.spec.ts`.
- `vitest` is configured with `jsdom` environment.
- E2E tests are in the `playwright` directory.

### Styling

- Tailwind CSS is the primary styling method.
- Global styles are imported in `src/routes/+layout.svelte` via `$lib/styles/app.css`.
- Post-specific styles are in `$lib/styles/post.css`.

## Active Technologies

- Node.js (Version defined in `.nvmrc` or `package.json` engines) + `pnpm` (Package Manager), SvelteKit (Framework), Tailwind CSS (Styling) (001-update-pnpm-deps)
- N/A (File-system based: `package.json`, `pnpm-lock.yaml`) (001-update-pnpm-deps)

## Recent Changes

- 001-update-pnpm-deps: Added Node.js (Version defined in `.nvmrc` or `package.json` engines) + `pnpm` (Package Manager), SvelteKit (Framework), Tailwind CSS (Styling)
