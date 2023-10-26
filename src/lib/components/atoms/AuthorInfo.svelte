<script lang="ts">
  import { base } from "$app/paths";
  export let author: string | undefined = undefined;
  export let size: "m" | "s" = "s";
</script>

{#if author}
  <div
    data-testid="author-image-container"
    class={`${
      size === "m" ? "w-40 h-40" : "w-20 h-20"
    } rounded-full overflow-hidden`}
  >
    <img
      src="{base}/authors/{author}.jpeg"
      alt="Profile"
      class="object-cover"
      data-testid="author-image"
    />
  </div>
{/if}
