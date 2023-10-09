import type { MarkdownPost, MarkdownPostMetadataAndSlug } from "$lib/types";
import { json, type RequestHandler } from "@sveltejs/kit";

export const prerender = true;

export const GET: RequestHandler = async ({ params }) => {
  let markdownPostModules;
  switch (params.language) {
    case "fr":
      markdownPostModules = import.meta.glob("/src/posts/fr/**") as Record<
        string,
        () => Promise<MarkdownPost>
      >;
      break;
    case "en":
      markdownPostModules = import.meta.glob("/src/posts/en/**") as Record<
        string,
        () => Promise<MarkdownPost>
      >;
      break;
  }

  // https://joshcollinsworth.com/blog/build-static-sveltekit-markdown-blog

  const postPromises: Promise<MarkdownPostMetadataAndSlug>[] = [];

  for (const path in markdownPostModules) {
    const loadMarkdownPostModule = markdownPostModules[path];

    const loadPostSlugAndMetadata = async function () {
      // dynamically import markdown post
      const markdownPostModule = await loadMarkdownPostModule();

      // slug is everything after last / without the file extension
      const slug = path.slice(path.lastIndexOf("/") + 1).replace(".md", "");

      return {
        slug,
        metadata: markdownPostModule.metadata,
      };
    };

    postPromises.push(loadPostSlugAndMetadata());
  }

  // load all posts concurrently
  const posts = await Promise.all(postPromises);

  // sort by publication date (descending/most recent first)
  const sortedPosts = posts.sort((post1, post2) => {
    return (
      new Date(post2.metadata.publishedAt).getTime() -
      new Date(post1.metadata.publishedAt).getTime()
    );
  });

  return json(sortedPosts);
};
