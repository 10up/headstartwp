import { AppEntity, EndpointParams, HeadlessConfig, fetchAppSettings } from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { prepareQuery } from './prepareQuery';
import { NextQueryProps } from './types';

export async function queryAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(q: NextQueryProps<P>, _config: HeadlessConfig | undefined = undefined) {
	const { config, ...query } = prepareQuery<P>(q, _config);

	// TODO: do we need to handle errors?

	try {
		const result = await fetchAppSettings<T, P>(query, config);

		return result;
	} catch (error) {
		if (error instanceof Error) {
			handleFetchError(error, query.path);
		}
		throw error;
	}
}
