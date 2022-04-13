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
import { getWPUrl } from '../../utils/getWPUrl';

export interface usePostResponse extends HookResponse {
	data?: { post: PostEntity };
}

/**
 * The usePost hook. Returns a single post entity
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @returns
 */
export function usePostImpl(
	params: PostParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
	path = '',
): usePostResponse {
	const { data, error } = useFetch<PostEntity, PostParams>(
		{ _embed: true, ...params },
		usePostImpl.fetcher(),
		options,
		path,
	);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	// TODO: fix types
	const post = Array.isArray(data.result) ? (data.result[0] as PostEntity) : data.result;

	post.author = getPostAuthor(post);
	post.terms = getPostTerms(post);

	return { data: { post }, loading: false };
}

usePostImpl.fetcher = () => new SinglePostFetchStrategy(getWPUrl());
