import { isExternalUrl } from './isExternalUrl';
import { getWPUrl } from './getHeadlessConfig';
import { removeSourceUrl } from './removeSourceUrl';
import { HeadlessConfig } from '../types';

/**
 * Checks if the url is for an internal link
 *
 * @param url The url to check
 *
 * @returns
 */
export function isInternalLink(url: string, site?: HeadlessConfig) {
	const link = removeSourceUrl({
		link: url,
		backendUrl: site?.sourceUrl ?? getWPUrl(),
		publicUrl: site?.hostUrl ?? '/',
	});

	if (isExternalUrl(link)) {
		return false;
	}

	return true;
}
