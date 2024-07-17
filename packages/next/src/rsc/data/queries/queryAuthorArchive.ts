import {
	HeadlessConfig,
	PostEntity,
	PostsArchiveParams,
	fetchAuthorArchive,
} from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';

export async function queryAuthorArchive<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(q: NextQueryProps<P> = {}, _config: HeadlessConfig | undefined = undefined) {
	const { config, handleError, ...query } = prepareQuery<P>(q, _config);

	try {
		const result = await fetchAuthorArchive<T, P>(query, config);

		return result;
	} catch (error) {
		if (error instanceof Error && handleError) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
