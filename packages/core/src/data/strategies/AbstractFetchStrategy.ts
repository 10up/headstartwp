import { Entity, PageInfo } from '../types';
import { apiGet } from '../api';
import { NotFoundError, addQueryArgs, EndpointError } from '../../utils';

/**
 * The base interface for definiting endpoint parameters
 *
 * Strategies should define type with the actuall supported EndPointParams
 */
export interface EndpointParams {
	/**
	 * The _embed param returneds associated entities in the response
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
	 * The autherntication token to use for the request.
	 */
	bearerToken?: string;
}

export interface FilterDataOptions {
	/**
	 * If method is 'ALLOW' then only the fields specified in the filter will be returned.
	 * If method is 'REMOVE' then the fields specified in the filter will be removed.
	 */
	method: 'ALLOW' | 'REMOVE';
	fields: string[];
}

/**
 * Abstract class that lays out a strategy for fetching data
 *
 * All Fetch Stategies should implement this class and it allows to share logic for fetching data both
 * on the front-end and on the back-end.
 *
 * @template E The type of entity that is fetched (e.g PostEntity, TermEntity etc)
 * @template Params The type of the params that are passed to the endpoint
 *
 * @category Data Fetching
 */
export abstract class AbstractFetchStrategy<E extends Entity, Params extends EndpointParams> {
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
	 */
	constructor(baseURL?: string) {
		if (baseURL) {
			this.setBaseURL(baseURL);
		}
	}

	/**
	 * The strategy can switch endpoints at runtime if neeeded.
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
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async fetcher(
		url: string,
		params: Partial<Params>,
		options: Partial<FetchOptions> = {},
	): Promise<FetchResponse<E>> {
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
		const response = {
			result: result.json,
			pageInfo: {
				totalPages: Number(result.headers['x-wp-totalpages']) || 0,
				totalItems: Number(result.headers['x-wp-total']) || 0,
				page,
			},
		};

		return response;
	}

	/**
	 * Filters the data returned from the API by excluding fields that are not needed in order to reduce
	 * payload size.
	 *
	 * @param data The data to filter
	 * @param options The options for filtering
	 * @returns The filtered data
	 */
	filterData(data: FetchResponse<E>, options: FilterDataOptions) {
		const fields = [...options.fields, 'yoast_head_json'];
		if (options.method === 'ALLOW') {
			if (fields[0] === '*') {
				return data;
			}

			const allowedData = Array.isArray(data.result) ? [] : {};

			if (Array.isArray(data.result)) {
				data.result.forEach((record, i) => {
					// @ts-expect-error
					allowedData.push({});
					fields.forEach((field) => {
						// @ts-expect-error
						if (data.result[i][field]) {
							// @ts-expect-error
							allowedData[i][field] = data.result[i][field];
						}
					});
				});
			} else {
				fields.forEach((field) => {
					allowedData[field] = data.result[field];
				});
			}

			return { ...data, result: allowedData };
		}

		if (options.method === 'REMOVE') {
			fields.forEach((field) => {
				if (Array.isArray(data.result)) {
					data.result.forEach((record, i) => {
						// @ts-expect-error
						delete data.result[i][field];
					});
				} else {
					delete data.result[field];
				}
			});
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
	get(params: Params) {
		return this.fetcher(this.buildEndpointURL(params), params);
	}
}
