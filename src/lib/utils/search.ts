import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';

export function filterArticles(
	posts: MarkdownPostMetadataAndSlug[],
	query: string
): MarkdownPostMetadataAndSlug[] {
	if (!query) {
		return posts;
	}

	const lowerQuery = query.toLowerCase();

	return posts.filter((post) => {
		const title = post.metadata.title.toLowerCase();
		const category = post.metadata.category.toLowerCase();
		const summary = post.metadata.summary.toLowerCase();

		return (
			title.includes(lowerQuery) || category.includes(lowerQuery) || summary.includes(lowerQuery)
		);
	});
}
