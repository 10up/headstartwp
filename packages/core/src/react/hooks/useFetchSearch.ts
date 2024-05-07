import type { KeyedMutator } from 'swr';
import { useFetch } from './useFetch';

import type { FetchHookOptions, HookResponse } from './types';
import type {
	FetchResponse,
	PageInfo,
	PostEntity,
	PostsArchiveParams,
	QueriedObject,
} from '../../data';
import { getPostAuthor, getPostTerms, SearchFetchStrategy } from '../../data';
import { getWPUrl } from '../../utils';
import { makeErrorCatchProxy } from './util';

export interface useSearchResponse<T extends PostEntity = PostEntity> extends HookResponse {
	data?: { posts: T[]; pageInfo: PageInfo; queriedObject: QueriedObject };
	mutate: KeyedMutator<FetchResponse<T[]>>;
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
	const { data, error, isMainQuery, mutate } = useFetch<T[], P>(
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
		return { error, loading: !data, data: fakeData, isMainQuery, mutate };
	}

	const { result, pageInfo, queriedObject } = data;

	const posts = result.map((post) => {
		post.author = getPostAuthor(post);
		post.terms = getPostTerms(post);

		return post;
	});

	return { data: { posts, pageInfo, queriedObject }, loading: false, isMainQuery, mutate };
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchSearch {
	export const fetcher = <
		T extends PostEntity = PostEntity,
		P extends PostsArchiveParams = PostsArchiveParams,
	>(
		sourceUrl?: string,
		defaultParams?: P,
	) => new SearchFetchStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
}
