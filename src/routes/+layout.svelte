<script>
  import "../app.css";
  import Header from "$lib/components/layout/Header.svelte";
</script>

<Header />

<main class="max-w-5xl mx-auto">
  <slot />
</main>

<footer class="pt-24 max-w-5xl mx-auto">WIP Footer</footer>
