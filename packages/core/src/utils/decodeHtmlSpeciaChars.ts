/**
 * Decodes HTML special chars entities
 *
 * @param text The text we want to decode
 *
 * @returns text with decoded html entities
 */
export function decodeHtmlSpeciaChars(text: string) {
	if (!text) {
		return '';
	}

	return text
		.replace(/&#8217;/g, '’')
		.replace(/&#038;/g, '&')
		.replace(/&#8220;/g, '“')
		.replace(/&#8221;/g, '”')
		.replace(/&#8211;/g, '–')
		.replace(/&#8230;/g, '…')
		.replace(/&quot;/g, '"')
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');
}
