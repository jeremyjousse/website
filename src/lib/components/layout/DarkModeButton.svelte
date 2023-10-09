<script lang="ts">
  import { slide } from "svelte/transition";
  import { darkMode } from "$lib/stores/darkMode";
  import Moon from "$lib/components/svg/Moon.svelte";
  import Sun from "$lib/components/svg/Sun.svelte";

  function toggleDarkMode() {
    if ($darkMode) {
      $darkMode = false;
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      $darkMode = true;
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  let inTransition = { duration: 400, delay: 500 };
  let outTransition = { duration: 400 };
</script>

<button
  class="p-2 text-purple-800 dark:text-yellow-200"
  on:click={toggleDarkMode}
>
  {#if $darkMode}
    <div in:slide={inTransition} out:slide={outTransition}>
      <Sun class="w-8 h-8 fill-current" />
    </div>
  {:else}
    <div in:slide={inTransition} out:slide={outTransition}>
      <Moon class="w-8 h-8 fill-current" />
    </div>
  {/if}
</button>
