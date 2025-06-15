import type { ComponentType } from 'svelte';

export type MarkdownPost = {
	metadata: {
		author?: string;
		category: string;
		categorySub: string;
		coverImageSlug: string;
		draft?: undefined | boolean;
		publishedAt: string;
		summary: string;
		tags: string[];
		title: string;
		updatedAt?: string;
	};
	default: ComponentType;
};

export type MarkdownPostMetadataAndSlug = {
	slug: string;
	metadata: MarkdownPost['metadata'];
};
