import { getWPUrl } from './getWPUrl';

type RedirectData = {
	location: string | undefined | null;
	status: number;
};

const wpURL = getWPUrl().replace(/\/$/, '');
export async function fetchRedirect(pathname: string): Promise<RedirectData> {
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
