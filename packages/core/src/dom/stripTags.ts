/**
 * Utility functions to strip any tags
 *
 * @param html The html string
 *
 * @returns
 */
export function stripTags(html) {
	return html.replace(/(<([^>]+)>)/gi, '');
}
