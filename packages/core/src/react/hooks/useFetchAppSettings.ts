import { SWRConfiguration } from 'swr';
import { AppEntity, AppSettingsStrategy, EndpointParams, FetchResponse } from '../../data';
import { getWPUrl } from '../../utils';
import { HookResponse } from './types';
import { useFetch } from './useFetch';

export interface useAppSettingsResponse extends HookResponse {
	data?: AppEntity;
}

/**
 * The useAppSettings hook
 *
 * See {@link useAppSettings}
 *
 * @param params The list of params to pass to the fetch strategy. It overrides the ones in the URL.
 * @param options The options to pass to the swr hook.
 *
 * @category Data Fetching Hooks
 */
export function useFetchAppSettings(
	params = {},
	options: SWRConfiguration<FetchResponse<AppEntity>> = {},
): useAppSettingsResponse {
	const { data, error } = useFetch<AppEntity, EndpointParams>(
		params,
		useFetchAppSettings.fetcher(),
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
export namespace useFetchAppSettings {
	export const fetcher = () => new AppSettingsStrategy(getWPUrl());
}
