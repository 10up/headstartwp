import { useRouter } from 'next/router';
import useSWR from 'swr';

import { useSettings, Entity, AbstractFetchStrategy, EndpointParams } from '@10up/headless-core';

/**
 * The useFetch hook
 *
 * @param endpoint - The endpoint to fetch data from
 * @param params - List of params
 * @param fetchStrategy - The Fetching strategy
 *
 * @returns
 */
export function useFetch<E extends Entity, Params extends EndpointParams>(
	endpoint: string,
	params: Params,
	fetchStrategy: AbstractFetchStrategy<E, Params>,
) {
	const { url } = useSettings();

	fetchStrategy.setBaseURL(url);
	fetchStrategy.setEndpoint(endpoint);

	const { query } = useRouter();
	const urlParams = fetchStrategy.getParamsFromURL(query);
	const finalParams = { ...urlParams, ...params };

	return useSWR(fetchStrategy.buildEndpointURL(finalParams), (url: string) =>
		fetchStrategy.fetcher(url),
	);
}
