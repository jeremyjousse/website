<script lang="ts">
	import BlogPostCategories from 'lib/components/molecules/BlogPostCategories.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<div><BlogPostCategories categories={data.categories} /></div>
{@render children?.()}
