import {
	SearchFetchStrategy,
	PostEntity,
	PostsArchiveParams,
	PageInfo,
	getPostAuthor,
	getPostTerms,
} from '@10up/headless-core';
import { useFetch } from './useFetch';
import { HookResponse } from './types';

const endpoint = '/wp-json/wp/v2/posts';

interface useSearchResponse extends HookResponse {
	data?: { posts: PostEntity[]; pageInfo: PageInfo };
}

const fetchStrategy = new SearchFetchStrategy();

/**
 * The useSearch hook. Returns a collection of search entities
 *
 * @param params - Supported params
 *
 * @returns
 */
export function useSearch(params: PostsArchiveParams): useSearchResponse {
	const { data, error } = useFetch<PostEntity, PostsArchiveParams>(
		endpoint,
		{ _embed: true, ...params },
		fetchStrategy,
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
