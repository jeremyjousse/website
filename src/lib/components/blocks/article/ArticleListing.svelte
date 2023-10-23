<script lang="ts">
  import { base } from "$app/paths";
  import type { MarkdownPostMetadataAndSlug } from "$lib/types/markdownPost";
  import { formatPublishedAt } from "$lib/utils/dates";

  export let post: MarkdownPostMetadataAndSlug;

  const postUrl = `${base}/articles/${post.metadata.category}/${post.slug}`;
</script>

<article class="p-4 sm:flex sm:space-x-4">
  <a href={postUrl} class="block sm:w-80">
    <div class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
      <img
        src={`${base}/articles/${post.metadata.category}/${post.metadata.coverImageSlug}/${post.metadata.coverImageSlug}-listing.jpg`}
        alt={post.metadata.title}
        class="object-cover"
      />
    </div>
  </a>

  <div class="flex-1 py-2 sm:py-0">
    <a href={postUrl}>
      <h3 class="text-xl font-medium mb-1">
        {post.metadata.title}
      </h3>
      <p class="font-light text-gray-60 dark:text-gray-300">
        <span>Published: </span>
        <time datetime={post.metadata.publishedAt}>
          {formatPublishedAt(post.metadata.publishedAt)}
        </time>
      </p>

      <p class="py-2 font-light">
        {post.metadata.summary}
      </p>
    </a>

    <div
      class="flex space-x-4 text-gray-600 dark:text-gray-300 font-light
              underline"
    >
      <a href={postUrl}>Lire la suite</a>
    </div>
  </div>
</article>
