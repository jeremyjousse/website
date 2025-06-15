<script>
	import { base } from '$app/paths';
	import IconLink from '../atoms/IconLink.svelte';
	import Github from '../svg/Github.svelte';
	import NavItem from './NavItem.svelte';
</script>

<nav class="mx-auto flex h-24 max-w-5xl items-center justify-between px-4">
	<div class="flex items-center space-x-1">
		<NavItem href={`${base}/`} target="_self">Accueil</NavItem>
	</div>
	<div class="flex items-center space-x-1">
		<ul class="m-0 flex list-none gap-4">
			<li>
				<NavItem href={`${base}/articles`} target="_self">Articles</NavItem>
			</li>
			<li>
				<NavItem href={`${base}/apropos`} target="_self">À propos</NavItem>
			</li>
			<li>
				<IconLink href="https://github.com/jeremyjousse/website" target="_blank"
					><Github class="h-8 w-8 fill-white" /></IconLink
				>
			</li>
		</ul>
	</div>
</nav>
