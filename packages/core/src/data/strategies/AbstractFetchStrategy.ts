import { addQueryArgs } from '@wordpress/url';
import { Entity } from '../types';
import { apiGet } from '../api';

export interface EndpointParams {
	_embed?: boolean;
	[k: string]: unknown;
}

/**
 * Abstract class that lays out a strategy for fetching data
 */
export abstract class AbstractFetchStrategy<E extends Entity, Params extends EndpointParams> {
	endpoint: string = '';

	setEndpoint(endpoint: string) {
		this.endpoint = endpoint;
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
	abstract getParamsFromURL(params: { args?: string[] } | undefined): Params;

	/**
	 * Builds the final endpoint URL based on the passed parameters
	 *
	 * @param params - The params to add to the request
	 *
	 * @returns - The endpoint URL.
	 */
	buildEndpointURL(params: Params): string {
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
	 *
	 * @returns JSON response
	 */
	async fetcher(url: string): Promise<E> {
		const result = await apiGet(url);
		return result.json;
	}
}
