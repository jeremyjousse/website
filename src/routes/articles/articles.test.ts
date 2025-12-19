import '@testing-library/jest-dom';

import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Page from './+page.svelte';
import { onePost } from 'test-setup/mocks/blogPostsMock';

vi.mock('$app/stores', async () => {
	const { readable } = await import('svelte/store');
	return {
		page: readable({
			url: new URL('http://localhost')
		})
	};
});

vi.mock('$app/navigation', () => ({
	goto: vi.fn()
}));

describe('articles', () => {
	it('displays the right number of articles', () => {
		render(Page, {
			data: {
				posts: onePost,
				categories: []
			}
		});

		expect(screen.queryByText('title-1')).toBeVisible();
	});
});
