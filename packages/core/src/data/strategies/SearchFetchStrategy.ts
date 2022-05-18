import { searchMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { PostsArchiveFetchStrategy, PostsArchiveParams } from './PostsArchiveFetchStrategy';
import { endpoints } from '../utils';

/**
 * @category Data Fetching
 */
export class SearchFetchStrategy extends PostsArchiveFetchStrategy {
	getDefaultEndpoint(): string {
		return endpoints.posts;
	}

	getParamsFromURL(path: string): Partial<PostsArchiveParams> {
		return parsePath(searchMatchers, path);
	}

	async fetcher(url: string, params: Partial<PostsArchiveParams>) {
		return super.fetcher(url, params, { throwIfNotFound: false });
	}
}
