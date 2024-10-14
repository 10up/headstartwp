import { PostEntity } from '../types';
import {
	AbstractFetchStrategy,
	EndpointParams,
	FetchOptions,
	FetchResponse,
	NormalizedDataForCache,
} from './AbstractFetchStrategy';
import { PostParams, SinglePostFetchStrategy } from './SinglePostFetchStrategy';
import { PostsArchiveFetchStrategy, PostsArchiveParams } from './PostsArchiveFetchStrategy';
import { FrameworkError, NotFoundError } from '../../utils';

/**
 * The params supported by {@link PostOrPostsFetchStrategy}
 */
export interface PostOrPostsParams extends EndpointParams {
	/**
	 * The `single` params corresponds to {@link PostParams}
	 */
	single: Partial<PostParams>;

	/**
	 * The `archive` params corresponds to {@link PostsArchiveParams}
	 */
	archive: Partial<PostsArchiveParams>;

	/**
	 * The priority indicates which strategy should execute first.
	 */
	priority: 'single' | 'archive';

	/**
	 * How to handle route matching strategy, the possible values are:
	 *
	 * - `single` will only trigger the single strategy if there's a url match for the single strategy
	 * - `archive` will only trigger the archive strategy if there's a url match for the archive strategy
	 * - `both` requires a route match for both single and archive
	 */
	routeMatchStrategy: 'none' | 'single' | 'archive' | 'both';
}

export type PostOrPostsFetchStrategyResult<T> = {
	isSingle: boolean;
	isArchive: boolean;
	data: T | T[];
};

/**
 * This fetch strategy does not support extracting url params from the url
 *
 * @category Data Fetching
 */
export class PostOrPostsFetchStrategy<
	T extends PostEntity = PostEntity,
	P extends PostOrPostsParams = PostOrPostsParams,
	R extends PostOrPostsFetchStrategyResult<T> = PostOrPostsFetchStrategyResult<T>,
