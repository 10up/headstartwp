import { PostEntity, PostsArchiveParams, PostsArchiveFetchStrategy } from '@10up/headless-core';
import { useFetch } from './useFetch';
import { HookResponse } from './types';

const endpoint = '/wp-json/wp/v2/posts';

interface usePostsResponse extends HookResponse {
	data?: { posts: PostEntity[] };
}

const fetchStrategy = new PostsArchiveFetchStrategy();

/**
 * The usePost hook. Returns a collection of post entities
 *
 * @param params - Supported params
 *
 * @returns
 */
export function usePosts(params: PostsArchiveParams): usePostsResponse {
	const { data: posts, error } = useFetch<PostEntity, PostsArchiveParams>(
		endpoint,
		{ _embed: true, ...params },
		fetchStrategy,
	);

	if (error) {
		return { error, loading: false };
	}

	if (!posts) {
		return { loading: true };
	}

	// TODO: fix types
	return { data: { posts: posts as unknown as PostEntity[] }, loading: false };
}
