<script lang="ts">
  import { base } from "$app/paths";
  import DarkModeButton from "./DarkModeButton.svelte";
  import IconLink from "$lib/components/atoms/IconLink.svelte";
  import Github from "$lib/components/svg/Github.svelte";

  import Logo from "$lib/components/svg/Logo.svelte";
  import Youtube from "$lib/components/svg/Youtube.svelte";
  import LL from "$lib/i18n/i18n-svelte";
  import LanguageSwitch from "./LanguageSwitch.svelte";
</script>

<header
  class="fixed z-10 top-0 inset-x-0 border-b bg-white dark:bg-dark-background dark:border-gray-800"
>
  <nav class="flex items-center justify-between max-w-5xl mx-auto px-4 h24">
    <a href="{base}/"><Logo class="w-20 h-20" /></a>
    <div class="flex space-x-1 items-center">
      <LanguageSwitch />
      <DarkModeButton />
      <IconLink
        href="https://www.youtube.com/watch?v=cxNDZHwln1w"
        target="_blank"
      >
        <Youtube class="w-8 h-8 fill-current" />
      </IconLink>
      <IconLink href="https://github.com/jeremyjousse" target="_blank">
        <Github class="w-8 h-8 fill-current" />
      </IconLink>
    </div>
  </nav>
</header>
