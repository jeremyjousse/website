import { describe, expect, it } from 'vitest';
import { ArticleStore } from './articleStore.svelte';
import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';
import { PAGINATION_CONFIG } from '$lib/config/pagination';

describe('ArticleStore', () => {
	const mockPosts: MarkdownPostMetadataAndSlug[] = [
		{
			slug: 'post-1',
			metadata: {
				title: 'Svelte is awesome',
				summary: 'A post about Svelte framework',
				category: 'tech',
				categorySub: 'frameworks',
				coverImageSlug: 'svelte',
				publishedAt: '2023-01-01',
				tags: ['svelte', 'js']
			}
		},
		{
			slug: 'post-2',
			metadata: {
				title: 'Cooking Pasta',
				summary: 'Delicious pasta recipes',
				category: 'cuisine',
				categorySub: 'italian',
				coverImageSlug: 'pasta',
				publishedAt: '2023-01-02',
				tags: ['food']
			}
		}
	];

	it('should initialize with defaults', () => {
		const store = new ArticleStore();
		expect(store.posts).toEqual([]);
		expect(store.searchQuery).toBe('');
		expect(store.currentPage).toBe(1);
		expect(store.itemsPerPage).toBe(PAGINATION_CONFIG.ITEMS_PER_PAGE);
	});

	it('should filter posts based on search query', () => {
		const store = new ArticleStore();
		store.posts = mockPosts;
		store.searchQuery = 'svelte';
		expect(store.filteredPosts).toHaveLength(1);
		expect(store.filteredPosts[0].metadata.title).toBe('Svelte is awesome');
	});

	it('should update filtered posts when posts change', () => {
		const store = new ArticleStore();
		expect(store.filteredPosts).toHaveLength(0);

		store.posts = mockPosts;
		expect(store.filteredPosts).toHaveLength(2);

		store.searchQuery = 'pasta';
		expect(store.filteredPosts).toHaveLength(1);
	});

	it('should handle pagination', () => {
		const store = new ArticleStore();
		store.posts = mockPosts;
		store.itemsPerPage = 1;

		expect(store.totalPages).toBe(2);
		expect(store.paginatedPosts).toHaveLength(1);
		expect(store.paginatedPosts[0].metadata.title).toBe('Svelte is awesome');

		store.currentPage = 2;
		expect(store.paginatedPosts[0].metadata.title).toBe('Cooking Pasta');
	});

	it('should reset to first page when search query changes', () => {
		const store = new ArticleStore();
		store.posts = mockPosts;
		store.itemsPerPage = 1;
		store.currentPage = 2;
		expect(store.currentPage).toBe(2);

		store.searchQuery = 'a';
		expect(store.currentPage).toBe(1);
	});

	it('should reset to first page when itemsPerPage changes', () => {
		const store = new ArticleStore();
		store.posts = mockPosts;
		store.itemsPerPage = 1;
		store.currentPage = 2;

		store.itemsPerPage = 2;
		expect(store.currentPage).toBe(1);
	});

	it('should reset to first page when posts change', () => {
		const store = new ArticleStore();
		store.posts = mockPosts;
		store.itemsPerPage = 1;
		store.currentPage = 2;

		store.posts = [...mockPosts]; // New reference
		expect(store.currentPage).toBe(1);
	});
});
