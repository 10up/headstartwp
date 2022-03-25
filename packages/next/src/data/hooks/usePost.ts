import { FetchResponse, PostEntity, PostParams, usePostImpl } from '@10up/headless-core';
import { SWRConfiguration } from 'swr';
import { useRouter } from 'next/router';
import { convertToPath } from '../utils';

/**
 * The usePost hook. Returns a single post entity
 *
 * @param params  Supported params
 * @param options Options for the SWR configuration
 *
 * @returns
 */
export function usePost(
	params: PostParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return usePostImpl(params, options, convertToPath(path));
}

usePost.fetcher = usePostImpl.fetcher;
