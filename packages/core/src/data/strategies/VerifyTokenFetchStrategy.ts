import { AppEntity } from '../types';
import { AbstractFetchStrategy, EndpointParams, FetchOptions } from './AbstractFetchStrategy';
import { endpoints } from '../utils';

/**
 * The EndpointParams supported by the [[VerifyTokenFetchStrategy]]
 */
export interface VerifyTokenParams extends EndpointParams {
	authToken?: string;
}

/**
 * The Verify Token strategy is used to verify tokens issued by the
 * headless wp plugin
 *
 * @category Data Fetching
 */
export class VerifyTokenFetchStrategy extends AbstractFetchStrategy<
	AppEntity,
	EndpointParams,
	AppEntity
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
			options.bearerToken = params.authToken;
		}

		return super.fetcher(url, params, options);
	}
}
