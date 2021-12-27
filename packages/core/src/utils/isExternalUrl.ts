/**
 * Checks if the provided link is an external Url.
 *
 * @param link - The link Url.
 *
 * @returns True if the link is an external Url.
 */
export function isExternalUrl(link: string) {
	try {
		new URL(link);
		return true;
	} catch (e) {
		return false;
	}
}
