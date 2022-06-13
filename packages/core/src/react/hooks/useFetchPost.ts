import { SWRConfiguration } from 'swr';
import { useFetch } from './useFetch';
import type { HookResponse } from './types';
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

export interface usePostResponse extends HookResponse {
	data?: { post: PostEntity };
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
export function useFetchPost(
	params: PostParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
	path = '',
): usePostResponse {
	const { data, error } = useFetch<PostEntity, PostParams>(
		{ _embed: true, ...params },
		useFetchPost.fetcher(),
		options,
		path,
	);

	if (error || !data) {
		const fakeData = { post: makeErrorCatchProxy<PostEntity>('post') };
		return { error, loading: !data, data: fakeData };
	}

	// TODO: fix types
	const post = Array.isArray(data.result) ? (data.result[0] as PostEntity) : data.result;

	post.author = getPostAuthor(post);
	post.terms = getPostTerms(post);

	return { data: { post }, loading: false };
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchPost {
	export const fetcher = () => new SinglePostFetchStrategy(getWPUrl());
}
