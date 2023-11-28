import { getHeadlessConfig } from './config';
import { LOGTYPE, log } from './log';
import { removeSourceUrl } from './removeSourceUrl';

export type RedirectData = {
	/**
	 * The redirect new location
	 *
	 * will be null if no redirect is found
	 */
	location: string | undefined | null;

	/**
	 * The status number of the redirect
	 *
	 * Will be 0 if the redirect is not found
	 */
	status: number;
};

const skipURLs = ['wp-login.php', 'wp-register.php', 'wp-admin'];

function shouldSkipRedirect(link: string, redirect: string, sourceUrl: string) {
	const linkURL = new URL(link, sourceUrl);
	const redirectURL = new URL(redirect, sourceUrl);

	if (skipURLs.some((path) => redirectURL.pathname.includes(path))) {
		return true;
	}

	const linkParams = linkURL.searchParams;
	const redirectParams = redirectURL.searchParams;

	linkParams.sort();
	redirectParams.sort();

	return (
		linkURL.pathname.replace(/\/$/, '') === redirectURL.pathname.replace(/\/$/, '') &&
		linkParams.toString() === redirectParams.toString()
	);
}

/**
 * Fetches a redirect from the WordPress origin by making a HEAD request and checking the response
 *
 * @param pathname The path to the page to fetch the redirect for
 * @param sourceUrl The source url
 *
 * @returns The redirect data
 */
export async function fetchRedirect(pathname: string, sourceUrl: string): Promise<RedirectData> {
	const wpURL = sourceUrl.replace(/\/$/, '');
	// Remove the trailing slash before concatenating the link
	const redirectionURL = `${wpURL + pathname.replace(/\/$/, '')}/`;

	const response = await fetch(redirectionURL, {
		method: 'HEAD',
		redirect: 'manual',
		headers: {
			'X-WP-Redirect-Check': '1',
		},
	});

	const config = getHeadlessConfig();

	if (config.debug?.redirects) {
		log(LOGTYPE.DEBUG, 'REDIRECT', redirectionURL, {
			status: response.status,
			location: response.headers.get('location') || '',
		});
	}

	if (
		response.status === 301 ||
		response.status === 302 ||
		response.status === 307 ||
		response.status === 308
	) {
		try {
			const location = removeSourceUrl({
				link: response.headers.get('location') || '',
				backendUrl: sourceUrl,
			});

			if (shouldSkipRedirect(pathname, location, sourceUrl)) {
				throw new Error('Unable to redirect');
			}

			return {
				location,
				status: response.status,
			};
		} catch (e) {
			return { location: null, status: 0 };
		}
	}

	return { location: null, status: 0 };
}
