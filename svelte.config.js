import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";
import rehypeExternalLinks from "rehype-external-links";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".md"],
  preprocess: [
    preprocess(),
    vitePreprocess(),
    mdsvex({
      extensions: [".md"],
      rehypePlugins: [
        [
          rehypeExternalLinks,
          {
            rel: ["nofollow", "noopener", "noreferrer", "external"],
            target: "_blank",
          },
        ],
      ],
    }),
  ],

  kit: {
    adapter: adapter(),
    alias: {
        "lib": "./src/lib",
        "lib/*": "./src/lib/*",
        "vitest": "./vitest",
        "vitest/*": "./vitest/*"
    },
    paths: {
      base: process.env.NODE_ENV === "production" ? "/website" : "",
    },
  },
};

export default config;
