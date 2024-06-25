import { HeadlessConfig, PostEntity, PostOrPostsParams, fetchPostOrPosts } from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';

export async function queryPostOrPosts<
	T extends PostEntity = PostEntity,
	P extends PostOrPostsParams = PostOrPostsParams,
>(q: NextQueryProps<P>, _config: HeadlessConfig | undefined = undefined) {
	const { config, ...query } = prepareQuery<P>(q, _config);

	try {
		const result = await fetchPostOrPosts<T, P>(query, config);

		return result;
	} catch (error) {
		if (error instanceof Error) {
			handleFetchError(error, query.path);
		}
		throw error;
	}
}
