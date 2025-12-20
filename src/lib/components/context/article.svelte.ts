import { getContext, setContext } from 'svelte';

import type { MarkdownPostMetadataAndSlug } from '$lib/types/markdownPost';
import { PAGINATION_CONFIG } from '$lib/config/pagination';
import { filterArticles } from '$lib/utils/search';

const ARTICLE_KEY = Symbol('ARTICLE');

export class ArticleState {
	private _posts = $state<MarkdownPostMetadataAndSlug[]>([]);
	private _searchQuery = $state('');
	private _itemsPerPage = $state<number>(PAGINATION_CONFIG.ITEMS_PER_PAGE);

	currentPage = $state(1);

	constructor() {}

	get posts() {
		return this._posts;
	}

	set posts(value: MarkdownPostMetadataAndSlug[]) {
		this._posts = value;
		this.currentPage = 1;
	}

	get searchQuery() {
		return this._searchQuery;
	}

	set searchQuery(value: string) {
		if (this._searchQuery === value) return;
		this._searchQuery = value;
		this.currentPage = 1;
	}

	get itemsPerPage() {
		return this._itemsPerPage;
	}

	set itemsPerPage(value: number) {
		if (this._itemsPerPage === value) return;
		this._itemsPerPage = value;
		this.currentPage = 1;
	}

	filteredPosts = $derived(filterArticles(this._posts, this._searchQuery));

	paginatedPosts = $derived.by(() => {
		const start = (this.currentPage - 1) * this.itemsPerPage;
		const end = start + this.itemsPerPage;
		return this.filteredPosts.slice(start, end);
	});

	totalPages = $derived(Math.ceil(this.filteredPosts.length / this.itemsPerPage));
}

export function setArticleState() {
	return setContext(ARTICLE_KEY, new ArticleState());
}

export function getArticleState() {
	return getContext<ArticleState>(ARTICLE_KEY);
}
