import {
	HeadlessConfig,
	TaxonomyArchiveParams,
	TaxonomyTermsStrategy,
	TermEntity,
	fetchTerms,
} from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';

export type TermsQueryProps<
	T extends TermEntity = TermEntity,
	P extends TaxonomyArchiveParams = TaxonomyArchiveParams,
> = NextQueryProps<P> & {
	fetchStrategy?: TaxonomyTermsStrategy<T, P>;
};

export async function queryTerms<
	T extends TermEntity = TermEntity,
	P extends TaxonomyArchiveParams = TaxonomyArchiveParams,
>(q: TermsQueryProps<T, P> = {}, _config: HeadlessConfig | undefined = undefined) {
	const { fetchStrategy, ...nextQuery } = q;
	const { config, handleError, ...query } = prepareQuery<P>(nextQuery, _config);

	try {
		const result = await fetchTerms<T, P>(query, config, fetchStrategy);

		return { ...result, config };
	} catch (error) {
		if (error instanceof Error && handleError) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
