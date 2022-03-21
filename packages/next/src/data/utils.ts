import {
	getWPUrl,
	fetchRedirect,
	NotFoundError,
	FilterDataOptions,
	AbstractFetchStrategy,
	Entity,
	EndpointParams,
	FetchResponse,
} from '@10up/headless-core';
import { getHeadlessConfig } from '@10up/headless-core/utils';
import { GetServerSidePropsContext, GetServerSidePropsResult, GetStaticPropsContext } from 'next';

export interface FetchHookDataOptions {
	params?: any;
	filterData?: FilterDataOptions;
}

/**
 * Creates a path from array of arguments
 *
 * @param args - Array of catch-all arguments
 *
 * @returns path
 */
export function convertToPath(args: string[] | undefined) {
	if (!args) {
		return '/';
	}

	return `/${args.join('/')}`;
}

export async function fetchHookData(
	fetchStrategy: AbstractFetchStrategy<Entity, EndpointParams>,
	ctx: GetServerSidePropsContext | GetStaticPropsContext,
	options: FetchHookDataOptions = {},
) {
	const wpURL = getWPUrl();
	const params = options?.params || {};
	const filterDataOptions = options?.filterData || { method: 'ALLOW', fields: ['*'] };

	fetchStrategy.setBaseURL(wpURL);

	let path: string[] = [];

	if (ctx.params) {
		path = Array.isArray(ctx.params.path) ? ctx.params.path : [ctx.params.path || ''];
	}

	const urlParams = fetchStrategy.getParamsFromURL(convertToPath(path));
	const finalParams = { _embed: true, ...urlParams, ...params };

	// we don't want to include the preview params in the key
	const endpointUrlForKey = fetchStrategy.buildEndpointURL(finalParams);

	const isPreviewRequest =
		typeof urlParams.slug === 'string' ? urlParams.slug.includes('-preview=true') : false;

	if (ctx.preview && ctx.previewData && isPreviewRequest) {
		// @ts-expect-error (TODO: fix this)
		finalParams.id = ctx.previewData.id;
		// @ts-expect-error (TODO: fix this)
		finalParams.revision = ctx.previewData.revision;
		// @ts-expect-error (TODO: fix this)
		finalParams.postType = ctx.previewData.postType;
		// @ts-expect-error (TODO: fix this)
		finalParams.authToken = ctx.previewData.authToken;
	}

	const data = await fetchStrategy.fetcher(
		fetchStrategy.buildEndpointURL(finalParams),
		finalParams,
	);

	return { key: endpointUrlForKey, data: fetchStrategy.filterData(data, filterDataOptions) };
}

type HookState = {
	key: string;
	data: FetchResponse<{ yoast_head_json: {}; yoast_head: {} }>;
};

export function addHookData(hookStates: HookState[], nextProps) {
	const { props = {}, ...rest } = nextProps;
	const fallback = {};
	let seo_json = {};
	let yoast_head = '';

	hookStates.forEach((hookState) => {
		const { key, data } = hookState;

		// take yoast_seo data
		seo_json = data.result?.yoast_head_json || data.result?.[0]?.yoast_head_json || seo_json;
		yoast_head = data.result?.yoast_head || data.result?.[0]?.yoast_head || yoast_head;

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
