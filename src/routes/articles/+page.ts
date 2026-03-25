import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';
import { base } from '$app/paths';

export const load = async ({ fetch }) => {
	const response = await fetch(`${base}/api/posts`);
	const posts = (await response.json()) as MarkdownPostMetadataAndSlug[];

	return {
		posts
	};
};
