import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';
import Page from './+page.svelte';
import { articleStore } from '$lib/stores/articleStore.svelte';

vi.mock('$app/paths', () => ({
	base: ''
}));

// We need to mock $app/stores for ArticleSearch
vi.mock('$app/stores', () => ({
	page: {
		subscribe: (fn: any) => {
			fn({ url: new URL('http://localhost') });
			return () => {};
		}
	}
}));

// We need to mock $app/navigation for ArticleSearch
vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

// We need to mock $app/environment for ArticleSearch
vi.mock('$app/environment', () => ({
	browser: true
}));

const mockPosts: MarkdownPostMetadataAndSlug[] = Array.from({ length: 15 }, (_, i) => ({
	slug: `post-${i}`,
	metadata: {
		title: `Post ${i}`,
		category: 'tech',
		categorySub: 'svelte',
		coverImageSlug: 'image',
		publishedAt: '2023-01-01',
		summary: 'Summary',
		tags: ['svelte']
	}
}));

describe('Category Page', () => {
	it('renders articles, search and pagination', () => {
		render(Page, {
			data: {
				posts: mockPosts,
				category: 'tech',
				categories: ['tech', 'lifestyle']
			}
		});

		// Check if search input is present (it might be hidden on desktop but present in DOM)
		const searchInput = screen.getByLabelText('Search articles');
		expect(searchInput).toBeTruthy();

		// Check if articles are rendered
		// Note: ArticleListing is mocked but we can check if the section is there
		const section = screen.getByTestId('articles-section');
		expect(section).toBeTruthy();

		// Since we mocked ArticleListing, we might not see "Post 0" text directly if the mock doesn't render props.
		// However, we can check if the store was updated.
		expect(articleStore.posts).toEqual(mockPosts);

		// Check pagination (should have two: top and bottom)
		const paginationElements = screen.getAllByLabelText('Pagination');
		expect(paginationElements.length).toBe(2);
	});
});
