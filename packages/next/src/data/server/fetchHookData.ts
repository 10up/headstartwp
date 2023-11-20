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
import { serializeKey } from '@headstartwp/core/react';
import deepmerge from 'deepmerge';
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
	 * Optional. If set, will forward fetch options to the fetch strategy
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
 * A function that implements data fetching on the server. This should be used in `getServerSideProps`
 * or `getStaticProps`.
 *
 * Data fetching will be performed by the specified strategy and URL params will be automatically extracted
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

	const finalParams = deepmerge.all([defaultParams, urlParams, params]) as Partial<P>;

	// we don't want to include the preview params in the key
	const key = fetchStrategy.getCacheKey(finalParams);

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
		{
			// burst cache to skip REST API cache when the request is being made under getStaticProps
			// if .req is not available then this is a GetStaticPropsContext
			burstCache: typeof (ctx as GetServerSidePropsContext).req === 'undefined',
			...options.fetchStrategyOptions,
		},
	);

	if (debug?.devMode) {
		log(LOGTYPE.INFO, `[fetchHookData] data.pageInfo for ${key.url}`, data.pageInfo);
	}

	const normalizedData = fetchStrategy.normalizeForCache(
		fetchStrategy.filterData(data, options.filterData as unknown as FilterDataOptions<R>),
		finalParams,
	);

	let additionalCacheObjects;

	if (normalizedData.additionalCacheObjects) {
		additionalCacheObjects = normalizedData.additionalCacheObjects.map((cacheObject) => ({
			...cacheObject,
			key: serializeKey(cacheObject.key),
			isMainQuery: fetchStrategy.isMainQuery(stringPath, params),
		}));
	}

	return {
		...normalizedData,
		key: serializeKey(key),
		isMainQuery: fetchStrategy.isMainQuery(stringPath, params),
		additionalCacheObjects: additionalCacheObjects || null,
	};
}
