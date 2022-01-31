import { PostEntity, PostsArchiveParams, PostsArchiveFetchStrategy } from '@10up/headless-core';
import { getPostAuthor, getPostTerms } from '@10up/headless-core/data';
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

	const posts = (data as unknown as PostEntity[]).map((post) => {
		post.author = getPostAuthor(post);
		post.terms = getPostTerms(post);

		return post;
	});

	// TODO: fix types
	// TODO: add flags indicating route
	return { data: { posts }, loading: false };
}
