import { HeadlessConfig, PostEntity, PostParams, fetchPost } from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { prepareQuery } from './prepareQuery';
import { NextQueryProps } from './types';

export async function queryPost<
	T extends PostEntity = PostEntity,
	P extends PostParams = PostParams,
>(q: NextQueryProps<P>, _config: HeadlessConfig | undefined = undefined) {
	const { config, ...query } = prepareQuery<P>(q, _config);

	try {
		const result = await fetchPost<T, P>(query, config);

		return result;
	} catch (error) {
		if (error instanceof Error) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
