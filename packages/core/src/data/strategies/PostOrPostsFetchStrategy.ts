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
	postStrategy: SinglePostFetchStrategy = new SinglePostFetchStrategy(this.baseURL);

	postsStrategy: PostsArchiveFetchStrategy = new PostsArchiveFetchStrategy(this.baseURL);

	getDefaultEndpoint(): string {
		return '/@postOrPosts';
	}

	getParamsFromURL(path: string, params: Partial<P> = {}): Partial<P> {
		console.log(
			'PostsOrPosts - path',
			path,
			this.postStrategy.getParamsFromURL(path, params.single),
		);
		return {
			single: this.postStrategy.getParamsFromURL(path, params.single),
			archive: this.postsStrategy.getParamsFromURL(path, params.archive),
		} as P;
	}

	async fetcher(
		url: string,
		params: Partial<P>,
		options?: Partial<FetchOptions>,
	): Promise<FetchResponse<R>> {
		if (params.priority === 'single') {
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

			// TODO: capture potentiall error and throw a better error message

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
}
