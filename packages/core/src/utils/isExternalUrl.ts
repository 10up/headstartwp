/**
 * Checks if the provided link is an external Url.
 *
 * @param link - The link Url.
 *
 * Inspired on the Frontity implementation @see https://github.com/frontity/frontity/blob/dev/packages/components/link/utils.ts
 *
 * @returns True if the link is an external Url.
 */
export function isExternalUrl(link: string) {
	try {
		new URL(link); // eslint-disable-line no-new
		return true;
	} catch (e) {
		return false;
	}
}
