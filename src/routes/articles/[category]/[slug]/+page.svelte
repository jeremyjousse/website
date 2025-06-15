<script>
	import '$lib/styles/post.css';
	import ArticleEditorial from '$lib/components/pages/article/ArticleEditorial.svelte';

	export let data;
	const { metadata, post: Post } = data;
</script>

<svelte:head>
	<title>{metadata.title} - blog de Jérémy Jousse</title>
</svelte:head>

<article>
	<ArticleEditorial {metadata} />
	<div class="prose prose-lg prose-invert mb-10 px-4 py-4">
		<Post />
	</div>
</article>
