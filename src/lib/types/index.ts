import type { ComponentType } from "svelte";

export type MarkdownPost = {
  metadata: {
    category: string;
    title: string;
    imgUrl: string;
    youtubeId?: string;
    publishedAt: string;
    summary: string;
  };
  default: ComponentType;
};

export type MarkdownPostMetadataAndSlug = {
  slug: string;
  metadata: MarkdownPost["metadata"];
};
