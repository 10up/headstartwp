import {
	AbstractFetchStrategy,
	EndpointParams,
	FetchOptions,
	FetchResponse,
	FetchStrategyCacheConfig,
	FilterDataOptions,
	LOGTYPE,
	PostParams,
	log,
} from '@headstartwp/core';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { serializeKey } from '@headstartwp/core/react';
import { all as merge } from 'deepmerge';
import { PreviewData } from '../../handlers/types';
import { convertToPath } from '../convertToPath';
import { getSiteFromContext } from './getSiteFromContext';
import defaultCacheHandler from './cache';

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
	fetchStrategyOptions?: Partial<FetchOptions>;

	/**
	 * Controls server-side caching
	 */
	cache?: FetchStrategyCacheConfig;
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
 * Prepares all the things for fetchHookData
 *
 * @param fetchStrategy The fetch strategy to use. Typically this is exposed by the hook e.g: `usePosts.fetcher()`
 * @param ctx The Next.js context, either the one from `getServerSideProps` or `getStaticProps`
 * @param options See {@link FetchHookDataOptions}
 *
 * @returns The various things fetchHookData needs
 */
export function prepareFetchHookData<T = unknown, P extends EndpointParams = EndpointParams, R = T>(
	fetchStrategy: AbstractFetchStrategy<T, P, R>,
	ctx: GetServerSidePropsContext<any, PreviewData> | GetStaticPropsContext<any, PreviewData>,
	options: FetchHookDataOptions<P, T> = {},
) {
	const { sourceUrl, integrations, cache: globalCacheConfig } = getSiteFromContext(ctx);

	const cacheConfig = merge<FetchStrategyCacheConfig>([
		{
			enabled: false,
			ttl: 5 * 60 * 100,
			cacheHandler: defaultCacheHandler,
		},
		globalCacheConfig ?? {},
		options.cache ?? {},
	]);

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

	const finalParams = merge([defaultParams, urlParams, params]) as Partial<P>;

	const isCacheEnabled =
		typeof cacheConfig?.enabled === 'boolean'
			? cacheConfig.enabled
			: cacheConfig?.enabled({
					fetchStrategy,
					params: finalParams,
					fetchStrategyOptions: options.fetchStrategyOptions,
					path: stringPath,
			  });

	const shouldSkipCache = ctx.preview;

	const shouldCache = isCacheEnabled && !shouldSkipCache;
	const ttl = typeof cacheConfig?.ttl !== 'undefined' ? cacheConfig.ttl : 5 * 60 * 1000;
	const cacheTTL =
		typeof ttl === 'number'
			? ttl
			: ttl({
					fetchStrategy,
					params: finalParams,
					fetchStrategyOptions: options.fetchStrategyOptions,
					path: stringPath,
			  });

	return {
		cacheKey: fetchStrategy.getCacheKey(finalParams),
		params: finalParams,
		urlParams,
		path: stringPath,
		cache: {
			enabled: shouldCache,
			ttl: cacheTTL,
			cacheHandler: cacheConfig?.cacheHandler,
			beforeSet: cacheConfig?.beforeSet,
			afterGet: cacheConfig?.afterGet,
		},
	};
}

/**
 * A function that implements data fetching on the server. This should be used in `getServerSideProps`
 * or `getStaticProps`.
 *
 * Data fetching will be performed by the specified strategy and URL params will be automatically extracted
 * from `context
 *
 * #### Usage
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
 * }´
 * ```
 *
 * @param fetchStrategy The fetch strategy to use. Typically this is exposed by the hook e.g: `usePosts.fetcher()`
 * @param ctx The Next.js context, either the one from `getServerSideProps` or `getStaticProps`
 * @param options See {@link FetchHookDataOptions}
 
 * @returns An object with a key of `data` and a value of the fetched data.
 *
 * @category Next.js Data Fetching Utilities
 */
