import {
	HeadlessConfig,
	PostSearchEntity,
	SearchParams,
	TermSearchEntity,
	fetchSearch,
} from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';

export async function querySearch<
	T extends PostSearchEntity | TermSearchEntity = PostSearchEntity | TermSearchEntity,
	P extends SearchParams = SearchParams,
>(q: NextQueryProps<P> = {}, _config: HeadlessConfig | undefined = undefined) {
	const { config, ...query } = prepareQuery<P>(q, _config);

	try {
		const result = await fetchSearch<T, P>(query, config);

		return result;
	} catch (error) {
		if (error instanceof Error) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
