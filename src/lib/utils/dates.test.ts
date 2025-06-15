import { describe, expect, it } from 'vitest';

import { formatPublishedAt } from './dates';

describe('formatPublishedAt', () => {
	it('2023-01-31 returns 31 janvier 2023', () => {
		expect(formatPublishedAt('2023-01-31')).eq('31 janvier 2023');
	});
});
