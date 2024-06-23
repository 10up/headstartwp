import type { KeyedMutator } from 'swr';
import { useFetch } from './useFetch';

import type { FetchHookOptions, HookResponse } from './types';
import {
	FetchResponse,
	getPostAuthor,
	getPostTerms,
	PageInfo,
	PostEntity,
	PostsArchiveFetchStrategy,
	PostsArchiveParams,
	QueriedObject,
} from '../../data';
import { PageType, getPageTypeForQuery } from '../../data/queries/fetchPosts';
import { getWPUrl } from '../../utils';
import { makeErrorCatchProxy } from './util';
import { useSettings } from '../provider';

export interface usePostsResponse<T extends PostEntity = PostEntity> extends HookResponse {
	data: {
		posts: T[];
		pageInfo: PageInfo;
		queriedObject: QueriedObject;
	};
	pageType: PageType;
	mutate: KeyedMutator<FetchResponse<T[]>>;
}

/**
 * The useFetchPosts hook. Returns a collection of post entities
 *
 * See {@link usePosts} for usage instructions.
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 * @param fetcher The fetch strategy to use. If none is passed, the default one is used
 *
 * @category Data Fetching Hooks
 */
export function useFetchPosts<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(
	params: P | {} = {},
	options: FetchHookOptions<FetchResponse<T[]>> = {},
	path = '',
	fetcher: PostsArchiveFetchStrategy<T, P> | undefined = undefined,
): usePostsResponse<T> {
	const {
		data,
		error,
		params: queryParams,
		isMainQuery,
		mutate,
	} = useFetch<T[], P>(params, fetcher ?? useFetchPosts.fetcher<T, P>(), options, path);

	const settings = useSettings();

	const pageType = getPageTypeForQuery(queryParams, settings);

	if (error || !data) {
		const fakeData = {
			posts: makeErrorCatchProxy<T[]>('posts'),
			pageInfo: makeErrorCatchProxy<PageInfo>('pageInfo'),
			queriedObject: makeErrorCatchProxy<QueriedObject>('queriedObject'),
		};

		return { error, loading: !data, pageType, data: fakeData, isMainQuery, mutate };
	}

	const { result, pageInfo, queriedObject } = data;

	const posts = result.map((post) => {
		return { ...post, author: getPostAuthor(post), terms: getPostTerms(post) };
	});

	return {
		data: { posts, pageInfo, queriedObject: queriedObject ?? {} },
		loading: false,
		pageType,
		isMainQuery,
		mutate,
	};
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchPosts {
	export const fetcher = <
		T extends PostEntity = PostEntity,
		P extends PostsArchiveParams = PostsArchiveParams,
	>(
		sourceUrl?: string,
		defaultParams?: P,
	) => new PostsArchiveFetchStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
}
