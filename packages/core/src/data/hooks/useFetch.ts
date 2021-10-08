import { addQueryArgs } from '@wordpress/url';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { apiGet } from '../api';
import { parsePath } from '../utils/parsePath';
import { postMatchers } from '../utils/matchers';

import { BuildEndpointURL, EndpointParams, FetcherFunction, GetParamsFromURL } from './types';

/**
 * The default fetcher function
 *
 * @param url The URL to fetch
 *
 * @returns JSON response
 */
export async function defaultFetcher(url: string) {
	const result = await apiGet(url);
	return result.json;
}

/**
 * Returns the supported params from the URL if present
 *
 * @param params The URL params
 *
 * @returns params extracted from the URL
 */
export const defaultGetParamsFromURL: GetParamsFromURL = (params) => {
	const { args } = params;

	if (!args) {
		return {};
	}

	const path = `/${args.join('/')}`;

	return parsePath(postMatchers, path);
};

/**
 * Builds the final endpoint URL based on the passed parameters
 *
 * @param endpoint - The base endpoint
 * @param params - The params to add to the request
 *
 * @returns - The endpoint URL.
 */
export const buildGetEndpointURL: BuildEndpointURL = (endpoint: string, params: EndpointParams) => {
	const { _embed, ...endpointParams } = params;
	const url = addQueryArgs(endpoint, { ...endpointParams });

	if (_embed) {
		return addQueryArgs(url, { _embed });
	}

	return url;
};

/**
 * The useFetch hook
 *
 * @param endpoint - The endpoint to fetch data from
 * @param params - List of params
 * @param getParamsFromURL - The function responsible for extracting params from the URL.
 * @param buildEndpointURL - The function responsible for building out the endpoint URL with the provided params.
 * @param fetcherFunction - The fetcher function.
 * @returns
 */
export function useFetch<Params extends EndpointParams>(
	endpoint: string,
	params: Params,
	getParamsFromURL: GetParamsFromURL = defaultGetParamsFromURL,
	buildEndpointURL: BuildEndpointURL = buildGetEndpointURL,
	fetcherFunction: FetcherFunction = defaultFetcher,
) {
	const { query } = useRouter();
	const urlParams = getParamsFromURL(query);
	const finalParams = { ...urlParams, params };

	return useSWR(buildEndpointURL(endpoint, finalParams), fetcherFunction);
}
