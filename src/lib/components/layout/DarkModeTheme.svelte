<script lang="ts">
  import { browser } from "$app/environment";
  import { darkMode } from "$lib/stores/darkMode";

  if (browser) {
    $darkMode = false;

    if (
      localStorage.theme === "dark" ||
      (!localStorage.theme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      $darkMode = true;
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
</script>

<slot />
