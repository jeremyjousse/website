<script lang="ts">
	import { base } from '$app/paths';
	import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';
	import { formatPublishedAt } from '$lib/utils/dates';
	import BlogPostCoverImage from 'lib/components/atoms/BlogPostCoverImage.svelte';

	export let post: MarkdownPostMetadataAndSlug;

	const postUrl = `${base}/articles/${post.metadata.category}/${post.slug}`;
</script>

<article class="p-4 sm:flex sm:space-x-4">
	<a href={postUrl} class="block sm:w-80">
		<div class="aspect-h-9 aspect-w-16 overflow-hidden rounded-lg">
			<BlogPostCoverImage
				src={post.metadata.coverImageSlug}
				alt={post.metadata.title}
				klass="object-cover"
			/>
		</div>
	</a>

	<div class="flex-1 py-2 sm:py-0">
		<a href={postUrl}>
			<h3 class="mb-1 text-xl font-medium">
				{post.metadata.title}
			</h3>
			<p class="text-gray-60 font-light dark:text-gray-300">
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
			class="flex space-x-4 font-light text-gray-600 underline
              dark:text-gray-300"
		>
			<a href={postUrl}>Lire la suite</a>
		</div>
	</div>
</article>
