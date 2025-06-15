<script lang="ts">
	export let href: string;
	export let target: '_self' | '_blank' = '_self';
</script>

<a {href} {target} class="h-8 rounded-lg p-2 text-inherit text-white no-underline hover:bg-gray-600"
	><slot /></a
>
