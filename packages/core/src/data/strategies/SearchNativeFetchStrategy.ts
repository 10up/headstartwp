import { getSiteBySourceUrl, addQueryArgs, getWPUrl } from '../../utils';
import { endpoints } from '../utils';
import { apiGet } from '../api';
import { PostSearchEntity, TermSearchEntity, QueriedObject } from '../types';
import { searchMatchers } from '../utils/matchers';
import { parsePath } from '../utils/parsePath';
import { FetchOptions, AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

/**
 * The EndpointParams supported by the {@link SearchNativeFetchStrategy}
 */
export interface SearchParams extends EndpointParams {
	/**
	 * Current page of the collection.
	 *
	 * @default 1
	 */
	page?: number;

	/**
	 * Maximum number of items to be returned in result set.
	 *
	 * @default 10
	 */
	per_page?: number;

	/**
	 * Limit results to those matching a string.
	 */
	search?: string;

	/**
	 * Limit results to items of an object type.
	 *
	 * @default 'post'
	 */
	type?: 'post' | 'term' | 'post-format';

	/**
	 * Limit results to items of one or more object subtypes.
	 */
	subtype?: string;

	/**
	 * Ensure result set excludes specific IDs.
	 */
	exclude?: number[];

	/**
	 * Limit result set to specific IDs.
	 */
	include?: number[];
}

/**
 * The SearchNativeFetchStrategy is used to fetch search results for a given search query
 * Uses the native WordPress search endpoint.
 *
 * Note that custom post types and custom taxonomies should be defined in `headless.config.js`
 *
 * This strategy supports extracting endpoint params from url E.g:
 * - `/page/2/` maps to `{ page: 2 }`
 * - `/searched-term/page/2` maps to `{ search: 'searched-term', page: 2 }`
 *
 * @see {@link getParamsFromURL} to learn about url param mapping
 *
 * @category Data Fetching
 */
export class SearchNativeFetchStrategy<
	T extends PostSearchEntity | TermSearchEntity = PostSearchEntity | TermSearchEntity,
	P extends SearchParams = SearchParams,
> extends AbstractFetchStrategy<T[], P> {
	path: string = '';

	locale: string = '';

	getDefaultEndpoint() {
		return endpoints.search;
	}

	getDefaultParams(): Partial<P> {
		return { _embed: true, ...super.getDefaultParams() } as P;
	}

	/**
	 * This strategy automatically extracts taxonomy filters, date filters and pagination params from the URL
	 *
	 * It also takes into account the custom taxonomies specified in `headless.config.js`
	 *
	 * @param path The URL path to extract params from
	 * @param params
	 */
	getParamsFromURL(path: string, params: Partial<P> = {}): Partial<P> {
		const config = getSiteBySourceUrl(this.baseURL);

		// Required for search lang url.
		this.locale = config.integrations?.polylang?.enable && params.lang ? params.lang : '';

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
		let seo_json: Record<string, any> = {};
		let seo: string = '';

		// Request SEO data.
		try {
			const wpUrl = getWPUrl().replace(/\/$/, ''); // Ensure no double slash in url param
			const localeParam = this.locale ? `/${this.locale}` : '';
			const pageParam = params.page ? `/page/${params.page}` : '';

			const result = await apiGet(
				addQueryArgs(`${wpUrl}${endpoints.yoast}`, {
					url: `${wpUrl}${localeParam}${pageParam}/?s=${params.search ?? ''}`,
				}),
				{},
				burstCache,
			);

			seo = result.json.html ?? null;
			seo_json = { ...result.json.json };
		} catch (e) {
			// do nothing
		}

		const queriedObject: QueriedObject = {
			search: {
				searchedValue: params.search ?? '',
				type: params.type ?? 'post',
				subtype: params.subtype ?? 'post',
				yoast_head: seo,
				yoast_head_json: {
					...seo_json,
				},
			},
		};

		const response = await super.fetcher(url, params, { ...options, throwIfNotFound: false });

		return {
			...response,
			queriedObject,
		};
	}
}
