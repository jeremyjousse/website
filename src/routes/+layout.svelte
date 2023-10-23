<script>
  import "$lib/styles/app.css";
  import Header from "$lib/components/layout/Header.svelte";
  import Footer from "$lib/components/layout/Footer.svelte";
  import GoogleAnalytics from "$lib/components/atoms/GoogleAnalytics.svelte";
</script>

<GoogleAnalytics />
<Header />

<main class="max-w-5xl mx-auto">
  <slot />
</main>

<Footer />
