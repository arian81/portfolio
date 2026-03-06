function formatDate(date: string): string {
	if (date === 'Present') return 'Present';
	return date.split('-')[0];
}

// Since I want to share the data between resume and website, I need to convert from yaml format (yyyy-mm) to website format (yyyy)
export function formatDateRange(startDate: string, endDate: string): string {
	const start = formatDate(startDate);
	const end = formatDate(endDate);
	if (start === end) return start;
	return `${start} - ${end}`;
}
