import { PostEntity } from '../types';
import {
	AbstractFetchStrategy,
	EndpointParams,
	FetchOptions,
	FetchResponse,
} from './AbstractFetchStrategy';
import { PostParams, SinglePostFetchStrategy } from './SinglePostFetchStrategy';
import { PostsArchiveFetchStrategy, PostsArchiveParams } from './PostsArchiveFetchStrategy';

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
	routeMatchStrategy: 'single' | 'archive' | 'both';
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
	T extends PostEntity,
	P extends PostOrPostsParams,
	R extends PostOrPostsFetchStrategyResult<T>,
> extends AbstractFetchStrategy<T[], P, R> {
	urlParams: Partial<P> = {};

	postStrategy: SinglePostFetchStrategy = new SinglePostFetchStrategy(this.baseURL);

	postsStrategy: PostsArchiveFetchStrategy = new PostsArchiveFetchStrategy(this.baseURL);

	getDefaultEndpoint(): string {
		return '/@postOrPosts';
	}

	getParamsFromURL(path: string, params: Partial<P> = {}): Partial<P> {
		this.urlParams = {
			single: this.postStrategy.getParamsFromURL(path, params.single),
			archive: this.postsStrategy.getParamsFromURL(path, params.archive),
		} as P;

		return this.urlParams;
	}

	async fetcher(
		url: string,
		params: Partial<P>,
		options?: Partial<FetchOptions>,
	): Promise<FetchResponse<R>> {
		const routeMatchStrategy = params.routeMatchStrategy ?? 'single';

		const didMatchSingle = Object.keys(this.urlParams?.single ?? {}).length > 0;
		const didMatchArchive = Object.keys(this.urlParams?.archive ?? {}).length > 0;

		const hasToMatchSingle = routeMatchStrategy === 'single' || routeMatchStrategy === 'both';
		const hasToMatchArchive = routeMatchStrategy === 'archive' || routeMatchStrategy === 'both';

		const shouldFetchSingle = (hasToMatchSingle && didMatchSingle) || !hasToMatchSingle;
		const shouldFetchArchive = (hasToMatchArchive && didMatchArchive) || !hasToMatchArchive;

		if (params.priority === 'single') {
			if (shouldFetchSingle) {
				try {
					const results = await this.postStrategy.fetcher(
						this.postStrategy.buildEndpointURL(params.single ?? {}),
						params.single ?? {},
						options,
					);

					return {
						...results,
						result: {
							isArchive: false,
							isSingle: true,
							data: results.result,
						} as R,
					};
				} catch (e) {
					// do nothing
				}
			}

			// TODO: capture potentiall error and throw a better error message
			if (shouldFetchArchive) {
				const results = await this.postsStrategy.fetcher(
					this.postsStrategy.buildEndpointURL(params.archive ?? {}),
					params.archive ?? {},
					options,
				);

				return {
					...results,
					result: {
						isArchive: true,
						isSingle: false,
						data: results.result,
					} as R,
				};
			}

			throw new Error('Unmatched route');
		}

		if (shouldFetchArchive) {
			try {
				const results = await this.postsStrategy.fetcher(
					this.postsStrategy.buildEndpointURL(params.archive ?? {}),
					params.archive ?? {},
					options,
				);

				return {
					...results,
					result: {
						isArchive: true,
						isSingle: false,
						data: results.result,
					} as R,
				};
			} catch (e) {
				// do nothing
			}
		}

		if (shouldFetchSingle) {
			const results = await this.postStrategy.fetcher(
				this.postStrategy.buildEndpointURL(params.single ?? {}),
				params.single ?? {},
				options,
			);

			return {
				...results,
				result: {
					isArchive: false,
					isSingle: true,
					data: results.result,
				} as R,
			};
		}

		throw new Error('Unmatched route');
	}
}
