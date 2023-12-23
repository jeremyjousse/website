<script lang="ts">
  export let src: string;
  export let alt: string;
  export let klass: string;

  if (src.includes("unsplash:")) {
    const slug = src.replace("unsplash:", "");
    src = `https://source.unsplash.com/${slug}/640x360`;
  } else if (src.includes("pexels:")) {
    const slug = src.replace("pexels:", "");
    src = `https://images.pexels.com/photos/${slug}/pexels-photo-${slug}/free-photo-of-.jpeg`;
  }
</script>

<img {src} {alt} class="{klass} inline p-1" />
