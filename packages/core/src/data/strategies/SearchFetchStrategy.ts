import { searchMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { PostsArchiveFetchStrategy, PostsArchiveParams } from './PostsArchiveFetchStrategy';
import { endpoints } from '../utils';
import { apiGet } from '../api';
import { addQueryArgs, getWPUrl } from '../../utils';
import { QueriedObject } from '../types';

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

	getParamsFromURL(
		path: string,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		nonUrlParams: Partial<PostsArchiveParams> = {},
	): Partial<PostsArchiveParams> {
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
		let seo_json: Record<string, any> = {};

		try {
			const result = await apiGet(
				addQueryArgs(`${getWPUrl()}${endpoints.yoast}`, {
					url: `${getWPUrl()}/?s=${params.search}`,
				}),
			);

			seo_json = { ...result.json.json };
		} catch (e) {
			// do nothing
		}

		const queriedObject: QueriedObject = {
			search: {
				searchedValue: params.search ?? '',
				type: 'post',
				subtype: params.postType ?? 'post',
				yoast_head: '',
				yoast_head_json: {
					...seo_json,
				},
			},
		};

		const response = await super.fetcher(url, params, { throwIfNotFound: false });

		return {
			...response,
			queriedObject,
		};
	}
}
