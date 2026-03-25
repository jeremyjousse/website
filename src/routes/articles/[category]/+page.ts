import type { Load } from '@sveltejs/kit';
import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';
import { base } from '$app/paths';

export const load: Load = async ({ fetch, params }) => {
	const { category } = params;
	const response = await fetch(`${base}/api/posts`);
	const allPosts = await response.json();

	const posts: MarkdownPostMetadataAndSlug[] = allPosts.filter(
		(post: MarkdownPostMetadataAndSlug) => post.metadata.category === category
	);

	return {
		category,
		posts
	};
};
