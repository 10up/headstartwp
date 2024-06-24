import { HeadlessConfig, PostEntity, PostsArchiveParams, fetchPosts } from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';

export async function queryPosts<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(q: NextQueryProps<P>, _config: HeadlessConfig | undefined = undefined) {
	const { config, ...query } = prepareQuery<P>(q, _config);

	try {
		const result = await fetchPosts<T, P>(query, config);

		return result;
	} catch (error) {
		if (error instanceof Error) {
			handleFetchError(error, query.path);
		}
		throw error;
	}
}
