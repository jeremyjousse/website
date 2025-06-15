import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';

export const load = async ({ fetch }) => {
	const response = await fetch('/api/posts');
	const posts = (await response.json()) as MarkdownPostMetadataAndSlug[];

	return {
		posts
	};
};
