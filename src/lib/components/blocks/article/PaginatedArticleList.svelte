<script lang="ts">
	import ArticleListing from './ArticleListing.svelte';
	import Pagination from '$lib/components/molecules/Pagination.svelte';
	import ArticleSearch from '$lib/components/molecules/ArticleSearch.svelte';
	import { articleStore } from '$lib/stores/articleStore.svelte';
	import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';

	interface Props {
		posts: MarkdownPostMetadataAndSlug[];
		categoryName?: string;
	}
	let { posts, categoryName }: Props = $props();

	let topPaginationElement: HTMLElement;

	$effect(() => {
		articleStore.posts = posts;
	});

	function handlePageChange(page: number) {
		articleStore.currentPage = page;
		// Scroll to the top pagination element
		topPaginationElement?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}
</script>

<ArticleSearch />

<div bind:this={topPaginationElement}>
	<Pagination
		currentPage={articleStore.currentPage}
		totalPages={articleStore.totalPages}
		onPageChange={handlePageChange}
	/>
</div>

<section
	data-testid="articles-section"
	class="divide-y dark:divide-gray-700"
>
	{#each articleStore.paginatedPosts as post (post.slug)}
		<ArticleListing {post} />
	{:else}
		<div class="p-4 text-center text-gray-500 dark:text-gray-400">
			No articles found matching "{articleStore.searchQuery}"{#if categoryName} in {categoryName}{/if}.
		</div>
	{/each}
</section>

<Pagination
	currentPage={articleStore.currentPage}
	totalPages={articleStore.totalPages}
	onPageChange={handlePageChange}
/>
