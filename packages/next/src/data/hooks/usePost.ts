import { FetchResponse, PostEntity, PostParams } from '@10up/headless-core';
import { useRouter } from 'next/router';
import { FetchHookOptions, useFetchPost } from '@10up/headless-core/react';
import { convertToPath } from '../convertToPath';

/**
 * The usePost hook. Returns a single post entity
 *
 * In order to automatically map URL params create a catch-all route named `[...path].js`.
 * You can create the catch-all at any level e.g: `pages/[...path].js`, `pages/blog/[...path].js`, etc.
 *
 * The `pages/[...path].js` route for instance would yield a URL like this: `/post-slug`, `/2020/01/01/post-slug`, etc.
 *
 * @param params The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
export function usePost<T extends PostEntity = PostEntity, P extends PostParams = PostParams>(
	params: P | {} = {},
	options: FetchHookOptions<FetchResponse<T>> = {},
) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useFetchPost<T, P>(params, options, convertToPath(path));
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace usePost {
	export const { fetcher } = useFetchPost;
}
