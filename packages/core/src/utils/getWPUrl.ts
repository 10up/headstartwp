import { getHeadlessConfig } from './getHeadlessConfig';

/**
 * Returns the WP URL based on the env var
 *
 * @returns
 */
export function getWPUrl() {
	const { sourceUrl } = getHeadlessConfig();
	return sourceUrl || '';
}
