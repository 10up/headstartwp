import { warn } from './errors';

export type removeSourceUrlType = {
	/**
	 * The link url, possibly with the source url.
	 */
	link: string;

	/**
	 * The backend url.
	 */
	backendUrl: string;

	/**
	 * The public url. Defaults to '/'.
	 */
	publicUrl?: string;
};

/**
 * Make the link relative if it belongs to the backend, to force client-side
 * navigation.
 *
 * Inspired on the Frontity implementation
 *
 * @see https://github.com/frontity/frontity/blob/dev/packages/components/link/utils.ts
 *
 * @returns The URL without the Source URL.
 */
export function removeSourceUrl({ link, backendUrl, publicUrl = '/' }: removeSourceUrlType) {
	if (typeof link === 'undefined') {
		warn('link is undefined, double check if you are passing a valid value');
		return '';
	}

	if (typeof backendUrl === 'undefined') {
		warn('backendUrl is undefined, double check if you are passing a valid value');
		return link;
	}

	// Ensure `sourceUrl` and `publicUrl` always include a trailing slash. All
	// the logic below is based on those variables fulfilling that condition.
	const sourceUrl = backendUrl.replace(/\/?$/, '/');
	const appUrl = publicUrl.replace(/\/?$/, '/');

	if (link.startsWith('#')) {
		return link;
	}

	const { host: sourceHost, pathname: sourcePath } = new URL(sourceUrl);
	const { pathname: appPath } = new URL(appUrl, sourceUrl);

	const linkUrl = new URL(link, sourceUrl);

	// Compare just the host and the pathname. This way we ignore the protocol if
	// it doesn't match.
	if (linkUrl.host === sourceHost && linkUrl.pathname.startsWith(sourcePath)) {
		return linkUrl.pathname.replace(sourcePath, appPath) + linkUrl.search + linkUrl.hash;
	}

	// Do not change the link for other cases.
	return link;
}
