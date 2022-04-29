import useSWR, { SWRConfiguration } from 'swr';
import type { EndpointParams, Entity, FetchResponse } from '../../data';
import { AbstractFetchStrategy } from '../../data';

import { useSettings } from '../provider';

export interface useFetchOptions {
	shouldFetch?: () => boolean;
}

/**
 * The use Fetch Hook
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param fetchStrategy The fetch strategy.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @returns
 */
export function useFetch<E extends Entity, Params extends EndpointParams>(
	params: Params,
	fetchStrategy: AbstractFetchStrategy<E, Params>,
	options: SWRConfiguration<FetchResponse<E>> = {},
	path = '',
) {
	const { sourceUrl } = useSettings();

	fetchStrategy.setBaseURL(sourceUrl);

	const urlParams = fetchStrategy.getParamsFromURL(path);
	const finalParams = { ...urlParams, ...params };

	const result = useSWR<FetchResponse<E>>(
		fetchStrategy.buildEndpointURL(finalParams),
		(url: string) => fetchStrategy.fetcher(url, finalParams),
		options,
	);

	return { ...result, params: finalParams };
}
