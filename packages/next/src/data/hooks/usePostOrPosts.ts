import {
	FetchResponse,
	PostEntity,
	PostOrPostsParams,
	PostOrPostsFetchStrategyResult,
} from '@headstartwp/core';
import { FetchHookOptions, useFetchPostOrPosts } from '@headstartwp/core/react';
import { usePrepareFetch } from './usePrepareFetch';

/**
 *
 * @param params The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
export function usePostOrPosts<
	T extends PostEntity = PostEntity,
	P extends PostOrPostsParams = PostOrPostsParams,
>(
	params: P | {} = {},
	options: FetchHookOptions<FetchResponse<PostOrPostsFetchStrategyResult<T>>> = {},
) {
	const useFetchArguments = usePrepareFetch(params, options);

	return useFetchPostOrPosts<T, P>(
		useFetchArguments.params,
		useFetchArguments.options,
		useFetchArguments.path,
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace usePostOrPosts {
	export const { fetcher } = useFetchPostOrPosts;
}
