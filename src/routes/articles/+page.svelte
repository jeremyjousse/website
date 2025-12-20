<script lang="ts">
	import PaginatedArticleList from '$lib/components/blocks/article/PaginatedArticleList.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Articles du blog de Jérémy Jousse</title>
</svelte:head>

<PaginatedArticleList posts={data.posts} />
