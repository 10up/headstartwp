import { PageInfo, QueriedObject } from '../types';
import { apiGet } from '../api';
import { NotFoundError, addQueryArgs, EndpointError } from '../../utils';
import { acceptFields, removeFields } from '../utils/dataFilter';

/**
 * The base interface for defining endpoint parameters
 *
 * Strategies should define type with the actually supported EndPointParams
 */
export interface EndpointParams {
	/**
	 * The _embed param returned associated entities in the response
	 *
	 * It's recommended to avoid additional requests to fetch data
	 */
	_embed?: boolean;

	/**
	 * The _fields parameter is used to return only the specified fields in the response
	 */
	_fields?: string[];
	[k: string]: unknown;
}

/**
 * The type of the fetch response
 */
export interface FetchResponse<T> {
	/**
	 * Contains the actual data returned from the API
	 */
	result: T;

	/**
	 * Contains pagination information
	 */
	pageInfo: PageInfo;

	/**
	 * Queried Object information
	 */
	queriedObject: QueriedObject;
}

/**
 * The options supported by the default fetcher method
 */
export interface FetchOptions {
	/**
	 * Whether to thrown an exception if data is not found.
	 */
	throwIfNotFound: boolean;

	/**
	 * The authentication token to use for the request.
	 */
	bearerToken?: string;
}

export interface FilterDataOptions<T> {
	/**
	 * If method is 'ALLOW' then only the fields specified in the filter will be returned.
	 * If method is 'REMOVE' then the fields specified in the filter will be removed.
	 */
	method: 'ALLOW' | 'REMOVE';
	fields: (keyof T)[];
}

/**
 * Abstract class that lays out a strategy for fetching data
 *
 * All Fetch Strategies should implement this class and it allows to share logic for fetching data both
 * on the front-end and on the back-end.
 *
 * @template E The type of entity that is fetched (e.g PostEntity, TermEntity etc)
 * @template Params The type of the params that are passed to the endpoint
 *
 * @category Data Fetching
 */
export abstract class AbstractFetchStrategy<E, Params extends EndpointParams, R = E> {
	/**
	 * The Default Params
	 */

	defaultParams: Partial<Params> = {};

	/**
	 * Holds the current endpoint for the strategy
	 */
	endpoint: string = '';

	/**
	 * The base URL where the API is located
	 */
	baseURL: string = '';

	/**
	 * A method that must be implemented by concrete implementations which returns the default endpoint
	 * for the strategy
	 */
	abstract getDefaultEndpoint(): string;

	/**
	 * The strategy constructor
	 *
	 * @param baseURL The base URL of the API
	 * @param defaultParams (optional) list of default params
	 */
	constructor(baseURL?: string, defaultParams?: Partial<Params>) {
		if (baseURL) {
			this.setBaseURL(baseURL);
		}

		if (defaultParams) {
			this.defaultParams = defaultParams;
		}
	}

	/**
	 * The strategy can switch endpoints at runtime if needed.
	 *
	 * E.g: The actual endpoint for a post depends on its post_type
	 *
	 * @param endpoint The endpoint to fetch
	 */
	setEndpoint(endpoint: string) {
		this.endpoint = endpoint;
	}

	setBaseURL(url: string | undefined = '') {
		this.baseURL = url;
	}

	/**
	 * Returns the endpoint of the strategy. If no endpoint has been set at runtime,
	 * returns the default endpoint
	 *
	 * @returns The current endpoint for the strategy
	 */
	getEndpoint(): string {
		if (!this.endpoint) {
			return this.getDefaultEndpoint();
		}

		return this.endpoint;
	}

	getDefaultParams(): Partial<Params> {
		return this.defaultParams;
	}

	/**
	 * Returns the supported params from the URL if present.
	 *
	 * These params are passed to `buildEndpointURL`. If the strategy does not support
	 * mapping url params to endpoint params, it should return an empty object.
	 *
	 * @param path The Path name
	 * @param nonUrlParams The non-url params
	 *
	 * @returns params extracted from the URL
	 */
	abstract getParamsFromURL(path: string, nonUrlParams: Partial<Params>): Partial<Params>;

