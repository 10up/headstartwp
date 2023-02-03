import { useFetch } from './useFetch';

import type { FetchHookOptions, HookResponse } from './types';
import {
	FetchResponse,
	getPostAuthor,
	getPostTerms,
	PageInfo,
	PostEntity,
	PostsArchiveParams,
	QueriedObject,
	SearchFetchStrategy,
} from '../../data';
import { getWPUrl } from '../../utils';
import { makeErrorCatchProxy } from './util';

export interface useSearchResponse<T extends PostEntity = PostEntity> extends HookResponse {
	data?: { posts: T[]; pageInfo: PageInfo; queriedObject: QueriedObject };
}

/**
 * The useFetchSearch hook. Returns a collection of post entities
 *
 * See {@link useSearch} for usage instructions.
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @category Data Fetching Hooks
 */
export function useFetchSearch<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(
	params: P | {} = {},
	options: FetchHookOptions<FetchResponse<T[]>> = {},
	path = '',
): useSearchResponse<T> {
	const { data, error, isMainQuery } = useFetch<T[], P>(
		params,
		useFetchSearch.fetcher<T, P>(),
		options,
		path,
	);

	if (error || !data) {
		const fakeData = {
			posts: makeErrorCatchProxy<T[]>('posts'),
			pageInfo: makeErrorCatchProxy<PageInfo>('pageInfo'),
			queriedObject: makeErrorCatchProxy<QueriedObject>('queriedObject'),
		};
		return { error, loading: !data, data: fakeData, isMainQuery };
	}

	const { result, pageInfo, queriedObject } = data;

	const posts = result.map((post) => {
		post.author = getPostAuthor(post);
		post.terms = getPostTerms(post);

		return post;
	});

	return { data: { posts, pageInfo, queriedObject }, loading: false, isMainQuery };
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchSearch {
	export const fetcher = <
		T extends PostEntity = PostEntity,
		P extends PostsArchiveParams = PostsArchiveParams,
	>() => new SearchFetchStrategy<T, P>(getWPUrl());
}
