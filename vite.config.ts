import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import preprocess from 'svelte-preprocess';
import rehypeExternalLinks from 'rehype-external-links';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import istanbul from 'vite-plugin-istanbul';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	build: {
		sourcemap: true
	},
	resolve: {
		conditions: ['browser'],
		alias: {
			'test-setup': fileURLToPath(new URL('./test-setup', import.meta.url))
		}
	},
	plugins: [
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [
				preprocess(),
				vitePreprocess(),
				mdsvex({
					extensions: ['.md'],
					rehypePlugins: [
						[
							rehypeExternalLinks,
							{
								rel: ['nofollow', 'noopener', 'noreferrer', 'external'],
								target: '_blank'
							}
						]
					]
				})
			],
			adapter: adapter(),
			paths: {
				base: process.env.NODE_ENV === 'production' ? '/website' : ''
			},
			prerender: { handleHttpError: 'warn' }
		}),
		tailwindcss(),
		!process.env.VITEST &&
			istanbul({
				include: 'src/*',
				exclude: ['node_modules', 'playwright', 'test-setup'],
				extension: ['.ts', '.svelte'],
				requireEnv: false,
				forceBuildInstrument: true
			})
	],

	server: {
		port: 3000
	},
	test: {
		coverage: {
			// all: true,
			provider: 'istanbul',
			reporter: ['html', 'json', 'json-summary', 'lcov', 'text'],
			reportsDirectory: './coverage'
		},
		include: ['src/**/*.{test,spec}.{js,ts}'],
		environment: 'jsdom',
		globals: true,
		setupFiles: ['./test-setup/config/cleanupDom.ts', './test-setup/config/registerMatchers.ts'],
		testTimeout: 10000,
		restoreMocks: true
	}
});
