import useSWR, { SWRConfiguration } from 'swr';
import type { EndpointParams, FetchResponse } from '../../data';
import { AbstractFetchStrategy } from '../../data';

import { useSettings } from '../provider';

export interface useFetchOptions {
	shouldFetch?: () => boolean;
}

/**
 * The use Fetch Hook is the foundation for most hooks in the headless framework. It is a wrapper around
 * `useSWR` and provides a consistent API for fetching data from the API. It requires a fetch strategy which implements
 * the actual data fetching logic
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param fetchStrategy The fetch strategy.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @category Data Fetching Hooks
 *
 */
export function useFetch<E, Params extends EndpointParams, R = E>(
	params: Params,
	fetchStrategy: AbstractFetchStrategy<E, Params, R>,
	options: SWRConfiguration<FetchResponse<R>> = {},
	path = '',
) {
	const { sourceUrl } = useSettings();

	fetchStrategy.setBaseURL(sourceUrl);

	const urlParams = fetchStrategy.getParamsFromURL(path, params);
	const finalParams = { ...urlParams, ...params };

	const result = useSWR<FetchResponse<R>>(
		{ url: fetchStrategy.getEndpoint(), args: finalParams },
		({ args }) => fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(args), finalParams),
		options,
	);

	if (result.data && !result.error) {
		result.data.queriedObject = fetchStrategy.getQueriedObject(result.data, finalParams);
	}

	return { ...result, params: finalParams };
}
