import type { MarkdownPostMetadataAndSlug } from "$lib/types";
import type { PageLoad } from "./$types";
import { base } from "$app/paths";

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(`${base}/api/${params.language}/posts`);

  // get posts from response
  const posts: MarkdownPostMetadataAndSlug[] = await response.json();

  return {
    posts,
  };
};
