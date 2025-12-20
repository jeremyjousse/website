<script lang="ts">
	import PaginationButton from '../atoms/PaginationButton.svelte';

	export let currentPage: number;
	export let totalPages: number;
	export let onPageChange: (page: number) => void;

	$: pages = getPageNumbers(currentPage, totalPages);

	function getPageNumbers(current: number, total: number): (number | string)[] {
		if (total <= 7) {
			return Array.from({ length: total }, (_, i) => i + 1);
		}

		const pages: (number | string)[] = [];

		// Always show first page
		pages.push(1);

		if (current > 3) {
			pages.push('...');
		}

		// Show pages around current
		const start = Math.max(2, current - 1);
		const end = Math.min(total - 1, current + 1);

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		if (current < total - 2) {
			pages.push('...');
		}

		// Always show last page
		if (total > 1) {
			pages.push(total);
		}

		return pages;
	}

	function handleClick(page: number | string) {
		if (typeof page === 'number') {
			onPageChange(page);
		}
	}

	function handlePrevious() {
		if (currentPage > 1) {
			onPageChange(currentPage - 1);
		}
	}

	function handleNext() {
		if (currentPage < totalPages) {
			onPageChange(currentPage + 1);
		}
	}
</script>

{#if totalPages > 1}
	<nav
		class="flex items-center justify-center gap-2 py-4"
		aria-label="Pagination"
		data-testid="pagination"
	>
		<!-- Previous Button -->
		<PaginationButton
			on:click={handlePrevious}
			disabled={currentPage === 1}
			ariaLabel="Page précédente"
			testid="pagination-previous"
		>
			<span class="sr-only">Précédent</span>
			<svg
				class="h-5 w-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</PaginationButton>

		<!-- Page Numbers -->
		{#each pages as page}
			{#if typeof page === 'number'}
				<PaginationButton
					on:click={() => handleClick(page)}
					active={currentPage === page}
					ariaLabel="Page {page}"
					testid="pagination-page-{page}"
				>
					{page}
				</PaginationButton>
			{:else}
				<span class="px-2 text-gray-500 dark:text-gray-400">...</span>
			{/if}
		{/each}

		<!-- Next Button -->
		<PaginationButton
			on:click={handleNext}
			disabled={currentPage === totalPages}
			ariaLabel="Page suivante"
			testid="pagination-next"
		>
			<span class="sr-only">Suivant</span>
			<svg
				class="h-5 w-5"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</PaginationButton>
	</nav>
{/if}
