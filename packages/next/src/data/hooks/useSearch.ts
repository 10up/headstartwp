import { PostEntity, PostsArchiveParams, FetchResponse, useSearchImpl } from '@10up/headless-core';
import { useRouter } from 'next/router';
import { SWRConfiguration } from 'swr';
import { convertToPath } from '../utils';

/**
 * The useSearch hook. Returns a collection of search entities
 *
 * @param params  Supported params
 * @param options Options for the SWR configuration
 *
 * @returns
 */
export function useSearch(
	params: PostsArchiveParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useSearchImpl(params, options, convertToPath(path));
}

useSearch.fetcher = useSearchImpl.fetcher;
