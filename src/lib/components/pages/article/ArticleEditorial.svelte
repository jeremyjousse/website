<script lang="ts">
  import { base } from "$app/paths";
  import type { MarkdownPost } from "$lib/types/markdownPost";
  import { formatPublishedAt } from "$lib/utils/dates";

  export let metadata: MarkdownPost["metadata"];
</script>

<header class="p-4">
  <div class="sm:w-3/5 lg:w-full mb-6">
    <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
      <img
        src={`${base}/articles/${metadata.category}/${metadata.coverImageSlug}.jpg`}
        alt={metadata.title}
        class="object-cover"
      />
    </div>
    <div>
      <h1 class="text-4xl font-bold md-4">{metadata.title}</h1>
      <div class="py-2 border-b dark:border-gray-700 inline-block">
        <span>Publié le</span>
        <time class="font-light" datetime={metadata.publishedAt}
          >{formatPublishedAt(metadata.publishedAt)}</time
        >
      </div>
    </div>
  </div>
</header>
