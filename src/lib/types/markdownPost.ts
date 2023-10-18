import type { ComponentType } from "svelte";

export type MarkdownPost = {
  metadata: {
    category: string;
    subCategory: string;
    tags: string[];
    title: string;
    coverImageSlug: string;
    publishedAt: string;
    updatedAt?: string;
    summary: string;
  };
  default: ComponentType;
};

export type MarkdownPostMetadataAndSlug = {
  slug: string;
  metadata: MarkdownPost["metadata"];
};
