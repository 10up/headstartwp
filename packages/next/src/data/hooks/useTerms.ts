import { TermEntity, FetchResponse, TaxonomyArchiveParams } from '@10up/headless-core';
import { useFetchTerms } from '@10up/headless-core/react';
import { SWRConfiguration } from 'swr';
import { useRouter } from 'next/router';
import { convertToPath } from '../utils';

/**
 * The useTerms hook. Returns a collection of term entities
 *
 * ## Usage
 *
 * ```tsx
 * const { loading, data } = useTerms({ taxonomy: 'category', slug: 'cat-name' });
 * ```
 *
 * @param params  The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
export function useTerms(
	params: TaxonomyArchiveParams = {},
	options: SWRConfiguration<FetchResponse<TermEntity>> = {},
) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useFetchTerms(params, options, convertToPath(path));
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useTerms {
	export const { fetcher } = useFetchTerms;
}
