import type { MarkdownPostMetadataAndSlug } from "../src/types/markdownPost";

export const onePost: MarkdownPostMetadataAndSlug[] = [
  {
    slug: "post-1",
    metadata: {
      category: "category-1",
      subCategory: "sub-category-1",
      tags: ["tag-1", "tag-2"],
      title: "title-1",
      coverImageSlug: "title-1",
      publishedAt: "2023-01-01",
      updatedAt: "2023-02-01",
      summary: "summary-1",
    },
  },
];
