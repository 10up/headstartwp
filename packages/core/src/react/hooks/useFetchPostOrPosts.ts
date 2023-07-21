import { useFetch } from './useFetch';
import type { FetchHookOptions, HookResponse } from './types';
import { FetchResponse, PostEntity } from '../../data';
import { getWPUrl } from '../../utils';
import { makeErrorCatchProxy } from './util';
import {
	PostOrPostsFetchStrategy,
	PostOrPostsParams,
	PostOrPostsFetchStrategyResult,
} from '../../data/strategies/PostOrPostsFetchStrategy';

export interface usePostOrPostResponse<T extends PostEntity = PostEntity> extends HookResponse {
	data?: { post?: T; posts?: T[] };
	isSingle: boolean;
	isArchive: boolean;
}

/**
 * The useFetchPost hook. Returns a single post entity
 *
 * See {@link usePost} for usage instructions.
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @module useFetchPost
 * @category Data Fetching Hooks
 */
export function useFetchPostOrPosts<
	T extends PostEntity = PostEntity,
	P extends PostOrPostsParams = PostOrPostsParams,
>(
	params: P | {} = {},
	options: FetchHookOptions<FetchResponse<PostOrPostsFetchStrategyResult<T>>> = {},
	path = '',
): usePostOrPostResponse<T> {
	const { data, error, isMainQuery } = useFetch<T[], P, PostOrPostsFetchStrategyResult<T>>(
		params,
		useFetchPostOrPosts.fetcher<T, P>(),
		options,
		path,
	);

	if (error || !data) {
		const fakeData = {
			post: makeErrorCatchProxy<T>('post'),
			posts: makeErrorCatchProxy<T[]>('posts'),
		};

		return {
			error,
			loading: error ? false : !data,
			data: fakeData,
			isMainQuery,
			isArchive: false,
			isSingle: false,
		};
	}

	if (data.result.isSingle && !Array.isArray(data.result.data)) {
		return {
			data: { post: data.result.data },
			loading: false,
			isMainQuery,
			isSingle: data.result.isSingle,
			isArchive: data.result.isArchive,
		};
	}

	return {
		data: { posts: data.result.data as T[] },
		loading: false,
		isMainQuery,
		isSingle: data.result.isSingle,
		isArchive: data.result.isArchive,
	};
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchPostOrPosts {
	export const fetcher = <
		T extends PostEntity = PostEntity,
		P extends PostOrPostsParams = PostOrPostsParams,
		R extends PostOrPostsFetchStrategyResult<T> = PostOrPostsFetchStrategyResult<T>,
	>(
		sourceUrl?: string,
		defaultParams?: P,
	) => new PostOrPostsFetchStrategy<T, P, R>(sourceUrl ?? getWPUrl(), defaultParams);
}
