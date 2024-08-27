import {
	HeadlessConfig,
	PostEntity,
	PostOrPostsFetchStrategy,
	PostOrPostsParams,
	fetchPostOrPosts,
} from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';
import { prepareSEOMetadata } from '../seo';

export type PostOrPostsQueryProps<
	T extends PostEntity = PostEntity,
	P extends PostOrPostsParams = PostOrPostsParams,
> = NextQueryProps<P> & {
	fetchStrategy?: PostOrPostsFetchStrategy<T, P>;
};

export async function queryPostOrPosts<
	T extends PostEntity = PostEntity,
	P extends PostOrPostsParams = PostOrPostsParams,
>(q: PostOrPostsQueryProps<T, P> = {}, _config: HeadlessConfig | undefined = undefined) {
	const { fetchStrategy, ...nextQuery } = q;
	const { config, handleError, ...query } = prepareQuery<P>(nextQuery, _config);

	try {
		const result = await fetchPostOrPosts<T, P>(query, config, fetchStrategy);

		if (result.isSingle && result.data.post) {
			return {
				...result,
				config,
				seo: prepareSEOMetadata(result.data.post, config),
			};
		}

		return {
			...result,
			config,
			seo: prepareSEOMetadata(result.data.queriedObject, config),
		};
	} catch (error) {
		if (error instanceof Error && handleError) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
