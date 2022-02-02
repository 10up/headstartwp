import {
	SinglePostFetchStrategy,
	PostsArchiveFetchStrategy,
	getWPUrl,
	fetchRedirect,
	SearchFetchStrategy,
	AppSettingsStrategy,
	NotFoundError,
} from '@10up/headless-core';
import { getHeadlessConfig } from '@10up/headless-core/utils';
import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPropsContext } from 'next';

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

export async function fetchHookData(
	type: HookType,
	ctx: GetServerSidePropsContext | GetStaticPropsContext,
	params,
) {
	const wpURL = getWPUrl();
	const Strategy = strategies[type];
	const fetchStrategy = new Strategy();
	const endpoint = endpoints[type];

	fetchStrategy.setBaseURL(wpURL);
	fetchStrategy.setEndpoint(endpoint);

	const urlParams = fetchStrategy.getParamsFromURL(ctx.params);
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

function isStringArray(el): el is string[] {
	return Array.isArray(el);
}

export async function handleError(
	error: Error,
	ctx: GetServerSidePropsContext,
	rootRoute: string = '',
): Promise<GetServerSidePropsResult<{}>> {
	const { redirectStrategy } = getHeadlessConfig();

	if (error instanceof NotFoundError) {
		let pathname = '';
		if (typeof ctx?.req?.url !== 'undefined') {
			pathname = ctx.req.url;
		} else {
			// build out the url from params.path
			pathname =
				typeof ctx?.params !== 'undefined' && isStringArray(ctx.params?.path)
					? `${rootRoute}/${ctx.params.path.join('/')}`
					: `${rootRoute}/${ctx.params?.path as string}`;
		}

		if (redirectStrategy === '404' && pathname) {
			const redirect = await fetchRedirect(pathname);

			if (redirect.location) {
				return {
					redirect: {
						destination: redirect.location,
						permanent: false,
					},
				};
			}
		}

		return { notFound: true };
	}

	throw error;
}
