import type { Load } from "@sveltejs/kit";
import type { MarkdownPostMetadataAndSlug } from "$lib/types/markdownPost";

export const load: Load = async ({ fetch, params }) => {
  const { category } = params;
  const response = await fetch("/api/posts");
  const allPosts = await response.json();

  const posts: MarkdownPostMetadataAndSlug[] = allPosts.filter(
    (post: MarkdownPostMetadataAndSlug) => post.metadata.category === category
  );

  return {
    category,
    posts,
  };
};
