<script>
  import ArticleListing from "$lib/components/blocks/article/ArticleListing.svelte";

  export let data;
</script>

<svelte:head>
  <title>Articles du blog de Jérémy Jousse</title>
</svelte:head>

<section data-testid="articles-section" class="divide-y dark:divide-gray-700">
  {#each data.posts as post}
    <ArticleListing {post} />
  {/each}
</section>
