import { AppEntity } from '../types';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';
import { endpoints } from '../utils';

/**
 * The App Settings strategy is used to fetch the app settings endpoints exposed by the
 * headless wp plugin
 *
 * @category Data Fetching
 */
export class AppSettingsStrategy extends AbstractFetchStrategy<AppEntity, EndpointParams> {
	getDefaultEndpoint(): string {
		return endpoints.appSettings;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getParamsFromURL(path: string): Partial<EndpointParams> {
		return { _embed: true };
	}
}
