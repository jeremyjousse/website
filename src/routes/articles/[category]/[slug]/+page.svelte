<script>
  import "$lib/styles/post.css";
  import { base } from "$app/paths";
  import ArticleEditorial from "$lib/components/pages/article/ArticleEditorial.svelte";

  export let data;
  const { metadata, post: Post, slug } = data;
</script>

<svelte:head>
  <title>{metadata.title} - blog de Jérémy Jousse</title>
</svelte:head>

<article>
  <ArticleEditorial {metadata} {slug} />
  <div class="prose-invert prose-lg px-4 py-4 prose mb-10">
    <Post />
  </div>
</article>
