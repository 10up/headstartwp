import { TermEntity, FetchResponse, TaxonomyArchiveParams } from '@10up/headless-core';
import { FetchHookOptions, useFetchTerms } from '@10up/headless-core/react';
import { usePrepareFetch } from './usePrepareFetch';

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
export function useTerms<
	T extends TermEntity = TermEntity,
	P extends TaxonomyArchiveParams = TaxonomyArchiveParams,
>(params: Partial<P> = {}, options: FetchHookOptions<FetchResponse<T[]>> = {}) {
	const useFetchArguments = usePrepareFetch(params, options);

	return useFetchTerms(
		useFetchArguments.params,
		useFetchArguments.options,
		useFetchArguments.path,
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useTerms {
	export const { fetcher } = useFetchTerms;
}
