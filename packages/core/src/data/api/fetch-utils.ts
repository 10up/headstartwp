import { LOGTYPE, addQueryArgs, getHeadstartWPConfig, log } from '../../utils';

export const getAuthHeader = () => {
	return null;
};

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
	const config = getHeadstartWPConfig();

	const fetchArgs = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(args),
	};

	const { url: filteredUrl, args: filteredArgs } = config.filters?.fetch?.(
		'POST',
		url,
		fetchArgs,
	) ?? {
		url,
		fetchArgs,
	};

	const response = await fetch(filteredUrl, filteredArgs);

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

	const config = getHeadstartWPConfig();

	const fetchUrl = addQueryArgs(url, queryArgs);

	if (config.debug?.requests) {
		log(LOGTYPE.DEBUG, 'GET', fetchUrl, args);
	}

	const { url: filteredUrl, args: filteredArgs } = config.filters?.fetch?.(
		'GET',
		fetchUrl,
		args,
		burstCache,
	) ?? { url: fetchUrl, args };

	const data = await fetch(filteredUrl, filteredArgs);

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
