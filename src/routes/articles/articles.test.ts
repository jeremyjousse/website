import '@testing-library/jest-dom';

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Page from './+page.svelte';
import { onePost } from 'test-setup/mocks/blogPostsMock';

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
