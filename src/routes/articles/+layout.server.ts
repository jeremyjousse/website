import type { MarkdownPost } from 'lib/types/markdownPost';

export const load = async ({ fetch }) => {
	const response = await fetch('/api/posts');
	if (!response.ok) {
		throw new Error('Failed to fetch blog articles');
	}
	const articles = (await response.json()) as MarkdownPost[];

	const categories = Array.from(new Set(articles.flatMap((article) => article.metadata.category)));

	return { categories };
};
