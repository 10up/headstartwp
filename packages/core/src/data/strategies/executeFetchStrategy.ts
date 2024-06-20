import deepmerge from 'deepmerge';
import { LOGTYPE, log } from '../../utils';
import { AbstractFetchStrategy, EndpointParams, FetchOptions } from './AbstractFetchStrategy';
import { HeadlessConfig } from '../../types';

/**
 * Executes a fetch strategy
 *
 * @param config
 * @param params
 * @param fetchStrategy
 * @param options
 * @param path
 */
export async function executeFetchStrategy<E, Params extends EndpointParams, R = E>(
	fetchStrategy: AbstractFetchStrategy<E, Params, R>,
	config: HeadlessConfig,
	params: Partial<Params>,
	options?: Partial<FetchOptions>,
	path = '',
) {
	const { sourceUrl, debug } = config;

	fetchStrategy.setBaseURL(sourceUrl);

	const defaultParams = fetchStrategy.getDefaultParams();
	const urlParams = fetchStrategy.getParamsFromURL(path, params);
	const isMainQuery = fetchStrategy.isMainQuery(path, params);

	const finalParams = deepmerge.all([defaultParams, urlParams, params]) as Partial<Params>;

	const endpointUrl = fetchStrategy.buildEndpointURL(finalParams);
	const key = fetchStrategy.getCacheKey(finalParams);

	if (debug?.devMode) {
		log(LOGTYPE.INFO, `[useFetch] key for ${key.url}`, key);
	}

	const data = await fetchStrategy.fetcher(endpointUrl, finalParams, options);

	return { key, data, params: finalParams, isMainQuery };
}