	/**
	 * Checks if this is the main query for a page
	 *
	 * @param path The page name
	 * @param nonUrlParams The non-url params
	 */
	isMainQuery(path: string, nonUrlParams: Partial<Params>) {
		return (
			Object.keys(this.getParamsFromURL(path, nonUrlParams)).filter(
				(param) => param !== '_embed',
			).length > 0
		);
	}

	/**
	 * Builds the final endpoint URL based on the passed parameters
	 *
	 * @param params The params to add to the request
	 *
	 * @returns The endpoint URL.
	 */
	buildEndpointURL(params: Partial<Params>): string {
		const { _embed, ...endpointParams } = params;

		const url = addQueryArgs(this.getEndpoint(), { ...endpointParams });

		if (_embed) {
			return addQueryArgs(url, { _embed });
		}

		return url;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	prepareResponse(response: FetchResponse<E>, params: Partial<Params>): FetchResponse<R> {
		return {
			...response,
			queriedObject: this.getQueriedObject(response, params),
			result: response.result as unknown as R,
		};
	}

	/**
	 * The default fetcher function
	 *
	 * The default fetcher function handles authentication headers and errors from the API.
	 *
	 * A custom strategy can override this function to run additional logic before or after the fetch call
	 *
	 * @param url The URL to fetch
	 * @param params The request params
	 *
	 * @param options The fetcher options
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async fetcher(
		url: string,
		params: Partial<Params>,
		options: Partial<FetchOptions> = {},
	): Promise<FetchResponse<R>> {
		const args = {};
		if (options.bearerToken) {
			// @ts-expect-error
			args.headers = { Authorization: `Bearer ${options.bearerToken}` };
		}

		const result = await apiGet(`${this.baseURL}${url}`, args);
		const { data } = result.json;

		// if there's an error code and it's not a 4xx status code
		if (
			typeof result?.json?.code !== 'undefined' &&
			typeof result?.json?.code === 'string' &&
			data?.status !== 400
		) {
			let errorMsg = `WordPress returned a '${result?.json?.code}' error for the endpoint '${url}'.`;
			if (url.includes('/headless-wp')) {
				errorMsg = `You need to install 10up's Headless WordPress plugin.\n ${errorMsg} `;
			}

			if (result?.json?.message) {
				errorMsg = result.json.message;
			}

			throw new EndpointError(errorMsg);
		}

		const throwIfNotFound =
			typeof options?.throwIfNotFound !== 'undefined' ? options?.throwIfNotFound : true;

		if (throwIfNotFound && (result.json.length === 0 || data?.status === 400)) {
			throw new NotFoundError(`The request to ${url} returned no data`);
		}

		const page = Number(params.page) || 1;
		const response: FetchResponse<E> = {
			result: result.json,
			pageInfo: {
				totalPages: Number(result.headers['x-wp-totalpages']) || 0,
				totalItems: Number(result.headers['x-wp-total']) || 0,
				page,
			},
			queriedObject: {},
		};

		return this.prepareResponse(response, params);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getQueriedObject(response: FetchResponse<E>, params: Partial<Params>) {
		return {};
	}

	/**
	 * Filters the data returned from the API by excluding fields that are not needed in order to reduce
	 * payload size.
	 *
	 * @param data The data to filter
	 * @param filterOptions Filter options
	 * @returns The filtered data
	 */
	filterData(data: FetchResponse<R>, filterOptions?: FilterDataOptions<R>): FetchResponse<R> {
		const options = filterOptions ?? { method: 'ALLOW', fields: ['*'] };

		const { fields } = options;

		if (options.method === 'ALLOW') {
			if (fields[0] === '*') {
				return data;
			}

			return { ...data, result: acceptFields<R>(fields, data.result) as R };
		}

		if (options.method === 'REMOVE') {
			return {
				...data,
				result: removeFields<R>(fields, data.result) as R,
			};
		}

		return data;
	}

	/**
	 * This is a simple wrapper to quickly fetch data from the API given a set of params
	 *
	 * ## Usage
	 *
	 * ```tsx
	 * import { PostsArchiveFetchStrategy } from '@10up/headless-core';
	 *
	 * new PostsArchiveFetchStrategy('http://my-wp-url.com').get({perPage: 10});
	 * ```
	 *
	 * @param params The endpoint params
	 *
	 * @returns
	 */
	get(params: Partial<Params> = {}) {
		return this.fetcher(this.buildEndpointURL(params), params);
	}
}
