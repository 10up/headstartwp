import {
	EndpointParams,
	AppEntity,
	AppSettingsStrategy,
	getWPUrl,
	FetchResponse,
} from '@10up/headless-core';
import { HookResponse, useFetch } from '@10up/headless-core/react';
import { SWRConfiguration } from 'swr';

export interface useAppSettingsResponse extends HookResponse {
	data?: AppEntity;
}

/**
 * The useAppSettings hook
 *
 * @param params
 * @param options
 *
 * @category Data Fetching Hooks
 */
export function useAppSettings(
	params = {},
	options: SWRConfiguration<FetchResponse<AppEntity>> = {},
): useAppSettingsResponse {
	const { data, error } = useFetch<AppEntity, EndpointParams>(
		params,
		useAppSettings.fetcher(),
		options,
	);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	const { result } = data;

	return { data: result, loading: false };
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useAppSettings {
	export const fetcher = () => new AppSettingsStrategy(getWPUrl());
}
