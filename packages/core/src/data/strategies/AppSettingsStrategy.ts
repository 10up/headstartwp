import type { AppEntity } from '../types';
import type { EndpointParams } from './AbstractFetchStrategy';
import { AbstractFetchStrategy } from './AbstractFetchStrategy';
import { endpoints } from '../utils';

/**
 * The App Settings strategy is used to fetch the app settings endpoints exposed by the
 * headless wp plugin
 *
 * @category Data Fetching
 */
export class AppSettingsStrategy<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
> extends AbstractFetchStrategy<T, P> {
	getDefaultEndpoint(): string {
		return endpoints.appSettings;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getParamsFromURL(path: string, params: Partial<P> = {}): Partial<P> {
		return {};
	}
}
