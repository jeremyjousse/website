import type { MarkdownPost } from '#lib/types/markdownPost.js';
import { resolve } from '$app/paths';

export const load = async ({ fetch }) => {
	console.log('[DEBUG] Fetching posts from:', resolve(`api/posts`));
	try {
		const response = await fetch(resolve(`api/posts`));
		console.log('[DEBUG] Response status:', response.status);
		if (!response.ok) {
			throw new Error('Failed to fetch blog articles');
		}

		const articles = (await response.json()) as MarkdownPost[];
		const categories = Array.from(
			new Set(articles.flatMap((article) => article.metadata.category))
		);

		return { categories };
	} catch (e) {
		console.error('[DEBUG] Fetch error:', e);
		throw e;
	}
};
