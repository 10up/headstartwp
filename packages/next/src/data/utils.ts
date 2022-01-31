import {
	SinglePostFetchStrategy,
	PostsArchiveFetchStrategy,
	getWPUrl,
	fetchRedirect,
	SearchFetchStrategy,
	AppSettingsStrategy,
} from '@10up/headless-core';
import { getHeadlessConfig } from '@10up/headless-core/utils';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

type HookType = 'usePosts' | 'usePost' | 'useSearch' | 'useAppSettings';

const strategies = {
	usePosts: PostsArchiveFetchStrategy,
	usePost: SinglePostFetchStrategy,
	useSearch: SearchFetchStrategy,
	useAppSettings: AppSettingsStrategy,
};

const endpoints = {
	usePosts: '/wp-json/wp/v2/posts',
	usePost: '/wp-json/wp/v2/posts',
	useSearch: '/wp-json/wp/v2/search',
	useAppSettings: '/wp-json/headless-wp/v1/app',
};

export async function fetchHookData(type: HookType, ctx: GetServerSidePropsContext, params) {
	const wpURL = getWPUrl();
	const Strategy = strategies[type];
	const fetchStrategy = new Strategy();
	const endpoint = endpoints[type];

	fetchStrategy.setBaseURL(wpURL);
	fetchStrategy.setEndpoint(endpoint);

	const urlParams = fetchStrategy.getParamsFromURL(ctx.query);
	const finalParams = { _embed: true, ...urlParams, ...params };

	const endpointUrl = fetchStrategy.buildEndpointURL(finalParams);
	const data = await fetchStrategy.fetcher(endpointUrl, finalParams);

	return { key: endpointUrl, data };
}

type HookState = {
	key: string;
	data: any;
};

export function addHookData(hookStates: HookState[], nextProps) {
	const { props = {}, ...rest } = nextProps;
	const fallback = {};
	let seo_json = {};
	let yoast_head = '';

	hookStates.forEach((hookState) => {
		const { key, data } = hookState;

		// take yoast_seo data
		seo_json = data?.yoast_head_json || data?.[0]?.yoast_head_json || seo_json;
		yoast_head = data?.yoast_head || data?.[0]?.yoast_head || yoast_head;

		fallback[key] = data;
	});

	return {
		...rest,
		props: {
			...props,
			seo: {
				yoast_head_json: seo_json,
				yoast_head,
			},
			fallback,
		},
	};
}

export async function handleError(
	error: Error,
	ctx: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{}>> {
	const { redirectStrategy } = getHeadlessConfig();

	if (redirectStrategy === '404' && ctx.req.url) {
		const redirect = await fetchRedirect(ctx.req.url);

		if (redirect.location) {
			return {
				redirect: {
					destination: redirect.location,
					permanent: false,
				},
			};
		}
	}

	if (error instanceof Error) {
		console.log(error);
		return { notFound: true };
	}

	return { notFound: true };
}
