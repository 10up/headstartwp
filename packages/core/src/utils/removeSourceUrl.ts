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

	/**
	 * If the removal of source url from link leads to a empty string,
	 * this setting control whether a '/' should be returned or the empty string
	 */
	nonEmptyLink?: boolean;
};

/**
 * Make the link relative if it belongs to the backend, to force client-side
 * navigation.
 *
 * Inspired on the Frontity implementation
 *
 * @see https://github.com/frontity/frontity/blob/dev/packages/components/link/utils.ts
 *
 * @param props.link The link that might contain the sourceUrl
 * @param props.backendUrl The source url
 * @param props.publicUrl The public url
 * @param props.nonEmptyLinks If the removal of source url from link leads to a empty string,
 * this setting control whether a '/' should be returned or the empty string
 *
 * @returns The URL without the Source URL.
 */
export function removeSourceUrl({
	link: originalLink,
	backendUrl,
	publicUrl = '/',
	nonEmptyLink = true,
}: removeSourceUrlType) {
	if (typeof originalLink === 'undefined') {
		warn('link is undefined, double check if you are passing a valid value');
		return '';
	}

	if (typeof backendUrl === 'undefined') {
		warn('backendUrl is undefined, double check if you are passing a valid value');
		return originalLink;
	}

	// Ensure `sourceUrl` and `publicUrl` always include a trailing slash. All
	// the logic below is based on those variables fulfilling that condition.
	const sourceUrl = backendUrl.replace(/\/?$/, '/');
	const appUrl = publicUrl.replace(/\/?$/, '/');

	if (sourceUrl === '/' || originalLink.startsWith('#')) {
		return originalLink;
	}

	const { host: sourceHost, pathname: sourcePath } = new URL(sourceUrl);
	const { pathname: appPath } = new URL(appUrl, sourceUrl);

	// we need to know if the original link has trailing slash or not
	const hasTrailingSlash = /\/$/.test(originalLink);
	const link = !hasTrailingSlash ? `${originalLink}/` : originalLink;
	const linkUrl = new URL(link, sourceUrl);

	// Compare just the host and the pathname. This way we ignore the protocol if
	// it doesn't match.
	if (linkUrl.host === sourceHost && linkUrl.pathname.startsWith(sourcePath)) {
		let transformedLink =
			linkUrl.pathname.replace(sourcePath, appPath) + linkUrl.search + linkUrl.hash;

		transformedLink = hasTrailingSlash ? transformedLink : transformedLink.replace(/\/?$/, '');

		if (nonEmptyLink && transformedLink === '') {
			return '/';
		}

		return transformedLink;
	}

	// Do not change the link for other cases.
	return originalLink;
}
