import { getSiteBySourceUrl, addQueryArgs } from '../../utils';
import { endpoints } from '../utils';
import { apiGet } from '../api';
import { PostSearchEntity, TermSearchEntity, QueriedObject, YoastJSON } from '../types';
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
	subtype?: string | string[];

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
	 * This strategy automatically extracts the search term and and pagination params from the URL
	 *
	 * @param path The URL path to extract params from
	 * @param params The params passed to the strategy
	 */
	getParamsFromURL(path: string, params: Partial<P> = {}): Partial<P> {
		const config = getSiteBySourceUrl(this.baseURL);

		// Required for search lang url.
		this.locale = config.integrations?.polylang?.enable && params.lang ? params.lang : '';

		return parsePath(searchMatchers, path) as Partial<P>;
	}

	/**
	 * Builds the endpoint url for the search endpoint
	 *
	 * @param params The params for the request
	 * @returns
	 */
	buildEndpointURL(params: Partial<P>): string {
		const normalizedParams = { ...params };
		if (Array.isArray(normalizedParams.subtype)) {
			normalizedParams.subtype = normalizedParams.subtype.join(',');
		}

		return super.buildEndpointURL(normalizedParams);
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

		// Request SEO data.
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
					{ headers: options.headers ?? {} },
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
				type: params.type ?? 'post',
				subtype: params.subtype ?? 'post',
				yoast_head: seo,
			},
		};

		if (seo_json && queriedObject.search) {
			queriedObject.search.yoast_head_json = seo_json;
		}

		const response = await super.fetcher(url, params, {
			...options,
			throwIfNotFound: false,
		});

		return {
			...response,
			queriedObject,
		};
	}
}
