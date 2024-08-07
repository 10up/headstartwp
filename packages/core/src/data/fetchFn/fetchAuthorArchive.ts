import {
	AuthorArchiveFetchStrategy,
	PostsArchiveFetchStrategy,
	PostsArchiveParams,
} from '../strategies';
import { HeadlessConfig } from '../../types';
import { PostEntity } from '../types';
import { QueryProps } from './types';
import { fetchPosts } from './fetchPosts';
import { getWPUrl } from '../../utils';

export async function fetchAuthorArchive<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(
	query: QueryProps<P> = {},
	_config: HeadlessConfig | undefined = undefined,
	fetcher: PostsArchiveFetchStrategy<T, P> | undefined = undefined,
) {
	return fetchPosts<T, P>(query, _config, fetcher ?? fetchAuthorArchive.fetcher<T, P>());
}

fetchAuthorArchive.fetcher = <
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
>(
	sourceUrl?: string,
	defaultParams?: P,
) => new AuthorArchiveFetchStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
