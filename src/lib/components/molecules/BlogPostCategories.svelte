<script lang="ts">
	import BlogPostCategory from '../atoms/BlogPostCategory.svelte';

	type Props = {
		categories: string[];
	};
	const { categories }: Props = $props();
</script>

{#if categories.length > 0}
	<div class="flex flex-wrap gap-2">
		{#each categories as category (category)}
			<BlogPostCategory slug={category} />
		{/each}
	</div>
{/if}
