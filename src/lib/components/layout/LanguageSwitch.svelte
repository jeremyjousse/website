<script lang="ts">
  import { base } from "$app/paths";
  import { locale, setLocale } from "$lib/i18n/i18n-svelte";
  import { locales } from "$lib/i18n/i18n-util";

  import type { Locales } from "$lib/i18n/i18n-types";
  import { loadLocaleAsync } from "$lib/i18n/i18n-util.async";
  import { replaceLocaleInUrl } from "$lib/utils/language";
  import { goto, invalidateAll } from "$app/navigation";

  const switchLocale = async (
    newLocale: Locales,
    updateHistoryState = true
  ) => {
    if (!newLocale || $locale === newLocale) return;

    // load new dictionary from server
    await loadLocaleAsync(newLocale);

    // select locale
    setLocale(newLocale);

    // if (updateHistoryState) {
    //   // update url to reflect locale changes
    //   history.pushState(
    //     { locale: newLocale },
    //     "",
    //     `${base}/newLocale`
    //     // replaceLocaleInUrl($page.url, newLocale)
    //   );
    // }

    await goto(`${base}/${newLocale}`);

    // run the `load` function again
    invalidateAll();
  };
</script>

{#each locales as localeValue}
  {#if localeValue != $locale}
    <button
      class:active={localeValue === $locale}
      on:click={() => switchLocale(localeValue)}
      on:keypress={() => switchLocale(localeValue)}
    >
      {localeValue}</button
    >
  {/if}
{/each}
