import type { MarkdownPost } from "$lib/types/markdownPost";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params }) => {
  const markdownPost: MarkdownPost = await import(
    `../../../../content/posts/${params.category}/${params.slug}.md`
  );

  return {
    metadata: markdownPost.metadata,
    post: markdownPost.default,
  };
};
