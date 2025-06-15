<script lang="ts">
	import { base } from '$app/paths';
	import AuthorInfo from '$lib/components/atoms/AuthorInfo.svelte';
	import type { MarkdownPost } from '$lib/types/markdownPost';
	import { formatPublishedAt } from '$lib/utils/dates';
	import BlogPostCoverImage from 'lib/components/atoms/BlogPostCoverImage.svelte';

	export let metadata: MarkdownPost['metadata'];
</script>

<header class="p-4">
	<div class="mb-6 sm:w-3/5 lg:w-full">
		<div class="aspect-h-9 aspect-w-16 overflow-hidden rounded-lg">
			<BlogPostCoverImage src={metadata.coverImageSlug} alt={metadata.title} klass="object-cover" />
		</div>
		<div>
			<h1 class="md-4 text-4xl font-bold">{metadata.title}</h1>
			<div class="flex flex-row">
				{#if metadata.author}
					<div class="p-2">
						<AuthorInfo size="s" author={metadata.author} />
					</div>
				{/if}
				<div>
					<div class="inline-block border-b py-2 dark:border-gray-700">
						<span>Publié le</span>
						<time class="font-light" datetime={metadata.publishedAt}
							>{formatPublishedAt(metadata.publishedAt)}</time
						>
					</div>

					<aside class="">
						{#if metadata.category}
							<div>
								<span>Rubrique :</span>
								<a href="{base}/articles/{metadata.category}">
									{metadata.category}
								</a>
							</div>
						{/if}
						{#if metadata.tags}
							<div>
								<span>Tags :</span>
								{#each metadata.tags as tag, index (index)}
									<!-- <a href="{base}/articles/{tag}"> -->
									{#if index > 0},
									{/if}{tag}
									<!-- </a> -->
								{/each}
							</div>
						{/if}
					</aside>
				</div>
			</div>
		</div>
	</div>
</header>
