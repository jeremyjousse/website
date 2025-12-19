import { derived, writable } from 'svelte/store';

import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';
import { PAGINATION_CONFIG } from '$lib/config/pagination';
import { filterArticles } from '$lib/utils/search';

function createArticleStore() {
	const posts = writable<MarkdownPostMetadataAndSlug[]>([]);
	const currentPage = writable<number>(1);
	const itemsPerPage = writable<number>(PAGINATION_CONFIG.ITEMS_PER_PAGE);

	const _searchQuery = writable<string>('');
	const searchQuery = {
		subscribe: _searchQuery.subscribe,
		set: (val: string) => {
			_searchQuery.set(val);
			currentPage.set(1);
		},
		update: (fn: (val: string) => string) => {
			_searchQuery.update((val) => {
				const newVal = fn(val);
				currentPage.set(1);
				return newVal;
			});
		}
	};

	const filteredPosts = derived([posts, searchQuery], ([$posts, $searchQuery]) =>
		filterArticles($posts, $searchQuery)
	);

	const paginatedPosts = derived(
		[filteredPosts, currentPage, itemsPerPage],
		([$filteredPosts, $currentPage, $itemsPerPage]) => {
			const start = ($currentPage - 1) * $itemsPerPage;
			const end = start + $itemsPerPage;
			return $filteredPosts.slice(start, end);
		}
	);

	const totalPages = derived([filteredPosts, itemsPerPage], ([$filteredPosts, $itemsPerPage]) =>
		Math.ceil($filteredPosts.length / $itemsPerPage)
	);

	return {
		posts,
		searchQuery,
		currentPage,
		itemsPerPage,
		filteredPosts,
		paginatedPosts,
		totalPages,
		setPosts: (data: MarkdownPostMetadataAndSlug[]) => {
			posts.set(data);
			currentPage.set(1); // Reset to first page when posts change
		},
		setSearchQuery: (query: string) => {
			searchQuery.set(query);
		},
		setCurrentPage: (page: number) => currentPage.set(page),
		setItemsPerPage: (items: number) => {
			itemsPerPage.set(items);
			currentPage.set(1); // Reset to first page when items per page changes
		}
	};
}

export const articleStore = createArticleStore();
