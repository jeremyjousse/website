<script lang="ts">
	import ArticleListing from './ArticleListing.svelte';
	import Pagination from '$lib/components/molecules/Pagination.svelte';
	import ArticleSearch from '$lib/components/molecules/ArticleSearch.svelte';
	import { setArticleState } from '$lib/components/context/article.svelte';
	import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';
	import { untrack } from 'svelte';

	interface Props {
		posts: MarkdownPostMetadataAndSlug[];
		categoryName?: string;
	}
	let { posts, categoryName }: Props = $props();

	let topPaginationElement: HTMLElement;

	// Initialize the store immediately so it renders during SSR/Prerendering
	const articleState = setArticleState();
	articleState.posts = untrack(() => posts);

	$effect(() => {
		articleState.posts = posts;
	});

	function handlePageChange(page: number) {
		articleState.currentPage = page;
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
		currentPage={articleState.currentPage}
		totalPages={articleState.totalPages}
		onPageChange={handlePageChange}
	/>
</div>

<section data-testid="articles-section" class="divide-y dark:divide-gray-700">
	{#each articleState.paginatedPosts as post (post.slug)}
		<ArticleListing {post} />
	{:else}
		<div class="p-4 text-center text-gray-500 dark:text-gray-400">
			No articles found matching "{articleState.searchQuery}"{#if categoryName}
				in {categoryName}{/if}.
		</div>
	{/each}
</section>

<Pagination
	currentPage={articleState.currentPage}
	totalPages={articleState.totalPages}
	onPageChange={handlePageChange}
/>
