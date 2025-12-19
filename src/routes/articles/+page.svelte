<script lang="ts">
	import ArticleListing from '$lib/components/blocks/article/ArticleListing.svelte';
	import Pagination from '$lib/components/molecules/Pagination.svelte';
	import ArticleSearch from '$lib/components/molecules/ArticleSearch.svelte';
	import { articleStore } from '../../stores/articleStore';
	import type { PageData } from './$types';

	export let data: PageData;

	const { paginatedPosts, searchQuery, currentPage, totalPages } = articleStore;

	$: articleStore.setPosts(data.posts);

	function handlePageChange(page: number) {
		articleStore.setCurrentPage(page);
		// Scroll to top of articles section
		document.querySelector('[data-testid="articles-section"]')?.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
	}
</script>

<svelte:head>
	<title>Articles du blog de Jérémy Jousse</title>
</svelte:head>

<ArticleSearch />

<section data-testid="articles-section" class="divide-y dark:divide-gray-700">
	{#each $paginatedPosts as post (post.slug)}
		<ArticleListing {post} />
	{:else}
		<div class="p-4 text-center text-gray-500 dark:text-gray-400">
			No articles found matching "{$searchQuery}".
		</div>
	{/each}
</section>

<Pagination currentPage={$currentPage} totalPages={$totalPages} onPageChange={handlePageChange} />
