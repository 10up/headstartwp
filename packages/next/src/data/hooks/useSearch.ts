import { PostEntity, PostsArchiveParams, FetchResponse } from '@10up/headless-core';
import { useFetchSearch } from '@10up/headless-core/react';
import { useRouter } from 'next/router';
import { SWRConfiguration } from 'swr';
import { convertToPath } from '../utils';

/**
 * The useSearch hook. Returns a collection of search entities
 *
 * ## Usage
 *
 * ### Basic search automatically mapping URL params in Next.js
 *
 * In order to automatically map URL params create a catch-all route named `[...path].js`.
 * You can create the catch-all at any level e.g: `pages/search/[[...path]].js`
 *
 * The `pages/search/[[...path]].js` route for instance would yield a URL like this: `/search/[term]/page/[number]`, `/search/[term]` etc
 *
 * {@codeblock ~~/examples/next/useSearch.tsx#basic-search}
 *
 * ### Server-Side-Rendering or Static-Site-Generation
 * {@codeblock ~~/examples/next/useSearch.tsx#ssr-ssg}
 *
 * @param params  The parameters accepted by the hook
 * @param options Options for the SWR configuration
 *
 * @source The source code of the hook
 * @category Data Fetching Hooks
 */
export function useSearch(
	params: PostsArchiveParams = {},
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
) {
	const { query } = useRouter();
	const path = Array.isArray(query.path) ? query.path : [query.path || ''];

	return useFetchSearch(params, options, convertToPath(path));
}

useSearch.fetcher = useFetchSearch.fetcher;
