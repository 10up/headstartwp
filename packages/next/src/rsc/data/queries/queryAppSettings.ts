import {
	AppEntity,
	AppQueryProps,
	EndpointParams,
	HeadlessConfig,
	fetchAppSettings,
} from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { prepareQuery } from './prepareQuery';
import { NextQueryProps } from './types';

export async function queryAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(q: AppQueryProps<P> & NextQueryProps<P> = {}, _config: HeadlessConfig | undefined = undefined) {
	const { config, handleError, ...query } = prepareQuery<P>(q, _config);

	try {
		const result = await fetchAppSettings<T, P>(query, config);

		return { ...result, config };
	} catch (error) {
		if (error instanceof Error && handleError) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
