import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { tick } from 'svelte';
import { SvelteMap, SvelteURL } from 'svelte/reactivity';

import PaginatedArticleList from './PaginatedArticleList.svelte';
import type { MarkdownPostMetadataAndSlug } from '#lib/types/markdownPost.js';
import { goto } from '$app/navigation';
import * as appEnv from '$app/env';
import { page } from '$app/state';

const mockState = vi.hoisted(() => ({
	browser: true
}));

vi.mock('$app/paths', () => ({
	resolve: (path: string) => `/${path}`
}));

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

vi.mock('$app/env', () => ({
	get browser() {
		return mockState.browser;
	}
}));

vi.mock('$app/state', async () => {
	const { SvelteURL } = await import('svelte/reactivity');
	return {
		page: {
			url: new SvelteURL('http://localhost/articles')
		}
	};
});

function createPosts(count: number, prefix = 'Post'): MarkdownPostMetadataAndSlug[] {
	return Array.from({ length: count }, (_, i) => ({
		slug: `${prefix.toLowerCase()}-${i}`,
		metadata: {
			title: `${prefix} ${i}`,
			category: 'tech',
			categorySub: 'svelte',
			coverImageSlug: 'image',
			publishedAt: '2023-01-01',
			summary: `Summary for ${prefix} ${i}`,
			tags: ['svelte']
		}
	}));
}

