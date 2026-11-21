import { describe, expect, it } from 'vitest';

import { buildPaginatedUrl, parsePageParam } from './pagination';

describe('parsePageParam', () => {
	it('returns 1 when page param is missing or empty', () => {
		expect(parsePageParam(null, 5)).toBe(1);
		expect(parsePageParam('', 5)).toBe(1);
	});

	it('returns parsed page when valid and within totalPages', () => {
		expect(parsePageParam('1', 5)).toBe(1);
		expect(parsePageParam('2', 5)).toBe(2);
		expect(parsePageParam('5', 5)).toBe(5);
		expect(parsePageParam('02', 5)).toBe(2);
	});

	it('falls back to 1 for non-numeric, zero, or negative values', () => {
		expect(parsePageParam('0', 5)).toBe(1);
		expect(parsePageParam('-1', 5)).toBe(1);
		expect(parsePageParam('abc', 5)).toBe(1);
		expect(parsePageParam('2abc', 5)).toBe(1);
		expect(parsePageParam('1.5', 5)).toBe(1);
	});

	it('falls back to 1 when page exceeds totalPages or totalPages is 0', () => {
		expect(parsePageParam('6', 5)).toBe(1);
		expect(parsePageParam('999', 3)).toBe(1);
		expect(parsePageParam('2', 0)).toBe(1);
	});
});

describe('buildPaginatedUrl', () => {
	it('sets page query param when page > 1 and preserves existing params', () => {
		const url = buildPaginatedUrl(new URL('http://localhost/articles?q=svelte'), 2);
		expect(url.searchParams.get('page')).toBe('2');
		expect(url.searchParams.get('q')).toBe('svelte');
	});

	it('omits page query param when page is 1 while preserving existing params', () => {
		const url = buildPaginatedUrl(new URL('http://localhost/articles?q=svelte&page=3'), 1);
		expect(url.searchParams.has('page')).toBe(false);
		expect(url.searchParams.get('q')).toBe('svelte');
	});
});
