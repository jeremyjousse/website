<script lang="ts">
  import CopyCodeButton from "$lib/components/atoms/CopyCodeButton.svelte";
  import { onMount } from "svelte";

  onMount(() => {
    const preTags: HTMLCollectionOf<HTMLPreElement> =
      document.getElementsByTagName("pre");
    for (let preTag of preTags) {
      const classList = Array.from(preTag.classList);
      const isCodeBlock = classList.some((className) =>
        className.startsWith("language-")
      );

      if (isCodeBlock) {
        const preTagParent = preTag.parentNode;
        const newBlockCodeWrapper = document.createElement("div");
        newBlockCodeWrapper.className = "relative";
        new CopyCodeButton({ target: newBlockCodeWrapper });

        if (preTagParent) {
          preTagParent.replaceChild(newBlockCodeWrapper, preTag);
          newBlockCodeWrapper.appendChild(preTag);
        }
      }
    }
  });
</script>

<slot />
