import { addQueryArgs } from '@wordpress/url';
import { Entity, PageInfo } from '../types';
import { apiGet } from '../api';
import { NotFoundError } from '../../utils';

export interface EndpointParams {
	_embed?: boolean;
	[k: string]: unknown;
}

export interface FetchResponse<T> {
	result: T;
	pageInfo: PageInfo;
}

export interface FetchOptions {
	throwIfNotFound: boolean;
	bearerToken?: string;
}

export interface FilterDataOptions {
	method: 'ALLOW' | 'REMOVE';
	fields: string[];
}

/**
 * Abstract class that lays out a strategy for fetching data
 */
export abstract class AbstractFetchStrategy<E extends Entity, Params extends EndpointParams> {
	endpoint: string = '';

	baseURL: string = '';

	setEndpoint(endpoint: string) {
		this.endpoint = endpoint;
	}

	setBaseURL(url: string | undefined = '') {
		this.baseURL = url;
	}

	/**
	 * Creates a path from array of arguments
	 *
	 * @param args - Array of catch-all arguments
	 *
	 * @returns path
	 */
	createPathFromArgs(args: string[]) {
		return `/${args.join('/')}`;
	}

	/**
	 * Returns the supported params from the URL if present
	 *
	 * @param params The URL params
	 *
	 * @returns params extracted from the URL
	 */
	abstract getParamsFromURL(params: { path?: string[] } | undefined): Partial<Params>;

	/**
	 * Builds the final endpoint URL based on the passed parameters
	 *
	 * @param params - The params to add to the request
	 *
	 * @returns - The endpoint URL.
	 */
	buildEndpointURL(params: Partial<Params>): string {
		const { _embed, ...endpointParams } = params;
		const url = addQueryArgs(this.endpoint, { ...endpointParams });

		if (_embed) {
			return addQueryArgs(url, { _embed });
		}

		return url;
	}

	/**
	 * The default fetcher function
	 *
	 * @param url The URL to fetch
	 * @param params The request params
	 *
	 * @returns JSON response
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async fetcher(
		url: string,
		params: Params,
		options: Partial<FetchOptions> = {},
	): Promise<FetchResponse<E>> {
		const args = {};
		if (options.bearerToken) {
			// @ts-expect-error
			args.headers = { Authorization: `Bearer ${options.bearerToken}` };
		}
		const result = await apiGet(`${this.baseURL}${url}`, args);
		const { data } = result.json;

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
						allowedData[i][field] = data.result[i][field];
					});
				});
			} else {
				fields.forEach((field) => {
					// @ts-expect-error
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
}
