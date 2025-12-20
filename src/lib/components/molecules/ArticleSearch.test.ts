import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';

import ArticleSearch from './ArticleSearch.svelte';
import { ArticleState } from '$lib/components/context/article.svelte';
import { goto } from '$app/navigation';

// Mock dependencies
vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

vi.mock('$app/stores', async () => {
	const { readable } = await import('svelte/store');
	return {
		page: readable({
			url: new URL('http://localhost')
		})
	};
});

vi.mock('$app/environment', () => ({
	browser: true
}));

// Create a shared state instance for testing
const mockArticleState = new ArticleState();

// Mock the context module
vi.mock('$lib/components/context/article.svelte', async () => {
	const actual = await vi.importActual('$lib/components/context/article.svelte');
	return {
		...actual,
		getArticleState: () => mockArticleState
	};
});

describe('ArticleSearch', () => {
	beforeEach(() => {
		mockArticleState.searchQuery = '';
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
});
