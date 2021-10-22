import { useRouter } from 'next/router';
import useSWR from 'swr';

import { useSettings } from '../../provider/useSettings';
import { AbstractFetchStrategy, EndpointParams } from './strategies/AbstractFetchStrategy';
import { Entity } from '../types';

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
	const settings = useSettings();
	const fullEndpoint = `${settings.url}${endpoint}`;
	fetchStrategy.setEndpoint(fullEndpoint);

	const { query } = useRouter();
	const urlParams = fetchStrategy.getParamsFromURL(query);
	const finalParams = { ...urlParams, params };

	return useSWR(fetchStrategy.buildEndpointURL(finalParams), fetchStrategy.fetcher);
}
