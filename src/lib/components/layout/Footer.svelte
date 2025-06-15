<script>
	import IconLink from '$lib/components/atoms/IconLink.svelte';
	import Github from '$lib/components/svg/Github.svelte';
	import Linkedin from '../svg/Linkedin.svelte';
	import X from '../svg/X.svelte';
</script>

<footer class="mx-auto mb-3 mt-3 max-w-5xl">
	<div class="text-center">Fait avec ❤️ et 💻 par Jérémy Jousse</div>
	<div class="flex items-center justify-center space-x-1 pt-4">
		<ul class="m-0 flex list-none gap-4">
			<li>
				<IconLink href="https://github.com/jeremyjousse" target="_blank" id="github-footer-link"
					><Github class="h-4 w-4 fill-white" /></IconLink
				>
			</li>
			<li>
				<IconLink
					id="linkedin-footer-link"
					href="https://www.linkedin.com/in/jeremy-jousse"
					target="_blank"><Linkedin class="h-4 w-4 fill-white" /></IconLink
				>
			</li>
			<li>
				<IconLink href="https://twitter.com/jeremy_jousse" target="_blank" id="x-footer-link"
					><X class="h-4 w-4 fill-white" /></IconLink
				>
			</li>
		</ul>
	</div>
</footer>
