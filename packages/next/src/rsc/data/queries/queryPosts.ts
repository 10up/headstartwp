import {
	HeadlessConfig,
	PostEntity,
	PostsArchiveFetchStrategy,
	PostsArchiveParams,
	fetchPosts,
} from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';
import { prepareSEOMetadata } from '../seo';

export type PostsQueryProps<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
> = NextQueryProps<P> & {
	fetchStrategy?: PostsArchiveFetchStrategy<T, P>;
};

export async function queryPosts<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(q: PostsQueryProps<T, P> = {}, _config: HeadlessConfig | undefined = undefined) {
	const { fetchStrategy, ...nextQuery } = q;
	const { config, handleError, ...query } = prepareQuery<P>(nextQuery, _config);

	try {
		const result = await fetchPosts<T, P>(query, config, fetchStrategy);

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
