import { executeFetchStrategy, TaxonomyArchiveParams, TaxonomyTermsStrategy } from '../strategies';
import { HeadlessConfig } from '../../types';
import { getHeadstartWPConfig, getWPUrl } from '../../utils';
import { TermEntity } from '../types';
import { QueryProps } from './types';

export async function fetchTerms<
	T extends TermEntity = TermEntity,
	P extends TaxonomyArchiveParams = TaxonomyArchiveParams,
>(query: QueryProps<P> = {}, _config: HeadlessConfig | undefined = undefined) {
	const { params = {}, options, path = '' } = query;

	const config = _config ?? getHeadstartWPConfig();

	const { data, isMainQuery } = await executeFetchStrategy<T[], P>(
		fetchTerms.fetcher<T, P>(),
		config,
		params,
		options,
		path,
	);

	const { result, pageInfo } = data;

	return {
		data: { terms: result, pageInfo },
		isMainQuery,
	};
}

fetchTerms.fetcher = <
	T extends TermEntity = TermEntity,
	P extends TaxonomyArchiveParams = TaxonomyArchiveParams,
>(
	sourceUrl?: string,
	defaultParams?: P,
) => new TaxonomyTermsStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
