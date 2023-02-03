import { useFetch } from './useFetch';

import type { FetchHookOptions, HookResponse } from './types';
import {
	FetchResponse,
	PageInfo,
	TaxonomyArchiveParams,
	TaxonomyTermsStrategy,
	TermEntity,
} from '../../data';
import { getWPUrl } from '../../utils';
import { makeErrorCatchProxy } from './util';

export interface useTermsResponse<T extends TermEntity> extends HookResponse {
	data?: { terms: T[]; pageInfo: PageInfo };
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
export function useFetchTerms<
	T extends TermEntity = TermEntity,
	P extends TaxonomyArchiveParams = TaxonomyArchiveParams,
>(
	params: P | {},
	options: FetchHookOptions<FetchResponse<T[]>> = {},
	path = '',
): useTermsResponse<T> {
	const { data, error, isMainQuery } = useFetch<T[], P>(
		params,
		useFetchTerms.fetcher<T, P>(),
		options,
		path,
	);

	if (error || !data) {
		const fakeData = {
			terms: makeErrorCatchProxy<T[]>('terms'),
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
	export const fetcher = <
		T extends TermEntity = TermEntity,
		P extends TaxonomyArchiveParams = TaxonomyArchiveParams,
	>(
		sourceUrl?: string,
	) => new TaxonomyTermsStrategy<T, P>(sourceUrl ?? getWPUrl());
}
