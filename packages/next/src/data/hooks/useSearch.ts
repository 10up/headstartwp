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
	const { data, error } = useFetch<SearchEntity, SearchParams>(
		endpoint,
		{ _embed: true, ...params },
		fetchStrategy,
	);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	const { result } = data;
	// TODO: fix types
	const items = result as unknown as SearchEntity[];

	return { data: { items }, loading: false };
}
