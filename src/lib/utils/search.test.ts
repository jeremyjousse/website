import { describe, expect, it } from 'vitest';

import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';
import { filterArticles } from './search';

describe('filterArticles', () => {
	const posts: MarkdownPostMetadataAndSlug[] = [
		{
			slug: 'post-1',
			metadata: {
				title: 'Svelte is awesome',
				summary: 'A post about Svelte framework',
				category: 'tech',
				categorySub: 'frameworks',
				coverImageSlug: 'svelte',
				publishedAt: '2023-01-01',
				tags: ['svelte', 'js']
			}
		},
		{
			slug: 'post-2',
			metadata: {
				title: 'Cooking Pasta',
				summary: 'Delicious pasta recipes',
				category: 'cuisine',
				categorySub: 'italian',
				coverImageSlug: 'pasta',
				publishedAt: '2023-01-02',
				tags: ['food']
			}
		},
		{
			slug: 'post-3',
			metadata: {
				title: 'Travel to Japan',
				summary: 'Tokyo and Kyoto guide',
				category: 'voyages',
				categorySub: 'asia',
				coverImageSlug: 'japan',
				publishedAt: '2023-01-03',
				tags: ['travel']
			}
		}
	];

	it('returns all posts when query is empty', () => {
		const results = filterArticles(posts, '');
		expect(results).toHaveLength(3);
	});

	it('filters by title (case insensitive)', () => {
		const results = filterArticles(posts, 'svelte');
		expect(results).toHaveLength(1);
		expect(results[0].metadata.title).toBe('Svelte is awesome');
	});

	it('filters by category', () => {
		const results = filterArticles(posts, 'cuisine');
		expect(results).toHaveLength(1);
		expect(results[0].metadata.title).toBe('Cooking Pasta');
	});

	it('filters by summary', () => {
		const results = filterArticles(posts, 'guide');
		expect(results).toHaveLength(1);
		expect(results[0].metadata.title).toBe('Travel to Japan');
	});

	it('returns empty array when no match found', () => {
		const results = filterArticles(posts, 'xyz');
		expect(results).toHaveLength(0);
	});
});
