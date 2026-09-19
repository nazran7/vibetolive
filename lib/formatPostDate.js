// Formats a post date as e.g. "August 27, 2026" (or "Aug 27, 2026" with month: 'short').
export function formatPostDate(date, month = 'long') {
	return new Date(date).toLocaleDateString('en-US', {
		month,
		day: '2-digit',
		year: 'numeric',
		timeZone: 'UTC',
	});
}
