import { AppSettingsStrategy, EndpointParams, executeFetchStrategy } from '../strategies';
import { HeadlessConfig } from '../../types';
import { getHeadstartWPConfig, getWPUrl } from '../../utils';
import { AppEntity } from '../types';
import { QueryProps } from './types';

/**
 *
 * @param query
 * @param _config
 * @returns
 */
export async function fetchAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(query: Omit<QueryProps<P>, 'path'>, _config: HeadlessConfig | undefined = undefined) {
	const { params = {}, options } = query;

	const config = _config ?? getHeadstartWPConfig();

	return executeFetchStrategy<T, P>(fetchAppSettings.fetcher<T, P>(), config, params, options);
}

fetchAppSettings.fetcher = <
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(
	sourceUrl?: string,
	defaultParams?: P,
) => new AppSettingsStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
