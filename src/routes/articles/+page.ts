import type { MarkdownPostMetadataAndSlug } from '#lib/types/markdownPost.js';
import { resolve } from '$app/paths';

export const load = async ({ fetch }) => {
	const response = await fetch(resolve(`api/posts`));
	const posts = (await response.json()) as MarkdownPostMetadataAndSlug[];

	return {
		posts
	};
};
