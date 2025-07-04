import {
	HeadlessConfig,
	PostSearchEntity,
	SearchNativeFetchStrategy,
	SearchParams,
	TermSearchEntity,
	fetchSearch,
} from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';
import { prepareSEOMetadata } from '../seo';

export type SearchQueryProps<
	T extends PostSearchEntity | TermSearchEntity = PostSearchEntity | TermSearchEntity,
	P extends SearchParams = SearchParams,
> = NextQueryProps<P> & {
	fetchStrategy?: SearchNativeFetchStrategy<T, P>;
};

export async function querySearch<
	T extends PostSearchEntity | TermSearchEntity = PostSearchEntity | TermSearchEntity,
	P extends SearchParams = SearchParams,
>(q: SearchQueryProps<T, P> = {}, _config: HeadlessConfig | undefined = undefined) {
	const { fetchStrategy, ...nextQuery } = q;
	const { config, handleError, ...query } = prepareQuery<P>(nextQuery, _config);

	try {
		const result = await fetchSearch<T, P>(query, config, fetchStrategy);

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
