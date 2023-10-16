<script>
  import { base } from "$app/paths";
  import ArticleEditorial from "$lib/components/pages/article/ArticleEditorial.svelte";

  export let data;
  const { metadata, post: Post } = data;
</script>

<article>
  <ArticleEditorial {metadata} />

  <Post />
</article>
{#if metadata.category}
  <aside>
    <h2>Posted in:</h2>
    <a href="{base}/articles/{metadata.category}">
      {metadata.category}
    </a>
  </aside>
{/if}