describe('PaginatedArticleList URL persistence', () => {
	beforeEach(() => {
		mockState.browser = true;
		(page.url as SvelteURL).href = 'http://localhost/articles';
		Element.prototype.scrollIntoView = vi.fn();
		vi.clearAllMocks();
	});

	it('restores active page from ?page query parameter on initial load', async () => {
		(page.url as SvelteURL).href = 'http://localhost/articles?page=2';
		render(PaginatedArticleList, { posts: createPosts(25) });

		await waitFor(() => {
			expect(screen.getByText('Post 10')).toBeInTheDocument();
		});
		expect(screen.queryByText('Post 0')).not.toBeInTheDocument();
		expect(goto).not.toHaveBeenCalled();
	});

	it('restores both ?q and ?page query parameters on initial load', async () => {
		const posts = [...createPosts(15, 'Match'), ...createPosts(10, 'Other')];
		(page.url as SvelteURL).href = 'http://localhost/articles?q=match&page=2';

		render(PaginatedArticleList, { posts });

		await waitFor(() => {
			expect(screen.getByText('Match 10')).toBeInTheDocument();
		});
		expect(screen.queryByText('Match 0')).not.toBeInTheDocument();
		expect(screen.queryByText('Other 0')).not.toBeInTheDocument();
		expect(screen.getAllByLabelText('Search articles')[0]).toHaveValue('match');
	});

	it('pushes ?page to browser history when navigating to page > 1 and preserves ?q', async () => {
		const posts = createPosts(25, 'Match');
		(page.url as SvelteURL).href = 'http://localhost/articles?q=match';

		render(PaginatedArticleList, { posts });

		const page2Buttons = screen.getAllByTestId('pagination-page-2');
		await fireEvent.click(page2Buttons[0]);

		expect(goto).toHaveBeenCalledTimes(1);
		const [url, options] = vi.mocked(goto).mock.calls[0] as [
			URL,
			{ replace?: boolean; reset?: boolean }
		];
		expect(url.searchParams.get('page')).toBe('2');
		expect(url.searchParams.get('q')).toBe('match');
		expect(options).toEqual({ replace: false, reset: false });
		expect(screen.getByText('Match 10')).toBeInTheDocument();
	});

	it('omits ?page from URL when navigating back to page 1 and preserves ?q', async () => {
		const posts = createPosts(25, 'Match');
		(page.url as SvelteURL).href = 'http://localhost/articles?q=match&page=2';

		render(PaginatedArticleList, { posts });

		await waitFor(() => {
			expect(screen.getByText('Match 10')).toBeInTheDocument();
		});

		const page1Buttons = screen.getAllByTestId('pagination-page-1');
		await fireEvent.click(page1Buttons[0]);

		expect(goto).toHaveBeenCalledTimes(1);
		const [url, options] = vi.mocked(goto).mock.calls[0] as [
			URL,
			{ replace?: boolean; reset?: boolean }
		];
		expect(url.searchParams.has('page')).toBe(false);
		expect(url.searchParams.get('q')).toBe('match');
		expect(options).toEqual({ replace: false, reset: false });
		expect(screen.getByText('Match 0')).toBeInTheDocument();
	});

	it('updates active page when URL changes via browser Back/Forward navigation', async () => {
		(page.url as SvelteURL).href = 'http://localhost/articles?page=2';
		render(PaginatedArticleList, { posts: createPosts(25) });

		await waitFor(() => {
			expect(screen.getByText('Post 10')).toBeInTheDocument();
		});

		// Simulate popstate navigating back to page 1 URL
		(page.url as SvelteURL).href = 'http://localhost/articles';
		await tick();

		await waitFor(() => {
			expect(screen.getByText('Post 0')).toBeInTheDocument();
		});
		expect(screen.queryByText('Post 10')).not.toBeInTheDocument();

		// Simulate popstate navigating forward to page 3 URL
		(page.url as SvelteURL).href = 'http://localhost/articles?page=3';
		await tick();

		await waitFor(() => {
			expect(screen.getByText('Post 20')).toBeInTheDocument();
		});
	});

	it.each(['999', 'abc', '0', '1'])(
		'falls back to page 1 for ?page=%s and cleans URL',
		async (badPage) => {
			(page.url as SvelteURL).href = `http://localhost/articles?q=post&page=${badPage}`;
			render(PaginatedArticleList, { posts: createPosts(25) });

			await waitFor(() => {
				expect(screen.getByText('Post 0')).toBeInTheDocument();
			});

			expect(goto).toHaveBeenCalledTimes(1);
			const [url, options] = vi.mocked(goto).mock.calls[0] as [
				URL,
				{ replace?: boolean; reset?: boolean }
			];
			expect(url.searchParams.has('page')).toBe(false);
			expect(url.searchParams.get('q')).toBe('post');
			expect(options).toEqual({ replace: true, reset: false });
		}
	);

	it('resets to page 1 and clears ?page when posts prop changes (e.g. category filter change)', async () => {
		(page.url as SvelteURL).href = 'http://localhost/articles?page=2';
		const reactiveProps = new SvelteMap<'posts', MarkdownPostMetadataAndSlug[]>([
			['posts', createPosts(25, 'Tech')]
		]);
		render(PaginatedArticleList, {
			get posts() {
				return reactiveProps.get('posts')!;
			}
		});

		await waitFor(() => {
			expect(screen.getByText('Tech 10')).toBeInTheDocument();
		});

		reactiveProps.set('posts', createPosts(15, 'Cuisine'));
		await tick();

		await waitFor(() => {
			expect(screen.getByText('Cuisine 0')).toBeInTheDocument();
		});
		expect(goto).toHaveBeenCalled();
		const [url, options] = vi.mocked(goto).mock.calls[0] as [
			URL,
			{ replace?: boolean; reset?: boolean }
		];
		expect(url.searchParams.has('page')).toBe(false);
		expect(options).toEqual({ replace: true, reset: false });
	});

	it('resets to page 1 and clears ?page when searching from a paginated page', async () => {
		(page.url as SvelteURL).href = 'http://localhost/articles?page=2';
		render(PaginatedArticleList, { posts: createPosts(25) });

		await waitFor(() => {
			expect(screen.getByText('Post 10')).toBeInTheDocument();
		});

		const searchInput = screen.getAllByLabelText('Search articles')[0];
		await fireEvent.input(searchInput, { target: { value: 'Post 1' } });

		// Immediately resets rendered list to page 1 of filtered results
		await waitFor(() => {
			expect(screen.getByText('Post 1')).toBeInTheDocument();
		});

		// After debounce, URL updates with q and removes page
		await waitFor(
			() => {
				expect(goto).toHaveBeenCalled();
				const [url, options] = vi.mocked(goto).mock.calls[0] as [
					URL,
					{ replace?: boolean; reset?: boolean }
				];
				expect(url.searchParams.get('q')).toBe('Post 1');
				expect(url.searchParams.has('page')).toBe(false);
				expect(options).toEqual({ replace: true, reset: false });
			},
			{ timeout: 1000 }
		);
	});

	it('does not read searchParams or call goto when browser is false (prerendering)', async () => {
		mockState.browser = false;
		expect(appEnv.browser).toBe(false);
		const spy = vi.spyOn(page.url, 'searchParams', 'get');

		render(PaginatedArticleList, { posts: createPosts(25) });
		await tick();

		expect(spy).not.toHaveBeenCalled();
		expect(goto).not.toHaveBeenCalled();
		expect(screen.getByText('Post 0')).toBeInTheDocument();
	});
});
