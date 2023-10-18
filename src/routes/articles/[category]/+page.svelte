<script>
  import { base } from "$app/paths";
  import ArticleListing from "$lib/components/blocks/article/ArticleListing.svelte";

  export let data;
</script>

<section class="divide-y dark:divide-gray-700">
  {#each data.posts as post}
    <ArticleListing {post} />
  {/each}
</section>
