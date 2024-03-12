import { PostEntity, PostsArchiveParams, FetchResponse } from '@headstartwp/core';
import { FetchHookOptions, useFetchPosts } from '@headstartwp/core/react';
import { usePrepareFetch } from './usePrepareFetch';

/**
 * The usePost hook. Returns a collection of post entities
 *
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
 * #### Handling multiple WordPress routes in a single next.js route
 *
 * The `usePosts` hook is very flexible and can handle multiple WordPress routes in a single next.js route when using the optional-catch-all route (`[[...path]].js`).
 * Alongside with the actual data, `usePosts` also returns information about the current route so you can conditionally load different components.
 *
 * ```jsx
 * const params = { postType: 'post' };
 * const Posts = () => {
 *	 const { data, pageType } = usePosts(params);
 *
 *	 if (pageType.isAuthorArchive) {
 *	   return <AuthorArchive data={data} />
 *	 }
 *
 *	 if (pageType.isCategoryArchive) {
 *	   return <CategoryArchive data={data} />
 *	 }
 *
 *	 if (pageType.isTaxonomyArchive && pageType.taxonomy === 'my-custom-taxonomy' ) {
 *	   return <TaxonomyArchive data={data} />
 *	 }
 *
 *	 return (
 *	   <div>
 *	     <ul>
 *		   {data.posts.map((post) => (
 *		      <li key={post.id}>
 *		        {post.title.rendered}
 * 		      </li>
 *	       ))}
 *       </ul>
 *	   </div>
 *	 );
 * };
 * ```
 *
 * @param params  The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @category Data Fetching Hooks
 */
export function usePosts<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(params: Partial<P> = {}, options: FetchHookOptions<FetchResponse<T[]>> = {}) {
	const useFetchArguments = usePrepareFetch(params, options);

	return useFetchPosts(
		useFetchArguments.params,
		useFetchArguments.options,
		useFetchArguments.path,
	);
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace usePosts {
	export const { fetcher } = useFetchPosts;
}
