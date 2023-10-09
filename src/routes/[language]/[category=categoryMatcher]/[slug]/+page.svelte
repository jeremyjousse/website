<script lang="ts">
  import "./prisme-night-owl.css";
  import type { PageData } from "./$types";
  import CopyCodeInjector from "$lib/components/atoms/CopyCodeInjector.svelte";
  import PostEditorial from "$lib/components/PostEditorial.svelte";

  export let data: PageData;

  const { metadata, post: Post } = data;
</script>

<article>
  <PostEditorial {metadata} />
  <div class="prose dark:prose-invert px-4 py-4">
    <CopyCodeInjector>
      <Post />
    </CopyCodeInjector>
  </div>
</article>
