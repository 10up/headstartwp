import { KeyedMutator } from 'swr';
import { useFetch } from './useFetch';
import type { FetchHookOptions, HookResponse } from './types';
import {
	FetchResponse,
	getPostAuthor,
	getPostTerms,
	PostEntity,
	PostParams,
	SinglePostFetchStrategy,
} from '../../data';
import { getWPUrl } from '../../utils';
import { makeErrorCatchProxy } from './util';

export interface usePostResponse<T extends PostEntity = PostEntity> extends HookResponse {
	data: {
		post: T;
		pageInfo: FetchResponse<T>['pageInfo'];
		queriedObject: FetchResponse<T>['queriedObject'];
	};
	mutate: KeyedMutator<FetchResponse<T>>;
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
export function useFetchPost<T extends PostEntity = PostEntity, P extends PostParams = PostParams>(
	params: P | {} = {},
	options: FetchHookOptions<FetchResponse<T>> = {},
	path = '',
): usePostResponse<T> {
	const { data, error, isMainQuery, mutate } = useFetch<T[], P, T>(
		params,
		useFetchPost.fetcher<T, P>(),
		options,
		path,
	);

	if (error || !data) {
		const fakeData = {
			post: makeErrorCatchProxy<T>('post'),
			pageInfo: makeErrorCatchProxy<FetchResponse<T>['pageInfo']>('pageInfo'),
			queriedObject: makeErrorCatchProxy<FetchResponse<T>['queriedObject']>('queriedObject'),
		};
		return { error, loading: error ? false : !data, data: fakeData, isMainQuery, mutate };
	}

	const post = {
		...data.result,
		author: getPostAuthor(data.result),
		terms: getPostTerms(data.result),
	};

	return {
		data: { post, pageInfo: data.pageInfo, queriedObject: data.queriedObject },
		loading: false,
		isMainQuery,
		mutate,
	};
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchPost {
	export const fetcher = <T extends PostEntity = PostEntity, P extends PostParams = PostParams>(
		sourceUrl?: string,
		defaultParams?: P,
	) => new SinglePostFetchStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
}
