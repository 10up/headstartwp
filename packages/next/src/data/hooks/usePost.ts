import { FetchResponse, PostEntity, PostParams } from '@10up/headless-core';
import { useRouter } from 'next/router';
import { FetchHookOptions, useFetchPost } from '@10up/headless-core/react';
import { convertToPath } from '../utils';

/**
 * The usePost hook. Returns a single post entity
 *
 * ## Usage
 *
 * ### Fetching a post by slug
 * {@codeblock ~~/examples/next/usePost.tsx#post-by-slug}
 *
 * ### Fetching a page by slug
 * {@codeblock ~~/examples/next/usePost.tsx#page-by-slug}
 *
 * ### Fetching a post or page by slug
 * {@codeblock ~~/examples/next/usePost.tsx#post-page-by-slug}
 *
 * ### Custom Post Type
 * {@codeblock ~~/examples/next/usePost.tsx#cpt}
 *
 * ### Automatically mapping URL params in Next.js
 * In order to automatically map URL params create a catch-all route named `[...path].js`.
 * You can create the catch-all at any level e.g: `pages/[...path].js`, `pages/blog/[...path].js`, etc.
 *
 * The `pages/[...path].js` route for instance would yield a URL like this: `/post-slug`, `/2020/01/01/post-slug`, etc.
 *
 * {@codeblock ~~/examples/next/usePost.tsx#url-params}
 *
 * ### Server-Side-Rendering or Static-Site-Generation
 * {@codeblock ~~/examples/next/usePost.tsx#ssr-ssg}
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
