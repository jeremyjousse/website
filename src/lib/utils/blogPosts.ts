import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';

/**
 * Return blogs post displayable status (boolean)
 * In development status it allows to display draft posts
 * @param metaAndSlug blog post meta and slug
 * @returns true if the blog post is displayable
 */
export function filterBlogPosts(metaAndSlug: MarkdownPostMetadataAndSlug): boolean {
	return (
		process.env.NODE_ENV === 'development' ||
		metaAndSlug.metadata.draft === undefined ||
		metaAndSlug.metadata.draft === false
	);
}
