import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/svelte';
import ArticleSearch from './ArticleSearch.svelte';
import { articleStore } from '$lib/stores/articleStore.svelte';
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

describe('ArticleSearch', () => {
	beforeEach(() => {
		articleStore.searchQuery = '';
		vi.clearAllMocks();
	});

	it('updates store and calls goto when typing', async () => {
		render(ArticleSearch);
		const input = screen.getByPlaceholderText('Search articles...');

		await fireEvent.input(input, { target: { value: 'test' } });

		// Store should update immediately
		expect(articleStore.searchQuery).toBe('test');

		// goto should be called after debounce (300ms)
		await waitFor(() => {
			expect(goto).toHaveBeenCalled();
			const url = vi.mocked(goto).mock.calls[0][0] as URL;
			expect(url.searchParams.get('q')).toBe('test');
		}, { timeout: 1000 });
	});

	it('does not call goto immediately (debounced)', async () => {
		render(ArticleSearch);
		const input = screen.getByPlaceholderText('Search articles...');

		await fireEvent.input(input, { target: { value: 'a' } });
		expect(goto).not.toHaveBeenCalled();

		await fireEvent.input(input, { target: { value: 'ab' } });
		expect(goto).not.toHaveBeenCalled();

		// Wait for debounce
		await waitFor(() => {
			expect(goto).toHaveBeenCalledTimes(1);
			const url = vi.mocked(goto).mock.calls[0][0] as URL;
			expect(url.searchParams.get('q')).toBe('ab');
		}, { timeout: 1000 });
	});
});
