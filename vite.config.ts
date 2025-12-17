import { defineConfig } from 'vitest/config';
import istanbul from 'vite-plugin-istanbul';
import { sveltekit } from '@sveltejs/kit/vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
	build: {
		sourcemap: true
	},
	resolve: {
		conditions: ['browser']
	},
	plugins: [
		sveltekit(),
		tsconfigPaths(),
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
