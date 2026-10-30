<script lang="ts">
	import { resolve } from '$app/paths';

	type Props = { slug: string };

	const { slug }: Props = $props();
</script>

<a href={resolve(`articles/${slug}`)} class="">{slug}</a>
