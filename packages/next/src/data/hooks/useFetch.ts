import { useRouter } from 'next/router';
import useSWR, { SWRConfiguration } from 'swr';

import {
	useSettings,
	Entity,
	AbstractFetchStrategy,
	EndpointParams,
	FetchResponse,
} from '@10up/headless-core';
import { convertToPath } from '../utils';

export interface useFetchOptions {
	shouldFetch?: () => boolean;
}

/**
 * The useFetch hook
 *
 * @param params - List of params
 * @param fetchStrategy - The Fetching strategy
 *
 * @returns
 */
export function useFetch<E extends Entity, Params extends EndpointParams>(
	params: Params,
	fetchStrategy: AbstractFetchStrategy<E, Params>,
	options: SWRConfiguration<FetchResponse<E>> = {},
) {
	const { url } = useSettings();

	fetchStrategy.setBaseURL(url);

	const { query } = useRouter();

	const path = Array.isArray(query.path) ? query.path : [query.path || ''];
	const urlParams = fetchStrategy.getParamsFromURL(convertToPath(path));

	const finalParams = { ...urlParams, ...params };

	const result = useSWR<FetchResponse<E>>(
		fetchStrategy.buildEndpointURL(finalParams),
		(url: string) => fetchStrategy.fetcher(url, finalParams),
		options,
	);

	return { ...result, params: finalParams };
}
