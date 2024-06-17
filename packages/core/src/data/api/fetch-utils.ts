import { LOGTYPE, addQueryArgs, getHeadlessConfig, log } from '../../utils';

/**
 * Fetch Wrapper to handle POST requests
 *
 * @param url The URL where to make the request to
 * @param args The arguments
 *
 * @category Data Fetching
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

	const config = getHeadlessConfig();

	if (config.debug?.requests) {
		log(LOGTYPE.DEBUG, 'POST', url, args);
	}

	return response.json();
};

/**
 * Fetch Wrapper to handle GET requests.
 *
 * @param url The URL where to make the request to
 * @param args The arguments
 * @param burstCache Whether it should burst cache
 *
 * @category Data Fetching
 *
 * @returns {object}
 */
export const apiGet = async (
	url: string,
	args: { [index: string]: any } = {},
	burstCache = false,
) => {
	const queryArgs = burstCache
		? {
				cacheTime: new Date().getTime(),
			}
		: {};

	const config = getHeadlessConfig();

	const fetchUrl = addQueryArgs(url, queryArgs);

	if (config.debug?.requests) {
		log(LOGTYPE.DEBUG, 'GET', fetchUrl, args);
	}

	const data = await fetch(fetchUrl, args);

	const receivedHeaders: { [index: string]: any } = [
		...Array.from(data.headers.entries()),
	].reduce(
		(collection, pair) => ({
			...collection,
			[pair[0]]: pair[1],
		}),
		{},
	);

	const json = await data.json();

	return { headers: receivedHeaders, json };
};

export const fetchStrategy = async () => {};
