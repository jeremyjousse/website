import { defineConfig } from "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [sveltekit(), tsconfigPaths()],

  server: {
    port: 3000,
  },
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
    },
    include: ["src/**/*.{test,spec}.{js,ts}"],
    environment: "jsdom",
    globals: true,
    setupFiles: [
      "./vitest/config/cleanupDom.ts",
      "./vitest/config/registerMatchers.ts",
    ],
    testTimeout: 10000,
    restoreMocks: true,
  },
});
