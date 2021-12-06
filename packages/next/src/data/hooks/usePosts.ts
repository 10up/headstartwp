import {
	PostEntity,
	PostsArchiveParams,
	PostsArchiveFetchStrategy,
	useSettings,
} from '@10up/headless-core';
import { useRouter } from 'next/router';
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
	const { url } = useSettings();

	fetchStrategy.setBaseURL(url);
	fetchStrategy.setEndpoint(endpoint);

	const { query } = useRouter();
	const urlParams = fetchStrategy.getParamsFromURL(query);
	const finalParams = { ...urlParams, ...params };

	/* const { data: categoryObject } = useSWR(
		() => `${categoryEndpoint}?slug=${finalParams.category}`,
	); */

	/* const shouldFetch = () =>
		typeof finalParams.category !== 'undefined' && typeof categoryObject !== 'undefined';

	if (shouldFetch()) {
		finalParams.category = categoryObject[0]?.id;
	} */

	const { data: posts, error } = useFetch<PostEntity, PostsArchiveParams>(
		endpoint,
		finalParams,
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
