import '@testing-library/jest-dom';

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import IconLink from './IconLink.svelte';

describe('IconLink', () => {
	it('renders hello into the document', () => {
		const href = 'https://github.com/jeremyjousse';
		render(IconLink, {
			props: {
				href,
				target: '_blank'
			}
		});

		expect(screen.getByRole('link')).toHaveAttribute('href', href);
	});
});
