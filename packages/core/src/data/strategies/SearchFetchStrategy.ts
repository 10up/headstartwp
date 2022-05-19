import { searchMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { PostsArchiveFetchStrategy, PostsArchiveParams } from './PostsArchiveFetchStrategy';
import { endpoints } from '../utils';

/**
 * The SearchFetchStrategy extends the [[PostsArchiveFetchStrategy]] and does not make use of the
 * search endpoint. Instead it uses the specified postType endpoint.
 *
 * This strategy supports extracting endpoint params from url E.g:
 * - `/page/2/` maps to `{ page: 2 }`
 * - `/searched-term/page/2` maps to `{ search: 'searched-term', page: 2 }`
 *
 * @category Data Fetching
 */
export class SearchFetchStrategy extends PostsArchiveFetchStrategy {
	getDefaultEndpoint(): string {
		return endpoints.posts;
	}

	getParamsFromURL(path: string): Partial<PostsArchiveParams> {
		return parsePath(searchMatchers, path);
	}

	/**
	 * The fetcher function is overriden to disable throwing if not found
	 *
	 * If a search request returns not found we do not want to redirect to a 404 page,
	 * instead the user should be informated that no posts were found
	 *
	 * @param url The url to parse
	 * @param params The params to build the endpoint with
	 */
	async fetcher(url: string, params: Partial<PostsArchiveParams>) {
		return super.fetcher(url, params, { throwIfNotFound: false });
	}
}
