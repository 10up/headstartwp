import { FetchResponse, PostEntity, PostParams } from '@10up/headless-core';
import { SWRConfiguration } from 'swr';
import { useRouter } from 'next/router';
import { useFetchPost } from '@10up/headless-core/react';
import { convertToPath } from '../utils';

/**
 * The usePost hook. Returns a single post entity
 *
 * @param params  Supported params
 * @param options Options for the SWR configuration
 *
 * @source The source code of the hook
 *
 * @category Data Fetching Hooks
 */
export function usePost(
	params: PostParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useFetchPost(params, options, convertToPath(path));
}

usePost.fetcher = useFetchPost.fetcher;
