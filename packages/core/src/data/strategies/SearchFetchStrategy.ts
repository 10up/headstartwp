import { searchMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { PostsArchiveFetchStrategy, PostsArchiveParams } from './PostsArchiveFetchStrategy';
import { endpoints } from '../utils';
import { apiGet } from '../api';
import { addQueryArgs, getSiteBySourceUrl } from '../../utils';
import { PostEntity, QueriedObject, YoastJSON } from '../types';
import { FetchOptions } from './AbstractFetchStrategy';

/**
 * The SearchFetchStrategy extends the {@link PostsArchiveFetchStrategy} and does not make use of the
 * search endpoint. Instead it uses the specified postType endpoint.
 *
 * This strategy supports extracting endpoint params from url E.g:
 * - `/page/2/` maps to `{ page: 2 }`
 * - `/searched-term/page/2` maps to `{ search: 'searched-term', page: 2 }`
 *
 * @category Data Fetching
 */
export class SearchFetchStrategy<
	T extends PostEntity = PostEntity,
	P extends PostsArchiveParams = PostsArchiveParams,
> extends PostsArchiveFetchStrategy<T, P> {
	getDefaultEndpoint(): string {
		return endpoints.posts;
	}

	getParamsFromURL(
		path: string,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		nonUrlParams: Partial<P> = {},
	): Partial<P> {
		return parsePath(searchMatchers, path) as Partial<P>;
	}

	/**
	 * The fetcher function is overridden to disable throwing if not found
	 *
	 * If a search request returns not found we do not want to redirect to a 404 page,
	 * instead the user should be informed that no posts were found
	 *
	 * @param url The url to parse
	 * @param params The params to build the endpoint with
	 * @param options FetchOptions
	 */
	async fetcher(url: string, params: Partial<P>, options: Partial<FetchOptions> = {}) {
		const { burstCache = false } = options;
		let seo_json: YoastJSON | null = null;
		let seo: string = '';

		const config = getSiteBySourceUrl(this.baseURL);
		const { integrations } = config;

		if (integrations?.yoastSEO?.enable === true) {
			try {
				const wpUrl = this.baseURL.replace(/\/$/, ''); // Ensure no double slash in url param
				const localeParam = this.locale ? `&lang=${this.locale}` : '';
				const pageParam = params.page ? `/page/${params.page}` : '';

				const result = await apiGet(
					addQueryArgs(`${wpUrl}${endpoints.yoast}`, {
						url: `${wpUrl}${pageParam}/?s=${params.search ?? ''}${localeParam}`,
					}),
					{ headers: options.headers ?? {}, cache: options?.cache },
					burstCache,
				);

				seo = result.json.html ?? null;
				seo_json = { ...(result.json.json as YoastJSON) };
			} catch (e) {
				// do nothing
			}
		}

		const queriedObject: QueriedObject = {
			search: {
				searchedValue: params.search ?? '',
				type: 'post',
				subtype: params.postType ?? 'post',
				yoast_head: seo,
			},
		};

		if (seo_json && queriedObject.search) {
			queriedObject.search.yoast_head_json = seo_json;
		}

		const response = await super.fetcher(url, params, { ...options, throwIfNotFound: false });

		return {
			...response,
			queriedObject,
		};
	}
}
