/**
 * Returns the WP URL based on the env var
 *
 * @returns
 */
export function getWPUrl() {
	return process.env.NEXT_PUBLIC_HEADLESS_WP_URL || '';
}
