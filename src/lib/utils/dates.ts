/**
 * Format data in long french format
 * @param date the date to format
 * @returns the formatted date in french format
 */
export function formatPublishedAt(date: string) {
	return new Date(date).toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
}
