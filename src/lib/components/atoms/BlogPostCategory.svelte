<script lang="ts">
	import { base } from '$app/paths';
	type Props = {
		slug: string;
	};
	const { slug }: Props = $props();
</script>

<a href={`${base}/articles/${slug}`} class="">
	{slug}
</a>
