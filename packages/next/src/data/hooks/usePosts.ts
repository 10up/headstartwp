import { PostEntity, PostsArchiveParams, FetchResponse } from '@10up/headless-core';
import { FetchHookOptions, useFetchPosts } from '@10up/headless-core/react';
import { useRouter } from 'next/router';
import { convertToPath } from '../convertToPath';

/**
 * The usePost hook. Returns a collection of post entities
 *
 * ## Usage
 *
 * ### Fetching a list of posts
 * {@codeblock ~~/examples/next/usePosts.tsx#list-of-post}
 *
 * ### Fetching a list of pages
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#list-of-pages}
 *
 * ### Fetching a list of posts from a custom post type
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#cpt}
 *
 * ### Automatically mapping URL params in Next.js
 * In order to automatically map URL params create a catch-all route named `[[...path]].js`.
 * You can create the catch-all at any level e.g: `pages/[[...path]].js`, `pages/blog/[[...path]].js`, etc.
 *
 * The `pages/blog/[[...path]].js` route for instance would yield a URL like this: `/blog`, `/blog/page/2`, `/blog/category/category-name/page/3`, etc.
 *
 * The following URL params are supported:
 * - Category (/category/category-name)
 * - Tag (/tag/tag-name)
 * - Author (/author/author-name)
 * - Pagination (/page/2)
 * - Date (/YYYY/MM/DD)
 * - Custom Taxonomy (/taxonomy/term-name)
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#url-params}
 *
 * ### Handling multiple WordPress routes in a single next.js route
 *
 * The `usePosts` hook is very flexible and can handle multiple WordPress routes in a single next.js route when using the optional-catch-all route (`[[...path]].js`).
 * Alongisde with the actual data, `usePosts` also returns information about the current route so you can conditionally load different components.
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#multiple-wordpress-routes}
 *
 *
 * ### Taxonomy Archive Pages
 *
 * If you want to create specific routes for taxonomy archive pages,
 * you can use the `taxonomy` param to specify the taxonomy slug. When doing so, the term slug will be
 * extracted from the URL.
 *
 * *Important*: When creating taxonomy archive routes, you should not use the optional catch-all ([[...path]].js) route, instead use the
 * catch-all ([...path].js) route as the term name in the URL is required for your route.
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#taxonomy-page}
 *
 *
 * ### Author Archive Pages
 *
 * IF you want to create specific routes for author archive pages (such as `pages/author/[...path.js]) use the {@link useAuthorArchive} hook.
 *
 * If you're you are not using the built-in WordPress authors for your author archives pages check the section "Taxonomy Archive Pages"
 *
 * ### Server-Side-Rendering or Static-Site-Generation
 *
 * {@codeblock ~~/examples/next/usePosts.tsx#ssr-ssg}
 *
 * @param params  The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
export function usePosts<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(params: P | {} = {}, options: FetchHookOptions<FetchResponse<T[]>> = {}) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useFetchPosts(params, options, convertToPath(path));
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace usePosts {
	export const { fetcher } = useFetchPosts;
}
