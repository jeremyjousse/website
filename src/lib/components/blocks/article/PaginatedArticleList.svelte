<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import ArticleListing from './ArticleListing.svelte';
	import Pagination from '#lib/components/molecules/Pagination.svelte';
	import ArticleSearch from '#lib/components/molecules/ArticleSearch.svelte';
	import { setArticleState } from '#lib/components/context/article.svelte.js';
	import type { MarkdownPostMetadataAndSlug } from '#lib/types/markdownPost.js';
	import { buildPaginatedUrl, parsePageParam } from '#lib/utils/pagination.js';
	import { untrack } from 'svelte';

	interface Props {
		posts: MarkdownPostMetadataAndSlug[];
		categoryName?: string;
	}
	let { posts, categoryName }: Props = $props();

	let topPaginationElement: HTMLElement;
	let lastSyncedHref: string | null = null;
	let lastPosts = untrack(() => posts);

	// Initialize the store immediately so it renders during SSR/Prerendering
	const articleState = setArticleState();
	articleState.posts = untrack(() => posts);

	$effect(() => {
		const currentPosts = posts;
		const postsChanged = currentPosts !== lastPosts;
		if (postsChanged) {
			lastPosts = currentPosts;
			articleState.posts = currentPosts;
		}

		if (!browser) return;

		const currentHref = page.url.href;
		const urlChanged = currentHref !== lastSyncedHref;

		if (urlChanged) {
			lastSyncedHref = currentHref;

			const urlQuery = page.url.searchParams.get('q') || '';
			if (urlQuery !== untrack(() => articleState.searchQuery)) {
				articleState.searchQuery = urlQuery;
			}

			const rawPage = page.url.searchParams.get('page');
			const totalPages = untrack(() => articleState.totalPages);
			const validPage = parsePageParam(rawPage, totalPages);

			if (untrack(() => articleState.currentPage) !== validPage) {
				articleState.currentPage = validPage;
			}

			if (rawPage !== null && (validPage === 1 || String(validPage) !== rawPage)) {
				const normalizedUrl = buildPaginatedUrl(page.url, validPage);
				goto(normalizedUrl, { replace: true, reset: false });
			}
		} else if (postsChanged && page.url.searchParams.has('page')) {
			const cleanedUrl = buildPaginatedUrl(page.url, 1);
			goto(cleanedUrl, { replace: true, reset: false });
		}
	});

	function handlePageChange(nextPage: number) {
		if (nextPage === articleState.currentPage) return;
		if (nextPage < 1 || nextPage > articleState.totalPages) return;

		articleState.currentPage = nextPage;

		if (browser) {
			const nextUrl = buildPaginatedUrl(page.url, nextPage);
			goto(nextUrl, { replace: false, reset: false });
		}

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
