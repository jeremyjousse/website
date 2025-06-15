import '@testing-library/jest-dom';

import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Footer from './Footer.svelte';

describe('Footer', () => {
	it('renders icon links', () => {
		const iconLinks = [
			'https://github.com/jeremyjousse',
			'https://www.linkedin.com/in/jeremy-jousse',
			'https://twitter.com/jeremy_jousse'
		];

		render(Footer);

		const links = screen.getAllByRole('link').map((link) => link.getAttribute('href'));

		for (const link of links) {
			expect(iconLinks).toContain(link);
		}
	});
});
