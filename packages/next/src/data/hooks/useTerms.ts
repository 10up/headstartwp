import { TermEntity, FetchResponse, TaxonomyArchiveParams } from '@10up/headless-core';
import { useTermsImpl } from '@10up/headless-core/react';
import { SWRConfiguration } from 'swr';
import { useRouter } from 'next/router';
import { convertToPath } from '../utils';

/**
 * The usePost hook. Returns a collection of post entities
 *
 * @param params  Supported params
 * @param options Options for the SWR configuration
 *
 * @returns
 */
export function useTerms(
	params: TaxonomyArchiveParams,
	options: SWRConfiguration<FetchResponse<TermEntity>> = {},
) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useTermsImpl(params, options, convertToPath(path));
}

useTerms.fetcher = useTermsImpl.fetcher;
