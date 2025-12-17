// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	var gtag: any;
	namespace App {
		// interface Error {}
		interface Locals {
			locale: Locales;
			LL: TranslationFunctions;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
