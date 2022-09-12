import { AppEntity } from '../types';
import { AbstractFetchStrategy, EndpointParams, FetchOptions } from './AbstractFetchStrategy';
import { endpoints } from '../utils';

/**
 * The EndpointParams supported by the [[VerifyTokenFetchStrategy]]
 */
export interface VerifyTokenParams extends EndpointParams {
	/**
	 * The authToken, required to fetch revisions or non-published posts
	 */
	authToken?: string;
}

/**
 * The Verify Token strategy is used to verify tokens issued by the
 * headless wp plugin
 *
 * @category Data Fetching
 */
export class VerifyTokenFetchStrategy extends AbstractFetchStrategy<AppEntity, EndpointParams> {
	getDefaultEndpoint(): string {
		return endpoints.tokenVerify;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getParamsFromURL(path: string, params: Partial<EndpointParams> = {}): Partial<EndpointParams> {
		return {};
	}

	buildEndpointURL(params: Partial<VerifyTokenParams>): string {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { authToken, ...rest } = params;

		return super.buildEndpointURL({ ...rest, _embed: false });
	}

	/**
	 * Handles fetching by multiple post types, authToken and revisions
	 *
	 * @param url The url to fetch
	 * @param params The params to build the endpoint url
	 * @param options FetchOptions
	 */
	async fetcher(url: string, params: VerifyTokenParams, options: Partial<FetchOptions> = {}) {
		if (params.authToken) {
			options.bearerToken = params.authToken;
		}

		return super.fetcher(url, params, options);
	}
}
