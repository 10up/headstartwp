import {
	AppEntity,
	AppQueryProps,
	EndpointParams,
	HeadlessConfig,
	fetchAppSettings,
} from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { prepareQuery } from './prepareQuery';

export async function queryAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(q: AppQueryProps<P>, _config: HeadlessConfig | undefined = undefined) {
	const { config, ...query } = prepareQuery<P>(q, _config);

	try {
		const result = await fetchAppSettings<T, P>(query, config);

		return result;
	} catch (error) {
		if (error instanceof Error) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
