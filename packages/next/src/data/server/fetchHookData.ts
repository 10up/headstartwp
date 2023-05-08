import {
	AbstractFetchStrategy,
	EndpointParams,
	FetchOptions,
	FilterDataOptions,
	LOGTYPE,
	PostParams,
	log,
} from '@headstartwp/core';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { unstable_serialize } from 'swr';
import { PreviewData } from '../../handlers/types';
import { convertToPath } from '../convertToPath';
import { getSiteFromContext } from './getSiteFromContext';

/**
 * The supported options for {@link fetchHookData}
 */
export interface FetchHookDataOptions<P = unknown, T = unknown> {
	/**
	 * This should match params passed to the hook on the client side.
	 */
	params?: P;

	/**
	 * Optional. If set, the data will be filtered given {@link FilterDataOptions}
	 */
	filterData?: FilterDataOptions<T>;

	/**
	 * Optional. If set, will fowardh fetch options to the fetch strategy
	 */
	fetchStrategyOptions?: FetchOptions;
}

function isPreviewRequest<P>(params: P, urlParams: P): params is P & PostParams {
	const postUrlParams = urlParams as unknown as PostParams;
	const nonUrlParams = params as unknown as PostParams;

	const isPreviewRequestBasedOnNonUrlParams =
		typeof nonUrlParams.slug === 'string' ? nonUrlParams.slug.includes('-preview=true') : false;

	const isPreviewRequest =
		typeof postUrlParams.slug === 'string'
			? postUrlParams.slug.includes('-preview=true')
			: isPreviewRequestBasedOnNonUrlParams;

	return isPreviewRequest;
}

/**
 * A function that implementeds data fetching on the server. This should be used in `getServerSideProps`
 * or `getStaticProps`.
 *
 * Data fetching will be perfomed by the specified strategy and URL params will be automatically extracted
 * from `context
 *
 * ## Usage
 *
 * ```ts
 * export async function getServerSideProps(context) {
 *	try {
 * 		const usePostsHook = await fetchHookData(usePosts.fetcher(),context);
 *
 *		return addHookData([usePostsHook], {});
 *	} catch (e) {
 *		return handleError(e, context);
 *	}
 * }
 * ```
 *
 * @param fetchStrategy The fetch strategy to use. Typically this is exposed by the hook e.g: `usePosts.fetcher()`
 * @param ctx The Next.js context, either the one from `getServerSideProps` or `getStaticProps`
 * @param options See {@link FetchHookDataOptions}
 *
 * @returns An object with a key of `data` and a value of the fetched data.
 *
 * @category Next.js Data Fetching Utilities
 */
export async function fetchHookData<T = unknown, P extends EndpointParams = EndpointParams, R = T>(
	fetchStrategy: AbstractFetchStrategy<T, P, R>,
	ctx: GetServerSidePropsContext<any, PreviewData> | GetStaticPropsContext<any, PreviewData>,
	options: FetchHookDataOptions<P, T> = {},
) {
	const { sourceUrl, integrations, debug } = getSiteFromContext(ctx);
	const params: Partial<P> = options?.params || {};

	fetchStrategy.setBaseURL(sourceUrl);

	let path: string[] = [];

	if (ctx.params) {
		path = Array.isArray(ctx.params.path) ? ctx.params.path : [ctx.params.path || ''];
	}

	if (integrations?.polylang?.enable && (ctx.locale || ctx.defaultLocale)) {
		params.lang = ctx.locale ?? ctx.defaultLocale;
	}

	const stringPath = convertToPath(path);
	const defaultParams = fetchStrategy.getDefaultParams();
	const urlParams = fetchStrategy.getParamsFromURL(stringPath, params);
	const finalParams = { ...defaultParams, ...urlParams, ...params };

	// we don't want to include the preview params in the key
	const key = { url: fetchStrategy.getEndpoint(), args: { ...finalParams, sourceUrl } };

	if (debug?.devMode) {
		log(LOGTYPE.INFO, `[fetchHookData] key for  ${key.url}`, key);
	}

	if (
		isPreviewRequest(finalParams, urlParams) &&
		typeof ctx.preview !== 'undefined' &&
		typeof ctx.previewData !== 'undefined'
	) {
		finalParams.id = ctx.previewData.id;
		finalParams.revision = ctx.previewData.revision;
		finalParams.postType = ctx.previewData.postType;
		finalParams.authToken = ctx.previewData.authToken;

		if (debug?.requests) {
			log(LOGTYPE.DEBUG, 'Preview request detected, using preview data', ctx.previewData);
		}
	}

	const data = await fetchStrategy.fetcher(
		fetchStrategy.buildEndpointURL(finalParams),
		finalParams,
		options.fetchStrategyOptions,
	);

	if (debug?.devMode) {
		log(LOGTYPE.INFO, `[fetchHookData] data.pageInfo for ${key.url}`, data.pageInfo);
	}

	return {
		key: unstable_serialize(key),
		data: fetchStrategy.filterData(data, options.filterData as unknown as FilterDataOptions<R>),
		isMainQuery: fetchStrategy.isMainQuery(stringPath, params),
	};
}
