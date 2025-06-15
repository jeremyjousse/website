<script lang="ts">
	type Props = {
		slug: string;
	};
	const { slug }: Props = $props();
</script>

<a href={`/articles/${slug}`} class="">
	{slug}
</a>
