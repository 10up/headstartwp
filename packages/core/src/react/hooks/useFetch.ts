import useSWR from 'swr';
import type { EndpointParams, FetchResponse } from '../../data';
import { AbstractFetchStrategy } from '../../data';
import { warn } from '../../utils';

import { useSettings } from '../provider';
import { FetchHookOptions } from './types';

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
	options: FetchHookOptions<FetchResponse<R>> = {},
	path = '',
) {
	const { sourceUrl } = useSettings();

	fetchStrategy.setBaseURL(sourceUrl);

	const urlParams = fetchStrategy.getParamsFromURL(path, params);
	const isMainQuery = fetchStrategy.isMainQuery(path, params);

	const finalParams = { ...urlParams, ...params };

	const { fetchStrategyOptions, ...validSWROptions } = options;

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

	const result = useSWR<FetchResponse<R>>(
		{ url: fetchStrategy.getEndpoint(), args: { ...finalParams, sourceUrl } },
		({ args }) =>
			fetchStrategy.fetcher(
				fetchStrategy.buildEndpointURL(args),
				finalParams,
				fetchStrategyOptions,
			),
		options.swr,
	);

	return { ...result, params: finalParams, isMainQuery };
}
