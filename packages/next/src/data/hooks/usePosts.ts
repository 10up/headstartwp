import { GetServerSidePropsContext } from 'next';

import {
	getWPUrl,
	PostEntity,
	PostsArchiveParams,
	PostsArchiveFetchStrategy,
} from '@10up/headless-core';
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
		params,
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

/**
 * Utility method to fetch data for usePosts on the server
 *
 * @param context
 * @param params
 *
 * @returns
 */
export async function fetchPostsArchiveServerSide(
	context: GetServerSidePropsContext,
	params: PostsArchiveParams,
) {
	const wpURL = getWPUrl();

	fetchStrategy.setBaseURL(wpURL);
	fetchStrategy.setEndpoint(endpoint);
	const urlParams = fetchStrategy.getParamsFromURL(context.query);
	const finalParams = { ...urlParams, ...params };
	const endpointUrl = fetchStrategy.buildEndpointURL(finalParams);
	const data = await fetchStrategy.fetcher(endpointUrl);

	return { key: endpointUrl, data };
}
