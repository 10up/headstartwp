import { PostEntity, SearchParams, FetchResponse } from '@headstartwp/core';
import { FetchHookOptions, useFetchSearchNative } from '@headstartwp/core/react';
import { usePrepareFetch } from './usePrepareFetch';

/**
 * The useSearchNative hook. Returns a collection of search entities retrieved through the WP native search endpoint.
 *
 * In order to automatically map URL params create a catch-all route named `[...path].js`.
 * You can create the catch-all at any level e.g: `pages/search/[[...path]].js`
 *
 * The `pages/search/[[...path]].js` route for instance would yield a URL like this: `/search/[term]/page/[number]`, `/search/[term]` etc
 *
 * @param params  The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
export function useSearchNative<
	T extends PostEntity = PostEntity,
	P extends SearchParams = SearchParams,
>(params: Partial<P> = {}, options: FetchHookOptions<FetchResponse<T[]>> = {}) {
	const useFetchArguments = usePrepareFetch(params, options);

	return useFetchSearchNative(
		useFetchArguments.params,
		useFetchArguments.options,
		useFetchArguments.path,
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useSearchNative {
	export const { fetcher } = useFetchSearchNative;
}
