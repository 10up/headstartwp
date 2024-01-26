import { useFetch } from './useFetch';

import type { FetchHookOptions } from './types';
import {
	FetchResponse,
	getPostAuthor,
	getPostTerms,
	PageInfo,
	PostEntity,
	SearchParams,
	QueriedObject,
	SearchNativeFetchStrategy,
} from '../../data';
import { getWPUrl } from '../../utils';
import { makeErrorCatchProxy } from './util';
import { useSearchResponse } from './useFetchSearch';

/**
 * The useFetchSearchNative hook. Returns a collection of search entities retrieved through the WP native search endpoint
 *
 * See {@link useSearchNative} for usage instructions.
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @category Data Fetching Hooks
 */
export function useFetchSearchNative<
	T extends PostEntity = PostEntity,
	P extends SearchParams = SearchParams,
>(
	params: P | {} = {},
	options: FetchHookOptions<FetchResponse<T[]>> = {},
	path = '',
): useSearchResponse<T> {
	const { data, error, isMainQuery } = useFetch<T[], P>(
		params,
		useFetchSearchNative.fetcher<T, P>(),
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
export namespace useFetchSearchNative {
	export const fetcher = <
		T extends PostEntity = PostEntity,
		P extends SearchParams = SearchParams,
	>(
		sourceUrl?: string,
		defaultParams?: P,
	) => new SearchNativeFetchStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
}
