// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	type Gtag = (...args: unknown[]) => void;
	var gtag: Gtag;

	}
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
