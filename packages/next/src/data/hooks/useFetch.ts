import { useRouter } from 'next/router';
import useSWR from 'swr';

import { useSettings, Entity, AbstractFetchStrategy, EndpointParams } from '@10up/headless-core';

interface useFetchOptions {
	shouldFetch?: () => boolean;
}

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
	options: useFetchOptions = {},
) {
	const { url } = useSettings();

	fetchStrategy.setBaseURL(url);
	fetchStrategy.setEndpoint(endpoint);

	const { query } = useRouter();
	const urlParams = fetchStrategy.getParamsFromURL(query);
	const finalParams = { ...urlParams, ...params };

	const shouldFetch = options?.shouldFetch ? options.shouldFetch : () => true;

	const result = useSWR(
		shouldFetch() ? fetchStrategy.buildEndpointURL(finalParams) : null,
		(url: string) => fetchStrategy.fetcher(url, finalParams),
	);

	return { ...result, params: finalParams };
}
