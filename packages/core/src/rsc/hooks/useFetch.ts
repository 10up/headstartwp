import deepmerge from 'deepmerge';
import type { EndpointParams } from '../../data';
import { AbstractFetchStrategy } from '../../data';

import type { FetchHookOptions } from './types';
import { getHeadstartWPConfig, log, LOGTYPE } from '../../utils';

export interface useFetchOptions {}

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
export async function useFetch<E, Params extends EndpointParams, R = E>(
	params: Params | {},
	fetchStrategy: AbstractFetchStrategy<E, Params, R>,
	options: FetchHookOptions = {},
	path = '',
) {
	const { sourceUrl, debug } = getHeadstartWPConfig();

	fetchStrategy.setBaseURL(sourceUrl);

	const defaultParams = fetchStrategy.getDefaultParams();
	const urlParams = fetchStrategy.getParamsFromURL(path, params);
	const isMainQuery = fetchStrategy.isMainQuery(path, params);

	const finalParams = deepmerge.all([defaultParams, urlParams, params]) as Partial<Params>;

	const { fetchStrategyOptions } = options;

	const endpointUrl = fetchStrategy.buildEndpointURL(finalParams);
	const key = fetchStrategy.getCacheKey(finalParams);

	if (debug?.devMode) {
		log(LOGTYPE.INFO, `[useFetch] key for ${key.url}`, key);
	}

	const fetchData = await fetchStrategy.fetcher(endpointUrl, finalParams, fetchStrategyOptions);

	const { data /* additionalCacheObjects */ } = fetchStrategy.normalizeForCache(
		fetchData,
		finalParams,
	);

	// mutate additiional cache objects
	/* if (additionalCacheObjects) {
		additionalCacheObjects.forEach(({ key, data }) => {
			// mutate(key, data);
		});
	} */

	return { data, params: finalParams, isMainQuery };
}
