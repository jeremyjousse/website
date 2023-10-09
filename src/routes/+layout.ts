import type { LayoutLoad } from "./$types";
import { detectLocale } from "../lib/i18n/i18n-util";
import { loadLocaleAsync } from "../lib/i18n/i18n-util.async";
import { setLocale } from "../lib/i18n/i18n-svelte";

export const prerender = true;
export const ssr = false;

export const load: LayoutLoad = async (event) => {
  const language = detectLocale(() => [event.params.language ?? ""]);

  await loadLocaleAsync(language);
  setLocale(language);
  return event.data;
};