export async function fetchHookData<T = unknown, P extends EndpointParams = EndpointParams, R = T>(
	fetchStrategy: AbstractFetchStrategy<T, P, R>,
	ctx: GetServerSidePropsContext<any, PreviewData> | GetStaticPropsContext<any, PreviewData>,
	options: FetchHookDataOptions<P, T> = {},
) {
	const {
		cacheKey: key,
		params,
		urlParams,
		path,
		cache,
	} = prepareFetchHookData(fetchStrategy, ctx, options);

	const { debug, preview } = getSiteFromContext(ctx);

	if (debug?.devMode) {
		log(LOGTYPE.INFO, `[fetchHookData] key for  ${key.url}`, key);
	}

	if (
		isPreviewRequest(params, urlParams) &&
		typeof ctx.preview !== 'undefined' &&
		typeof ctx.previewData !== 'undefined'
	) {
		params.id = ctx.previewData.id;
		params.revision = ctx.previewData.revision;
		params.postType = ctx.previewData.postType;
		params.authToken = ctx.previewData.authToken;

		if (debug?.requests) {
			log(LOGTYPE.DEBUG, 'Preview request detected, using preview data', ctx.previewData);
		}

		if (preview?.alternativeAuthorizationHeader) {
			if (debug?.devMode) {
				log(LOGTYPE.INFO, `Using alternativeAuthorization header for ${key.url}`);
			}

			if (!options.fetchStrategyOptions) {
				options.fetchStrategyOptions = {};
			}

			options.fetchStrategyOptions.alternativePreviewAuthorizationHeader = true;
		}
	}

	let data: FetchResponse<R> | null = null;
	const cacheKey = serializeKey(key);

	if (cache.enabled && cache.cacheHandler) {
		data = (await cache.cacheHandler.get(cacheKey)) as FetchResponse<R>;

		if (data) {
			if (debug?.devMode) {
				log(LOGTYPE.INFO, `[fetchHookData] cache hit for ${cacheKey}`);
			}

			if (typeof cache.afterGet === 'function') {
				data = await cache.afterGet(
					{
						fetchStrategy,
						params,
						fetchStrategyOptions: options.fetchStrategyOptions,
						path,
					},
					data,
				);
			}
		} else if (debug?.devMode) {
			log(LOGTYPE.INFO, `[fetchHookData] cache miss for ${cacheKey}`);
		}
	}

	if (!data) {
		data = await fetchStrategy.fetcher(fetchStrategy.buildEndpointURL(params), params, {
			// burst cache to skip REST API cache when the request is being made under getStaticProps
			// if .req is not available then this is a GetStaticPropsContext
			burstCache: typeof (ctx as GetServerSidePropsContext).req === 'undefined',
			...options.fetchStrategyOptions,
		});

		if (cache.enabled && cache.cacheHandler) {
			if (debug?.devMode) {
				log(LOGTYPE.INFO, `[fetchHookData] cache store for ${cacheKey}`);
			}

			if (typeof cache.beforeSet === 'function') {
				data = await cache.beforeSet(
					{
						fetchStrategy,
						params,
						fetchStrategyOptions: options.fetchStrategyOptions,
						path,
					},
					data,
				);
			}

			await cache.cacheHandler.set(cacheKey, data, cache.ttl);
		}
	}

	if (debug?.devMode) {
		log(LOGTYPE.INFO, `[fetchHookData] data.pageInfo for ${key.url}`, data.pageInfo);
	}

	const normalizedData = fetchStrategy.normalizeForCache(
		fetchStrategy.filterData(data, options.filterData as unknown as FilterDataOptions<R>),
		params,
	);

	let additionalCacheObjects;

	if (normalizedData.additionalCacheObjects) {
		additionalCacheObjects = normalizedData.additionalCacheObjects.map((cacheObject) => ({
			...cacheObject,
			key: serializeKey(cacheObject.key),
			isMainQuery: fetchStrategy.isMainQuery(path, params),
		}));
	}

	return {
		...normalizedData,
		key: cacheKey,
		isMainQuery: fetchStrategy.isMainQuery(path, params),
		additionalCacheObjects: additionalCacheObjects || null,
	};
}
