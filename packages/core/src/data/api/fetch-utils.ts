import { addQueryArgs } from '../../utils';

export const getAuthHeader = () => {
	return null;
};

/**
 * Fetch Wrapper to handle POST requests
 *
 * @param url The URL where to make the request to
 * @param args The arguments
 *
 * @returns {object}
 */
export const apiPost = async (url: string, args: { [index: string]: any } = {}) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(args),
	});

	return response.json();
};

/**
 * Fetch Wrapper to handle GET requests.
 *
 * @param url The URL where to make the request to
 * @param args The arguments
 * @param withMinute Whether it should burst cahcing on every minute
 *
 * @returns {object}
 */
export const apiGet = async (
	url: string,
	args: { [index: string]: any } = {},
	withMinute = false,
) => {
	const headers = getAuthHeader();

	if (headers) {
		args.headers = headers;
	}

	const coeff = 1000 * 60;
	const date = new Date();
	const currentMinute = new Date(Math.round(date.getTime() / coeff) * coeff).toISOString();

	const queryArgs = withMinute
		? {
				// Busts cache every minute.
				cacheTime: currentMinute,
		  }
		: {};

	const data = await fetch(addQueryArgs(url, queryArgs), args);

	const receivedHeaders: { [index: string]: any } = [...data.headers.entries()].reduce(
		(collection, pair) => ({
			...collection,
			[pair[0]]: pair[1],
		}),
		{},
	);

	const json = await data.json();

	return { headers: receivedHeaders, json };
};
