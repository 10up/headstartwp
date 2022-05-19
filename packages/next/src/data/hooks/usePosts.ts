import { PostEntity, PostsArchiveParams, FetchResponse } from '@10up/headless-core';
import { useFetchPosts } from '@10up/headless-core/react';
import { SWRConfiguration } from 'swr';
import { useRouter } from 'next/router';
import { convertToPath } from '../utils';

/**
 * The usePost hook. Returns a collection of post entities
 *
 * @param params  The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @source The source code of the hook
 * @category Data Fetching Hooks
 */
export function usePosts(
	params: PostsArchiveParams = {},
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useFetchPosts(params, options, convertToPath(path));
}

usePosts.fetcher = useFetchPosts.fetcher;
