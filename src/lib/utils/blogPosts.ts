import type { MarkdownPostMetadataAndSlug } from "$lib/types/markdownPost";

export function filterBlogPosts(
  metaAndSlug: MarkdownPostMetadataAndSlug
): boolean {
  return metaAndSlug.metadata.draft != true;
}
