import { AppEntity } from '../types';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';
import { endpoints } from '../utils';

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
}
