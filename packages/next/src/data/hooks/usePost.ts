import { GetServerSidePropsContext } from 'next';

import { getWPUrl, PostEntity, PostParams, SinglePostFetchStrategy } from '@10up/headless-core';
import { useFetch } from './useFetch';

const endpoint = '/wp-json/wp/v2/posts';

interface usePostResponse {
	data?: { post: PostEntity };
	error?: string;
	loading: boolean;
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

	return { data: { post: data[0] as PostEntity }, loading: false };
}

/**
 * Utility method to fetch data for usePost in getServerSideProps
 *
 * @param context
 * @param params
 * @returns
 */
export async function fetchSinglePostServerSide(
	context: GetServerSidePropsContext,
	params: PostParams = {},
) {
	const wpURL = getWPUrl();
	const fullEndpoint = `${wpURL}/${endpoint}`;
	fetchStrategy.setEndpoint(fullEndpoint);
	const urlParams = fetchStrategy.getParamsFromURL(context.query);
	const finalParams = { ...urlParams, ...params };
	const endpointUrl = fetchStrategy.buildEndpointURL(finalParams);
	const data = await fetchStrategy.fetcher(endpointUrl);

	return { key: endpointUrl, data };
}
