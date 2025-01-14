<script lang="ts">
  export let src: string;
  export let alt: string;
  export let klass: string;

  if (src.includes("unsplash:")) {
    const slug = src.split(":").pop() || "";
    src = `https://images.unsplash.com/photo-${slug}?q=80&w=3387`;
  } else if (src.includes("pexels:")) {
    const slug = src.replace("pexels:", "");
    src = `https://images.pexels.com/photos/${slug}/pexels-photo-${slug}/free-photo-of-.jpeg`;
  } else if (src.includes("pinterest:")) {
    const slug = src.replace("pinterest:", "");
    src = `https://i.pinimg.com/1200x/${slug}.jpg`;
  }
</script>

<img {src} {alt} class="{klass} inline p-1" />
