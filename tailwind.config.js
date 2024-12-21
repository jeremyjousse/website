import aspectRatio from "@tailwindcss/aspect-ratio";
import typography from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "dark-background": "#0F161E",
      },
    },
  },
  plugins: [aspectRatio, typography],
};
