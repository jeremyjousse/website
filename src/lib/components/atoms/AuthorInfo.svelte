<script lang="ts">
	import { asset } from '$app/paths';
	import type { AssetPath } from '$app/types';
	export let author: string | undefined = undefined;
	export let size: 'm' | 's' = 's';
</script>

{#if author}
	<div
		data-testid="author-image-container"
		class={`${size === 'm' ? 'h-40 w-40' : 'h-20 w-20'} overflow-hidden rounded-full`}
	>
		<img
			src={asset(`authors/${author}.jpeg` as AssetPath)}
			alt="Profile"
			class="object-cover"
			data-testid="author-image"
		/>
	</div>
{/if}
