<script lang="ts">
	export let src: string;
	export let alt: string;
	export let klass: string;

	let computedSrc = src;

	$: {
		if (src.includes('unsplash:')) {
			const slug = src.split(':').pop() || '';
			computedSrc = `https://images.unsplash.com/photo-${slug}?q=80&w=3387`;
		} else if (src.includes('pexels:')) {
			const slug = src.replace('pexels:', '');
			computedSrc = `https://images.pexels.com/photos/${slug}/pexels-photo-${slug}/free-photo-of-.jpeg`;
		} else if (src.includes('pinterest:')) {
			const slug = src.replace('pinterest:', '');
			computedSrc = `https://i.pinimg.com/1200x/${slug}.jpg`;
		} else {
			computedSrc = src;
		}
	}
</script>

<img src={computedSrc} {alt} class="{klass} inline p-1" />
