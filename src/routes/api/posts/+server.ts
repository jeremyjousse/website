import type {
  MarkdownPost,
  MarkdownPostMetadataAndSlug,
} from "$lib/types/markdownPost";
import { json, type RequestHandler } from "@sveltejs/kit";

export const prerender = true;

console.log(process.env.NODE_ENV);

export const GET: RequestHandler = async () => {
  const markdownPostModules = import.meta.glob(
    "../../../content/articles/*/*.md"
  ) as Record<string, () => Promise<MarkdownPost>>;

  const postPromises: Promise<MarkdownPostMetadataAndSlug>[] = [];

  for (const path in markdownPostModules) {
    const loadMarkdownPostModule = markdownPostModules[path];

    const loadPostSlugAndMetadata = async function () {
      const markdownPostModule = await loadMarkdownPostModule();

      const slug = path.slice(path.lastIndexOf("/") + 1).replace(".md", "");

      return {
        slug,
        metadata: markdownPostModule.metadata,
      };
    };

    postPromises.push(loadPostSlugAndMetadata());
  }

  const posts = (await Promise.all(
    postPromises
  )) as MarkdownPostMetadataAndSlug;

  const nowDate = new Date();

  const sortedPosts = posts
    .filter(
      (post: MarkdownPostMetadataAndSlug) =>
        post.metadata.publishedAt <= nowDate.toISOString().substring(0, 10)
    )
    .sort(
      (
        post1: MarkdownPostMetadataAndSlug,
        post2: MarkdownPostMetadataAndSlug
      ) => {
        return (
          new Date(post2.metadata.publishedAt).getTime() -
          new Date(post1.metadata.publishedAt).getTime()
        );
      }
    );

  return json(sortedPosts);
};
