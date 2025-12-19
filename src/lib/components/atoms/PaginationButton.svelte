<script lang="ts">
	export let active: boolean = false;
	export let disabled: boolean = false;
	export let ariaLabel: string;
	export let testid: string | undefined = undefined;
</script>

<button
	on:click
	{disabled}
	class="rounded-lg px-3 py-2 text-sm font-medium transition-colors
        {active
		? 'bg-blue-600 text-white dark:bg-blue-700'
		: disabled
			? 'cursor-not-allowed text-gray-400 dark:text-gray-600'
			: 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'}"
	aria-label={ariaLabel}
	aria-current={active ? 'page' : undefined}
	data-testid={testid}
>
	<slot />
</button>
