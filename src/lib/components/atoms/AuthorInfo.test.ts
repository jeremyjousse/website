import '@testing-library/jest-dom';

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import AuthorInfo from './AuthorInfo.svelte';

describe('AuthorInfo', () => {
	it('does not display when no author is passed', () => {
		render(AuthorInfo);

		const authorImage = screen.queryByTestId('author-image');

		expect(authorImage).toBeNull();
	});

	it('displays the author with author props', () => {
		render(AuthorInfo, {
			props: {
				author: 'jeremy-jousse'
			}
		});

		const authorImage = screen.queryByTestId('author-image');
		expect(authorImage).toBeDefined();
	});

	it('displays the author with default size', () => {
		render(AuthorInfo, {
			props: {
				author: 'jeremy-jousse'
			}
		});

		const authorImage = screen.queryByTestId('author-image-container');
		expect(authorImage).toHaveClass('w-20', 'h-20');
	});

	it('displays the author with s size', () => {
		render(AuthorInfo, {
			props: {
				author: 'jeremy-jousse',
				size: 's'
			}
		});

		const authorImage = screen.queryByTestId('author-image-container');
		expect(authorImage).toHaveClass('w-20', 'h-20');
	});

	it('displays the author with m size', () => {
		render(AuthorInfo, {
			props: {
				author: 'jeremy-jousse',
				size: 'm'
			}
		});

		const authorImage = screen.queryByTestId('author-image-container');
		expect(authorImage).toHaveClass('w-40', 'h-40');
	});
});
