<script>
	import ArticleListing from '$lib/components/blocks/article/ArticleListing.svelte';

	export let data;
</script>

<svelte:head>
	<title>Articles {data.category} du blog de Jérémy Jousse</title>
</svelte:head>

<section class="divide-y dark:divide-gray-700">
	{#each data.posts as post (post.slug)}
		<ArticleListing {post} />
	{/each}
</section>
