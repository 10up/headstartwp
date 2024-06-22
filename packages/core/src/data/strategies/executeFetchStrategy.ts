import deepmerge from 'deepmerge';
import { LOGTYPE, log } from '../../utils';
import { AbstractFetchStrategy, EndpointParams, FetchOptions } from './AbstractFetchStrategy';
import { HeadlessConfig } from '../../types';

/**
 * Prepares a fetch strategy for execution
 *
 * @param fetchStrategy
 * @param config
 * @param params
 * @param path
 * @returns
 */
export function prepareFetchStrategy<E, Params extends EndpointParams, R = E>(
	fetchStrategy: AbstractFetchStrategy<E, Params, R>,
	config: HeadlessConfig,
	params: Partial<Params>,
	path = '',
) {
	const { sourceUrl } = config;

	fetchStrategy.setBaseURL(sourceUrl);

	const defaultParams = fetchStrategy.getDefaultParams();
	const urlParams = fetchStrategy.getParamsFromURL(path, params);
	const isMainQuery = fetchStrategy.isMainQuery(path, params);

	const finalParams = deepmerge.all([defaultParams, urlParams, params]) as Partial<Params>;

	const endpointUrl = fetchStrategy.buildEndpointURL(finalParams);
	const key = fetchStrategy.getCacheKey(finalParams);

	return { isMainQuery, params: finalParams, endpointUrl, key };
}

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
	const { debug } = config;

	const {
		key,
		endpointUrl,
		params: finalParams,
		isMainQuery,
	} = prepareFetchStrategy(fetchStrategy, config, params, path);

	if (debug?.devMode) {
		log(LOGTYPE.INFO, `[useFetch] key for ${key.url}`, key);
	}

	const data = await fetchStrategy.fetcher(endpointUrl, finalParams, options);

	return { key, data, params: finalParams, isMainQuery };
}
