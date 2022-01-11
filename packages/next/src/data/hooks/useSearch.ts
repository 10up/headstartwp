import { SearchEntity, SearchParams, SearchFetchStrategy } from '@10up/headless-core';
import { useFetch } from './useFetch';
import { HookResponse } from './types';

const endpoint = '/wp-json/wp/v2/search';

interface useSearchResponse extends HookResponse {
	data?: { items: SearchEntity[] };
}

const fetchStrategy = new SearchFetchStrategy();

/**
 * The useSearch hook. Returns a collection of search entities
 *
 * @param params - Supported params
 *
 * @returns
 */
export function useSearch(params: SearchParams): useSearchResponse {
	const { data, error } = useFetch<SearchEntity, SearchParams>(endpoint, params, fetchStrategy);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	const items = data as unknown as SearchEntity[];

	// TODO: fix types
	return { data: { items }, loading: false };
}
