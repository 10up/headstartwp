import { KeyedMutator } from 'swr';
import { useFetch } from './useFetch';

import type { FetchHookOptions, HookResponse } from './types';
import {
	FetchResponse,
	getPostAuthor,
	getPostTerms,
	PageInfo,
	PostSearchEntity,
	TermSearchEntity,
	SearchParams,
	QueriedObject,
	SearchNativeFetchStrategy,
} from '../../data';
import { getWPUrl } from '../../utils';
import { makeErrorCatchProxy } from './util';

export interface useSearchNativeResponse<
	T extends PostSearchEntity | TermSearchEntity = PostSearchEntity | TermSearchEntity,
> extends HookResponse {
	data?: { searchResults: T[]; pageInfo: PageInfo; queriedObject: QueriedObject };
	mutate: KeyedMutator<FetchResponse<T[]>>;
}

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
	T extends PostSearchEntity | TermSearchEntity = PostSearchEntity | TermSearchEntity,
	P extends SearchParams = SearchParams,
>(
	params: P | {} = {},
	options: FetchHookOptions<FetchResponse<T[]>> = {},
	path = '',
): useSearchNativeResponse<T> {
	const { data, error, isMainQuery, mutate } = useFetch<T[], P>(
		params,
		useFetchSearchNative.fetcher<T, P>(),
		options,
		path,
	);

	if (error || !data) {
		const fakeData = {
			searchResults: makeErrorCatchProxy<T[]>('posts'),
			pageInfo: makeErrorCatchProxy<PageInfo>('pageInfo'),
			queriedObject: makeErrorCatchProxy<QueriedObject>('queriedObject'),
		};
		return { error, loading: !data, data: fakeData, isMainQuery, mutate };
	}

	const { result, pageInfo, queriedObject } = data;

	const searchResults = result.map((post) => {
		if ('subtype' in post) {
			const postSearchEntity = post as PostSearchEntity;
			post.author = getPostAuthor(postSearchEntity);
			post.terms = getPostTerms(postSearchEntity);
		}

		return post;
	});

	return {
		data: { searchResults, pageInfo, queriedObject },
		loading: false,
		isMainQuery,
		mutate,
	};
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchSearchNative {
	export const fetcher = <
		T extends PostSearchEntity | TermSearchEntity = PostSearchEntity | TermSearchEntity,
		P extends SearchParams = SearchParams,
	>(
		sourceUrl?: string,
		defaultParams?: P,
	) => new SearchNativeFetchStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
}
