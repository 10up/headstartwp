import { SWRConfiguration } from 'swr';

import { useFetch } from './useFetch';

import type { HookResponse } from './types';
import {
	FetchResponse,
	getPostAuthor,
	getPostTerms,
	PageInfo,
	PostEntity,
	PostsArchiveParams,
	SearchFetchStrategy,
} from '../../data';
import { getWPUrl } from '../../utils';
import { makeErrorCatchProxy } from './util';

export interface useSearchResponse extends HookResponse {
	data?: { posts: PostEntity[]; pageInfo: PageInfo };
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
export function useFetchSearch(
	params: PostsArchiveParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
	path = '',
): useSearchResponse {
	const { data, error } = useFetch<PostEntity, PostsArchiveParams>(
		{ _embed: true, ...params },
		useFetchSearch.fetcher(),
		options,
		path,
	);

	if (error || !data) {
		const fakeData = {
			posts: makeErrorCatchProxy<PostEntity[]>('posts'),
			pageInfo: makeErrorCatchProxy<PageInfo>('pageInfo'),
		};
		return { error, loading: !data, data: fakeData };
	}

	const { result, pageInfo } = data;

	// TODO: fix types
	const posts = (result as unknown as PostEntity[]).map((post) => {
		post.author = getPostAuthor(post);
		post.terms = getPostTerms(post);

		return post;
	});

	return { data: { posts, pageInfo }, loading: false };
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchSearch {
	export const fetcher = () => new SearchFetchStrategy(getWPUrl());
}
