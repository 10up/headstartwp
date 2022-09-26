import { isExternalUrl } from './isExternalUrl';
import { getWPUrl } from './getHeadlessConfig';
import { removeSourceUrl } from './removeSourceUrl';

/**
 * Checks if the url is for an internal link
 *
 * @param url The url to check
 *
 * @returns
 */
export function isInternalLink(url: string) {
	// TODO...
	const link = removeSourceUrl({ link: url, backendUrl: getWPUrl() });

	if (isExternalUrl(link)) {
		return false;
	}

	return true;
}
