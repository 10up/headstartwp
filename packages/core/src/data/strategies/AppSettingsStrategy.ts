import { AppEntity } from '../types';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export class AppSettingsStrategy extends AbstractFetchStrategy<AppEntity, EndpointParams> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getParamsFromURL(path: string): Partial<EndpointParams> {
		return {};
	}
}
