import { PostEntity, PostParams, SinglePostFetchStrategy } from '@10up/headless-core';
import { useFetch } from './useFetch';
import { HookResponse } from './types';

const endpoint = '/wp-json/wp/v2/posts';

interface usePostResponse extends HookResponse {
	data?: { post: PostEntity };
}

const fetchStrategy = new SinglePostFetchStrategy();

/**
 * The usePost hook. Returns a single post entity
 *
 * @param params - Supported params
 *
 * @returns
 */
export function usePost(params: PostParams): usePostResponse {
	const { data, error } = useFetch<PostEntity, PostParams>(endpoint, params, fetchStrategy);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	// TODO: fix types
	return { data: { post: data[0] as PostEntity }, loading: false };
}
