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
	async fetcher(url: string, params: Params): Promise<FetchResponse<E>> {
		const result = await apiGet(`${this.baseURL}${url}`);
		const { data } = result.json;

		if (result.json.length === 0 || data?.status === 400) {
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
}
