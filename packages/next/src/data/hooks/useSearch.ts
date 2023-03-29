import { PostEntity, PostsArchiveParams, FetchResponse } from '@10up/headless-core';
import { FetchHookOptions, useFetchSearch } from '@10up/headless-core/react';
import { usePrepareFetch } from './usePrepareFetch';

/**
 * The useSearch hook. Returns a collection of search entities
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
export function useSearch<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(params: Partial<P> = {}, options: FetchHookOptions<FetchResponse<T[]>> = {}) {
	const useFetchArguments = usePrepareFetch(params, options);

	return useFetchSearch(
		useFetchArguments.params,
		useFetchArguments.options,
		useFetchArguments.path,
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useSearch {
	export const { fetcher } = useFetchSearch;
}
