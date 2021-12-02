import { SinglePostFetchStrategy, PostsArchiveFetchStrategy, getWPUrl } from '@10up/headless-core';
import { GetServerSidePropsContext } from 'next';

type HookType = 'usePosts' | 'usePost';

const strategies = {
	usePosts: PostsArchiveFetchStrategy,
	usePost: SinglePostFetchStrategy,
};

const endpoints = {
	usePosts: '/wp-json/wp/v2/posts',
	usePost: '/wp-json/wp/v2/posts',
};

export async function fetchHookData(type: HookType, ctx: GetServerSidePropsContext, params) {
	const wpURL = getWPUrl();
	const Strategy = strategies[type];
	const fetchStrategy = new Strategy();
	const endpoint = endpoints[type];

	fetchStrategy.setBaseURL(wpURL);
	fetchStrategy.setEndpoint(endpoint);

	const urlParams = fetchStrategy.getParamsFromURL(ctx.query);
	const finalParams = { ...urlParams, ...params };
	const endpointUrl = fetchStrategy.buildEndpointURL(finalParams);
	const data = await fetchStrategy.fetcher(endpointUrl);

	return { key: endpointUrl, data };
}

type HookState = {
	key: string;
	data: any;
};

export function addHookData(hookState: HookState, nextProps) {
	const { key, data } = hookState;
	const { props = {}, ...rest } = nextProps;

	return {
		...rest,
		props: {
			...props,
			fallback: {
				[key]: data,
			},
		},
	};
}
