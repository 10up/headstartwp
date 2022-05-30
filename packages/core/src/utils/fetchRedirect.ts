import { getWPUrl } from './getHeadlessConfig';

type RedirectData = {
	/**
	 * The redirect new locaton
	 *
	 * will be null if no redirect is found
	 */
	location: string | undefined | null;

	/**
	 * The status number of the redorect
	 *
	 * Will be 0 if the redirect is not found
	 */
	status: number;
};

/**
 * Fetches a redirect from the WordPress origin by making a HEAD request and checking the response
 *
 * @param pathname The path to the page to fetch the redirect for
 *
 * @returns The redirect data
 */
export async function fetchRedirect(pathname: string): Promise<RedirectData> {
	const wpURL = getWPUrl().replace(/\/$/, '');
	// Remove the trailing slash before concatenating the link
	const redirectionURL = `${wpURL + pathname.replace(/\/$/, '')}/`;

	const response = await fetch(redirectionURL, {
		method: 'HEAD',
		redirect: 'manual',
	});

	if (
		response.status === 301 ||
		response.status === 302 ||
		response.status === 307 ||
		response.status === 308
	) {
		const location = response.headers.get('location') || '';

		try {
			const url = new URL(location);

			return {
				location: url.pathname,
				status: response.status,
			};
		} catch (e) {
			return { location: null, status: 0 };
		}
	}

	return { location: null, status: 0 };
}
