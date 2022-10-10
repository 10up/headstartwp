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
import { makeErrorCatchProxy } from './util';

export interface useTermsResponse extends HookResponse {
	data?: { terms: TermEntity[]; pageInfo: PageInfo };
}

/**
 * The useFetchTerms hook. Returns a collection of term entities
 *
 * See {@link useTerms} for usage instructions.
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @category Data Fetching Hooks
 */
export function useFetchTerms(
	params: TaxonomyArchiveParams,
	options: SWRConfiguration<FetchResponse<TermEntity[]>> = {},
	path = '',
): useTermsResponse {
	const { data, error, isMainQuery } = useFetch<TermEntity[], TaxonomyArchiveParams>(
		{ _embed: true, ...params },
		useFetchTerms.fetcher(),
		options,
		path,
	);

	if (error || !data) {
		const fakeData = {
			terms: makeErrorCatchProxy<TermEntity[]>('terms'),
			pageInfo: makeErrorCatchProxy<PageInfo>('pageInfo'),
		};
		return { error, loading: !data, data: fakeData, isMainQuery };
	}

	const { result, pageInfo } = data;

	return { data: { terms: result, pageInfo }, loading: false, isMainQuery };
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchTerms {
	export const fetcher = () => new TaxonomyTermsStrategy(getWPUrl());
}
