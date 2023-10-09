<script lang="ts">
  import "../app.css";
  import NavBar from "$lib/components/layout/NavBar.svelte";
  import DarkModeTheme from "$lib/components/layout/DarkModeTheme.svelte";
</script>

<DarkModeTheme>
  <NavBar />

  <main class="pt-24 max-w-5xl mx-auto">
    <slot />
  </main>
</DarkModeTheme>
