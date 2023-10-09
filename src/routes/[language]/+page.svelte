<script lang="ts">
  import HomeEditorial from "$lib/components/HomeEditorial.svelte";
  import PostListing from "$lib/components/PostListing.svelte";
  import { LL } from "$lib/i18n/i18n-svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<HomeEditorial />

<section class="pb-6">
  <header
    class="inline-block border-b dark:border-gray-700
      py-2 mx-4 mb-4"
  >
    <h2 class="text-3xl font-semibold">{$LL.blogPosts()}</h2>
  </header>

  <section class="divide-y dark:divide-gray-700">
    {#each data.posts as post}
      <PostListing {post} />
    {/each}
  </section>
</section>
