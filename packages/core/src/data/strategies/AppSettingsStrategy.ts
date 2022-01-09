import { Entity } from '../types';
import { AbstractFetchStrategy, EndpointParams } from './AbstractFetchStrategy';

export class AppSettingsStrategy extends AbstractFetchStrategy<Entity, EndpointParams> {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getParamsFromURL(params: { path?: string[] | undefined } | undefined): Partial<EndpointParams> {
		return {};
	}
}
