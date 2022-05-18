import { PostEntity, PostsArchiveParams, FetchResponse } from '@10up/headless-core';
import { useFetchSearch } from '@10up/headless-core/react';
import { useRouter } from 'next/router';
import { SWRConfiguration } from 'swr';
import { convertToPath } from '../utils';

/**
 * The useSearch hook. Returns a collection of search entities
 *
 * @param params  Supported params
 * @param options Options for the SWR configuration
 *
 * @source The source code of the hook
 * @category Data Fetching Hooks
 */
export function useSearch(
	params: PostsArchiveParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useFetchSearch(params, options, convertToPath(path));
}

useSearch.fetcher = useFetchSearch.fetcher;
