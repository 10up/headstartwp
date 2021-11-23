import { GetServerSidePropsContext } from 'next';

import { PostEntity } from '../types';
import { PostParams, SinglePostFetchStrategy } from './strategies/SinglePostFetchStrategy';
import { useFetch } from './useFetch';

const endpoint = '/wp-json/wp/v2/posts';

interface usePostResponse {
	data?: { post: PostEntity };
	error?: string;
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
	console.log(data, error);
	if (!data || error) {
		return { error };
	}

	return { data: { post: data[0] } };
}

/**
 * Utility method to fetch data for usePost in getServerSideProps
 *
 * @param context
 * @param params
 * @returns
 */
export async function fetchSinglePostSSR(
	context: GetServerSidePropsContext,
	params: PostParams = {},
) {
	const wpURL = context.req.headers['X-WP-Url'];
	const fullEndpoint = `${wpURL}/${endpoint}`;
	fetchStrategy.setEndpoint(fullEndpoint);

	const urlParams = fetchStrategy.getParamsFromURL(context.query);
	const finalParams = { ...urlParams, params };
	const endpointUrl = fetchStrategy.buildEndpointURL(finalParams);

	const data = await fetchStrategy.fetcher(endpointUrl);
	return { key: endpoint, data };
}

/**
 * Utility method to fetch data for usePosts in getStaticProps
 *
 * @param context
 * @param params
 * @returns
 */
/* export async function fetchSinglePostSSG(context: GetStaticPropsContext, params: PostParams = {}) {
	const wpURL = context.req.headers['X-WP-Url'];
	const fullEndpoint = `${wpURL}/${endpoint}`;
	fetchStrategy.setEndpoint(fullEndpoint);

	const urlParams = fetchStrategy.getParamsFromURL(context.params);
	const finalParams = { ...urlParams, params };
	const endpointUrl = fetchStrategy.buildEndpointURL(finalParams);

	const data = await fetchStrategy.fetcher(endpointUrl);
	return { key: endpoint, data };
} */
