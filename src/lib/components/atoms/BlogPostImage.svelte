<script lang="ts">
  import type { BlogPostImageInfo } from "$lib/types/blogPostImageInfo";

  export let image: BlogPostImageInfo;

  let href: string;
  let src: string;

  if (image.url.includes("unsplash:")) {
    const slug = image.url.replace("unsplash:", "");
    href = `https://unsplash.com/fr/photos/${slug}`;
    src = `https://source.unsplash.com/${slug}/640x360`;
  } else if (image.url.includes("pexels:")) {
    // TODO crop
    // https://images.pexels.com/photos/5579177/pexels-photo-5579177.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=400&h=250&fit=crop&crop=focalpoint
    const slug = image.url.replace("pexels:", "");
    href = `https://www.pexels.com/fr-fr/photo/-${slug}`;
    src = `https://images.pexels.com/photos/${slug}/pexels-photo-${slug}/free-photo-of-.jpeg`;
  } else {
    href = src = image.url;
  }
</script>

<a {href} target="_blank">
  <img {src} alt={image.alt} class="sm:w-80 inline p-1" />
</a>
