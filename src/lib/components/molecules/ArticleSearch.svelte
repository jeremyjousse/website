<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { articleStore } from '$lib/stores/articleStore.svelte';

	let searchInput = $state<HTMLInputElement>();
	let mobileInput = $state<HTMLInputElement>();
	let isSearchActive = $state(false);
	let timer: ReturnType<typeof setTimeout>;
	let lastSyncedQuery: string | null = null;

	function updateUrl(query: string) {
		clearTimeout(timer);
		timer = setTimeout(() => {
			const url = new URL($page.url);
			const current = url.searchParams.get('q') || '';
			if (query === current) return;

			if (query) {
				url.searchParams.set('q', query);
			} else {
				url.searchParams.delete('q');
			}
			goto(url, { replaceState: true, keepFocus: true, noScroll: true });
		}, 300);
	}

	function toggleSearch() {
		isSearchActive = !isSearchActive;
		if (isSearchActive) {
			setTimeout(() => mobileInput?.focus(), 10);
		}
	}

	function closeSearch() {
		isSearchActive = false;
		articleStore.searchQuery = '';
	}

	function handleKeydown(event: KeyboardEvent) {
		if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
			event.preventDefault();
			if (window.innerWidth < 768) {
				isSearchActive = true;
				setTimeout(() => mobileInput?.focus(), 10);
			} else {
				searchInput?.focus();
			}
		}
		if (event.key === 'Escape') {
			if (isSearchActive) {
				isSearchActive = false;
				articleStore.searchQuery = '';
			} else if (articleStore.searchQuery) {
				articleStore.searchQuery = '';
				searchInput?.blur();
			}
		}
	}

	function syncFromUrl(q: string | null) {
		const val = q || '';
		if (val === lastSyncedQuery) return;
		lastSyncedQuery = val;

		if (val !== articleStore.searchQuery) {
			articleStore.searchQuery = val;
		}
	}

	$effect(() => {
		if (browser) syncFromUrl($page.url.searchParams.get('q'));
	});

	$effect(() => {
		if (browser) updateUrl(articleStore.searchQuery);
		return () => clearTimeout(timer);
	});
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="relative mb-4 flex justify-end px-4">
	<input
		bind:this={searchInput}
		type="text"
		bind:value={articleStore.searchQuery}
		placeholder="Search articles..."
		class="hidden rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none md:block dark:border-gray-700 dark:bg-gray-800 dark:text-white"
		aria-label="Search articles"
	/>
	<button
		class="p-2 text-gray-500 hover:text-gray-700 md:hidden dark:text-gray-400 dark:hover:text-gray-200"
		onclick={toggleSearch}
		aria-label="Toggle search"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
			/>
		</svg>
	</button>

	{#if isSearchActive}
		<div class="bg-dark-background absolute top-0 right-0 left-0 z-50 p-4 shadow-md md:hidden">
			<div class="flex items-center">
				<input
					bind:this={mobileInput}
					type="text"
					bind:value={articleStore.searchQuery}
					class="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
					placeholder="Search articles..."
					aria-label="Search articles"
				/>
				<button onclick={closeSearch} class="ml-4 text-gray-400 hover:text-gray-200">
					Cancel
				</button>
			</div>
		</div>
	{/if}
</div>
