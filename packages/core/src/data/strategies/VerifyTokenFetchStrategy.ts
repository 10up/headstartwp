import { Entity } from '../types';
import { AbstractFetchStrategy, EndpointParams, FetchOptions } from './AbstractFetchStrategy';
import { endpoints } from '../utils';

/**
 * The EndpointParams supported by the {@link VerifyTokenFetchStrategy}
 */
export interface VerifyTokenParams extends EndpointParams {
	authToken?: string;
}

/**
 * The TokenEntity represents a token issued by the headless wp plugin
 */
export interface TokenEntity extends Entity {
	/**
	 * The path that the token was issued for
	 */
	path: string;

	/**
	 * The post_id that the token was issued for
	 */
	post_id: number;
}

/**
 * The Verify Token strategy is used to verify tokens issued by the
 * headless wp plugin
 *
 * @category Data Fetching
 */
export class VerifyTokenFetchStrategy extends AbstractFetchStrategy<
	TokenEntity,
	VerifyTokenParams,
	TokenEntity
> {
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

	async fetcher(url: string, params: VerifyTokenParams, options: Partial<FetchOptions> = {}) {
		if (params.authToken) {
			options.previewToken = params.authToken;
		}

		return super.fetcher(url, params, options);
	}
}
