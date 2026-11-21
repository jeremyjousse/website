/**
 * Parses and validates the `page` query parameter against total available pages.
 * Falls back to page 1 for missing, non-numeric, non-positive, or out-of-range values.
 */
export function parsePageParam(rawPage: string | null, totalPages: number): number {
	if (!rawPage || !/^\d+$/.test(rawPage)) {
		return 1;
	}

	const parsed = Number.parseInt(rawPage, 10);
	if (parsed < 1 || parsed > totalPages) {
		return 1;
	}

	return parsed;
}

/**
 * Returns a new URL with `page` updated, omitting `page` when on page 1
 * while preserving all other query parameters (such as `q`).
 */
export function buildPaginatedUrl(currentUrl: URL | Pick<URL, 'href'>, pageNumber: number): URL {
	const url = new URL(currentUrl.href);

	if (pageNumber > 1) {
		url.searchParams.set('page', String(pageNumber));
	} else {
		url.searchParams.delete('page');
	}

	return url;
}
