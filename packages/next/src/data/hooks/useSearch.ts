import { PostEntity, PostsArchiveParams, FetchResponse } from '@10up/headless-core';
import { FetchHookOptions, useFetchSearch } from '@10up/headless-core/react';
import { useRouter } from 'next/router';
import { convertToPath } from '../convertToPath';

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
>(params: P | {} = {}, options: FetchHookOptions<FetchResponse<T[]>> = {}) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useFetchSearch(params, options, convertToPath(path));
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useSearch {
	export const { fetcher } = useFetchSearch;
}
