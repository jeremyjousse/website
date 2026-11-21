import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';

import ArticleSearch from './ArticleSearch.svelte';
import { ArticleState } from '#lib/components/context/article.svelte.js';
import { goto } from '$app/navigation';
import { page } from '$app/state';

// Mock dependencies
vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

vi.mock('$app/state', () => ({
	page: {
		url: new URL('http://localhost')
	}
}));

vi.mock('$app/env', () => ({
	browser: true
}));

// Create a shared state instance for testing
const mockArticleState = new ArticleState();

// Mock the context module
vi.mock('#lib/components/context/article.svelte.js', async () => {
	const actual = await vi.importActual('#lib/components/context/article.svelte.js');
	return {
		...actual,
		getArticleState: () => mockArticleState
	};
});

describe('ArticleSearch', () => {
	beforeEach(() => {
		mockArticleState.searchQuery = '';
		page.url = new URL('http://localhost');
		vi.clearAllMocks();
	});

	it('updates store and calls goto when typing', async () => {
		render(ArticleSearch);
		const input = screen.getByPlaceholderText('Search articles...');

		await fireEvent.input(input, { target: { value: 'test' } });

		// Store should update immediately
		expect(mockArticleState.searchQuery).toBe('test');

		// goto should be called after debounce (300ms)
		await waitFor(
			() => {
				expect(goto).toHaveBeenCalled();
				const url = vi.mocked(goto).mock.calls[0][0] as URL;
				expect(url.searchParams.get('q')).toBe('test');
			},
			{ timeout: 1000 }
		);
	});

	it('does not call goto immediately (debounced)', async () => {
		render(ArticleSearch);
		const input = screen.getByPlaceholderText('Search articles...');

		await fireEvent.input(input, { target: { value: 'a' } });
		expect(goto).not.toHaveBeenCalled();

		await fireEvent.input(input, { target: { value: 'ab' } });
		expect(goto).not.toHaveBeenCalled();

		// Wait for debounce
		await waitFor(
			() => {
				expect(goto).toHaveBeenCalledTimes(1);
			},
			{ timeout: 1000 }
		);
	});

	it('clears page param when search query changes', async () => {
		page.url = new URL('http://localhost/articles?page=2');
		render(ArticleSearch);
		const input = screen.getByPlaceholderText('Search articles...');

		await fireEvent.input(input, { target: { value: 'svelte' } });

		await waitFor(
			() => {
				expect(goto).toHaveBeenCalled();
				const [url, options] = vi.mocked(goto).mock.calls[0] as [
					URL,
					{ replace?: boolean; reset?: boolean }
				];
				expect(url.searchParams.get('q')).toBe('svelte');
				expect(url.searchParams.has('page')).toBe(false);
				expect(options).toEqual({ replace: true, reset: false });
			},
			{ timeout: 1000 }
		);
	});

	it('clears page param when search is edited and reverted within debounce window', async () => {
		page.url = new URL('http://localhost/articles?q=svelte&page=2');
		render(ArticleSearch);
		const input = screen.getByPlaceholderText('Search articles...');

		await fireEvent.input(input, { target: { value: 'sveltex' } });
		await fireEvent.input(input, { target: { value: 'svelte' } });

		await waitFor(
			() => {
				expect(goto).toHaveBeenCalledTimes(1);
				const [url, options] = vi.mocked(goto).mock.calls[0] as [
					URL,
					{ replace?: boolean; reset?: boolean }
				];
				expect(url.searchParams.get('q')).toBe('svelte');
				expect(url.searchParams.has('page')).toBe(false);
				expect(options).toEqual({ replace: true, reset: false });
			},
			{ timeout: 1000 }
		);
	});
});