> extends AbstractFetchStrategy<T[], P, R> {
	urlParams: Partial<P> = {};

	postStrategy: SinglePostFetchStrategy = new SinglePostFetchStrategy(this.baseURL);

	postsStrategy: PostsArchiveFetchStrategy = new PostsArchiveFetchStrategy(this.baseURL);

	getDefaultEndpoint(): string {
		return '@postOrPosts';
	}

	getParamsFromURL(path: string, params: Partial<P> = {}): Partial<P> {
		this.urlParams = {
			single: this.postStrategy.getParamsFromURL(path, params.single),
			archive: this.postsStrategy.getParamsFromURL(path, params.archive),
		} as P;

		return this.urlParams;
	}

	isMainQuery(path: string, nonUrlParams: Partial<P>): boolean {
		return (
			this.postStrategy.isMainQuery(path, nonUrlParams.single ?? {}) ||
			this.postsStrategy.isMainQuery(path, nonUrlParams.archive ?? {})
		);
	}

	normalizeForCache(data: FetchResponse<R>, params: Partial<P>): NormalizedDataForCache<R, P> {
		const additionalCacheObjects: NormalizedDataForCache<R, P>[] = [];

		if (
			data.result.isArchive &&
			Array.isArray(data.result.data) &&
			typeof params.archive !== 'undefined'
		) {
			const archiveParams = {
				...this.postsStrategy.getDefaultParams(),
				...params.archive,
			};

			additionalCacheObjects.push({
				// @ts-expect-error
				key: this.postsStrategy.getCacheKey(archiveParams),
				data: {
					pageInfo: data.pageInfo,
					queriedObject: data.queriedObject,
					// @ts-expect-error
					result: data.result.data,
				},
			});
		}

		if (
			data.result.isSingle &&
			!Array.isArray(data.result.data) &&
			typeof params.single !== 'undefined'
		) {
			const singleParams = { ...this.postStrategy.getDefaultParams(), ...params.single };
			additionalCacheObjects.push({
				// @ts-expect-error
				key: this.postStrategy.getCacheKey(singleParams),
				data: {
					pageInfo: data.pageInfo,
					queriedObject: data.queriedObject,
					// @ts-expect-error
					result: data.result.data,
				},
			});
		}
		return {
			key: this.getCacheKey(params),
			data: {
				...data,
				result: {
					isSingle: data.result.isSingle,
					isArchive: data.result.isArchive,
				} as R,
			},
			additionalCacheObjects,
		};
	}

	async fetchSingle(url: string, params: PostParams, options?: Partial<FetchOptions>) {
		const results = await this.postStrategy.fetcher(url, params, options);

		return {
			...results,
			result: {
				isArchive: false,
				isSingle: true,
				data: results.result,
			} as R,
		};
	}

	async fetchArchive(url: string, params: PostsArchiveParams, options?: Partial<FetchOptions>) {
		const results = await this.postsStrategy.fetcher(url, params, options);

		return {
			...results,
			result: {
				isArchive: true,
				isSingle: false,
				data: results.result,
			} as R,
		};
	}

	async fetcher(
		url: string,
		params: Partial<P>,
		options?: Partial<FetchOptions>,
	): Promise<FetchResponse<R>> {
		const routeMatchStrategy = params.routeMatchStrategy ?? 'single';
		const unmatchedRouteErrorMsg = `Unmatched route with routeMatchStrategy '${routeMatchStrategy}': Unable to match a route for either single or archive`;

		const didMatchSingle = Object.keys(this.urlParams?.single ?? {}).length > 0;
		const didMatchArchive = Object.keys(this.urlParams?.archive ?? {}).length > 0;

		const hasToMatchSingle = routeMatchStrategy === 'single' || routeMatchStrategy === 'both';
		const hasToMatchArchive = routeMatchStrategy === 'archive' || routeMatchStrategy === 'both';

		const shouldFetchSingle = (hasToMatchSingle && didMatchSingle) || !hasToMatchSingle;

		const shouldFetchArchive = (hasToMatchArchive && didMatchArchive) || !hasToMatchArchive;

		const archiveParams = {
			...this.postsStrategy.getDefaultParams(),
			...params.archive,
		};
		const singleParams = { ...this.postStrategy.getDefaultParams(), ...params.single };

		const archiveURL = this.postsStrategy.buildEndpointURL(archiveParams);
		const singleURL = this.postStrategy.buildEndpointURL(singleParams);

		let error;

		if (params.priority === 'single') {
			if (shouldFetchSingle) {
				try {
					return await this.fetchSingle(singleURL, singleParams, options);
				} catch (e) {
					error = e;
					// do nothing
				}
			}

			if (shouldFetchArchive) {
				try {
					return await this.fetchArchive(archiveURL, archiveParams, options);
				} catch (e) {
					if (e instanceof Error) {
						throw new AggregateError(
							[error, e],
							`Neither single or archive returned data: ${error?.message}, ${e.message}`,
						);
					}
				}
			}

			// if something was fetched and it threw a NotFoundError
			if (error instanceof NotFoundError) {
				throw error;
			}

			throw new FrameworkError(unmatchedRouteErrorMsg);
		}

		if (shouldFetchArchive) {
			try {
				return await this.fetchArchive(archiveURL, archiveParams, options);
			} catch (e) {
				error = e;
			}
		}

		if (shouldFetchSingle) {
			try {
				return await this.fetchSingle(singleURL, singleParams, options);
			} catch (e) {
				if (e instanceof Error) {
					throw new AggregateError(
						[error, e],
						`Neither single or archive returned data: ${error?.message}, ${e.message}`,
					);
				}
			}
		}

		// if something was fetched and it threw a NotFoundError
		if (error instanceof NotFoundError) {
			throw error;
		}

		throw new FrameworkError(unmatchedRouteErrorMsg);
	}
}
