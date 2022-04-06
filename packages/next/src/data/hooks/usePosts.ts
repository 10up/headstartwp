import { PostEntity, PostsArchiveParams, FetchResponse } from '@10up/headless-core';
import { usePostsImpl } from '@10up/headless-core/react';
import { SWRConfiguration } from 'swr';
import { useRouter } from 'next/router';
import { convertToPath } from '../utils';

/**
 * The usePost hook. Returns a collection of post entities
 *
 * @param params  Supported params
 * @param options Options for the SWR configuration
 *
 * @returns
 */
export function usePosts(
	params: PostsArchiveParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return usePostsImpl(params, options, convertToPath(path));
}

usePosts.fetcher = usePostsImpl.fetcher;
