import type { SWRConfiguration } from 'swr';
import {
	AuthorArchiveFetchStrategy,
	FetchResponse,
	PostEntity,
	PostsArchiveParams,
} from '../../data';
import { getWPUrl } from '../../utils';
import { useFetchPosts } from './useFetchPosts';

/**
 * The useFetchAuthorArchive hook
 *
 * See {@link useAuthorArchive}
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 * @param path The path of the url to get url params from.
 *
 * @returns
 */
export function useFetchAuthorArchive(
	params: PostsArchiveParams = {},
	options: SWRConfiguration<FetchResponse<PostEntity[]>> = {},
	path = '',
) {
	return useFetchPosts(params, options, path, useFetchAuthorArchive.fetcher());
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchAuthorArchive {
	export const fetcher = () => new AuthorArchiveFetchStrategy(getWPUrl());
}
