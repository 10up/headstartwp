import {
	AuthorArchiveFetchStrategy,
	FetchResponse,
	PostEntity,
	PostsArchiveParams,
} from '../../data';
import { getWPUrl } from '../../utils';
import { FetchHookOptions } from './types';
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
export function useFetchAuthorArchive<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(params: PostEntity | {} = {}, options: FetchHookOptions<FetchResponse<T[]>> = {}, path = '') {
	return useFetchPosts<T, P>(params, options, path, useFetchAuthorArchive.fetcher<T, P>());
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchAuthorArchive {
	export const fetcher = <
		T extends PostEntity = PostEntity,
		P extends PostsArchiveParams = PostsArchiveParams,
	>() => new AuthorArchiveFetchStrategy<T, P>(getWPUrl());
}
