import {
	SearchFetchStrategy,
	PostEntity,
	PostsArchiveParams,
	PageInfo,
	getPostAuthor,
	getPostTerms,
	getWPUrl,
	FetchResponse,
} from '@10up/headless-core';
import { SWRConfiguration } from 'swr';
import { useFetch } from './useFetch';
import { HookResponse } from './types';

interface useSearchResponse extends HookResponse {
	data?: { posts: PostEntity[]; pageInfo: PageInfo };
}

/**
 * The useSearch hook. Returns a collection of search entities
 *
 * @param params - Supported params
 *
 * @returns
 */
export function useSearch(
	params: PostsArchiveParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
): useSearchResponse {
	const { data, error } = useFetch<PostEntity, PostsArchiveParams>(
		{ _embed: true, ...params },
		useSearch.fetcher(),
		options,
	);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
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

useSearch.fetcher = () => new SearchFetchStrategy(getWPUrl());
