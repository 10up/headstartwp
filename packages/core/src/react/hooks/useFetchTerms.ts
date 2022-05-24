import { SWRConfiguration } from 'swr';
import { useFetch } from './useFetch';

import type { HookResponse } from './types';
import {
	FetchResponse,
	PageInfo,
	TaxonomyArchiveParams,
	TaxonomyTermsStrategy,
	TermEntity,
} from '../../data';
import { getWPUrl } from '../../utils';

export interface useTermsResponse extends HookResponse {
	data?: { terms: TermEntity[]; pageInfo: PageInfo };
}

/**
 * The useFetchTerms hook. Returns a collection of term entities
 *
 * See [[useTerms]] for usage instructions.
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @category Data Fetching Hooks
 */
export function useFetchTerms(
	params: TaxonomyArchiveParams,
	options: SWRConfiguration<FetchResponse<TermEntity>> = {},
	path = '',
): useTermsResponse {
	const { data, error } = useFetch<TermEntity, TaxonomyArchiveParams>(
		{ _embed: true, ...params },
		useFetchTerms.fetcher(),
		options,
		path,
	);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	const { result, pageInfo } = data;

	// TODO: fix types
	const terms = result as unknown as TermEntity[];

	return { data: { terms, pageInfo }, loading: false };
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchTerms {
	export const fetcher = () => new TaxonomyTermsStrategy(getWPUrl());
}
