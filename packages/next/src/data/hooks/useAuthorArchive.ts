import { PostEntity, PostsArchiveParams, FetchResponse } from '@10up/headless-core';
import { FetchHookOptions, useFetchAuthorArchive } from '@10up/headless-core/react';
import { useRouter } from 'next/router';
import { convertToPath } from '../convertToPath';

/**
 * The useAuthorArchive hook. Returns a collection of post entities queried by author
 *
 * This hook must be used with a catch-all route `[...path].js` (e.g: `pages/author/[...path].js`)
 *
 * **Important**: Use a catch-all and not an optional catch-all route (`[[...path]].js`) as the author param in the url is required.
 *
 * In order to automatically map URL params create a catch-all route named `[...path].js`.
 * You can create the catch-all at any level e.g: `pages/author/[...path].js`, etc.
 *
 * The `pages/author/[...path].js` route for instance would yield a URL like this: `/author-name/page/2`, `/author-name/category/category-name/page/3`, etc.
 *
 * The following URL params are supported:
 * - Category (/author-name/category/category-name)
 * - Tag (/author-name/tag/tag-name)
 * - Author (/author/author-name)
 * - Pagination (/page/2)
 * - Custom Taxonomy (/author//taxonomy/term-name)
 *
 * ## Usage
 *
 * ### Fetching an author archive
 * {@codeblock ~~/examples/next/useAuthorArchive.tsx#list-of-post}
 *
 * ### Fetching an author archive of pages
 *
 * {@codeblock ~~/examples/next/useAuthorArchive.tsx#list-of-pages}
 *
 * ### Server-Side-Rendering or Static-Site-Generation
 *
 * {@codeblock ~~/examples/next/useAuthorArchive.tsx#ssr-ssg}
 *
 * @param params  The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
export function useAuthorArchive<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(params: P | {} = {}, options: FetchHookOptions<FetchResponse<T[]>> = {}) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useFetchAuthorArchive<T, P>(params, options, convertToPath(path));
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useAuthorArchive {
	export const { fetcher } = useFetchAuthorArchive;
}
