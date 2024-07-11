import { HeadlessConfig, TaxonomyArchiveParams, TermEntity, fetchTerms } from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { NextQueryProps } from './types';
import { prepareQuery } from './prepareQuery';

export async function queryTerms<
	T extends TermEntity = TermEntity,
	P extends TaxonomyArchiveParams = TaxonomyArchiveParams,
>(q: NextQueryProps<P>, _config: HeadlessConfig | undefined = undefined) {
	const { config, ...query } = prepareQuery<P>(q, _config);

	try {
		const result = await fetchTerms<T, P>(query, config);

		return result;
	} catch (error) {
		if (error instanceof Error) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
