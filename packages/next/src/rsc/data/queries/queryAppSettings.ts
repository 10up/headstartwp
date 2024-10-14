import {
	AppEntity,
	AppQueryProps,
	AppSettingsStrategy,
	EndpointParams,
	HeadlessConfig,
	fetchAppSettings,
} from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { prepareQuery } from './prepareQuery';
import { NextQueryProps } from './types';

export type AppSettingsQueryProps<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
> = AppQueryProps<P> &
	NextQueryProps<P> & {
		fetchStrategy?: AppSettingsStrategy<T, P>;
	};

export async function queryAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(q: AppSettingsQueryProps<T, P> = {}, _config: HeadlessConfig | undefined = undefined) {
	const { fetchStrategy, ...nextQuery } = q;
	const { config, handleError, ...query } = prepareQuery<P>(nextQuery, _config);

	try {
		const result = await fetchAppSettings<T, P>(query, config, fetchStrategy);

		return { ...result, config };
	} catch (error) {
		if (error instanceof Error && handleError) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
