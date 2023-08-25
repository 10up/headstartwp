import useSWR, { useSWRConfig } from 'swr';
import deepmerge from 'deepmerge';
import type { EndpointParams, FetchResponse } from '../../data';
import { AbstractFetchStrategy } from '../../data';

import { useSettings } from '../provider';
import { FetchHookOptions } from './types';
import { log, LOGTYPE, warn } from '../../utils';

export interface useFetchOptions {
	shouldFetch?: () => boolean;
}

// re-export useSWR
export { useSWR, useSWRConfig };

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
	params: Params | {},
	fetchStrategy: AbstractFetchStrategy<E, Params, R>,
	options: FetchHookOptions<FetchResponse<R>> = {},
	path = '',
) {
	const { sourceUrl, debug } = useSettings();
	const { mutate } = useSWRConfig();

	fetchStrategy.setBaseURL(sourceUrl);

	const defaultParams = fetchStrategy.getDefaultParams();
	const urlParams = fetchStrategy.getParamsFromURL(path, params);
	const isMainQuery = fetchStrategy.isMainQuery(path, params);

	const finalParams = deepmerge.all([defaultParams, urlParams, params]) as Partial<Params>;

	const { fetchStrategyOptions, shouldFetch = true, ...validSWROptions } = options;

	// for backwards compat ensure options.swr exists
	// this would make code that's not namespacing the swr options under `{ swr }` still work.
	if (!options.swr && Object.keys(validSWROptions).length > 0) {
		warn(
			`useSWR options should be passed under the swr namespace. "{ swr: ${JSON.stringify(
				validSWROptions,
			)} }"`,
		);

		// @ts-expect-error
		options.swr = { ...validSWROptions };
	}

	const endpointUrl = fetchStrategy.buildEndpointURL(finalParams);
	const key = fetchStrategy.getCacheKey(finalParams);

	if (debug?.devMode) {
		log(LOGTYPE.INFO, `[useFetch] key for ${key.url}`, key);
	}

	const result = useSWR<FetchResponse<R>>(
		shouldFetch ? key : null,
		async () => {
			const fetchData = await fetchStrategy.fetcher(
				endpointUrl,
				finalParams,
				fetchStrategyOptions,
			);

			const { data, additionalCacheObjects } = fetchStrategy.normalizeForCache(
				fetchData,
				finalParams,
			);

			// mutate additiional cache objects
			if (additionalCacheObjects) {
				additionalCacheObjects.forEach(({ key, data }) => {
					mutate(key, data);
				});
			}

			return data;
		},
		options.swr,
	);

	if (debug?.devMode) {
		log(LOGTYPE.INFO, `[useFetch] result for ${key.url}`, {
			isLoading: result.isLoading,
			isValidation: result.isValidating,
			pageInfo: result.data?.pageInfo,
		});
	}

	return { ...result, params: finalParams, isMainQuery };
}
