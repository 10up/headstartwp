import { KeyedMutator } from 'swr';
import { AppEntity, AppSettingsStrategy, EndpointParams, FetchResponse } from '../../data';
import { getWPUrl } from '../../utils';
import { FetchHookOptions, HookResponse } from './types';
import { useFetch } from './useFetch';
import { makeErrorCatchProxy } from './util';

export interface useAppSettingsResponse<T extends AppEntity> extends HookResponse {
	data: T;
	mutate: KeyedMutator<FetchResponse<T>>;
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
export function useFetchAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(
	params: P | {} = {},
	options: FetchHookOptions<FetchResponse<T>> = {},
): useAppSettingsResponse<T> {
	const { data, error, isMainQuery, mutate } = useFetch<T, P>(
		params,
		useFetchAppSettings.fetcher<T, P>(),
		options,
	);

	if (error || !data) {
		const fakeData = makeErrorCatchProxy<T>('data');
		return { error, loading: !data, data: fakeData, isMainQuery, mutate };
	}

	const { result } = data;

	return { data: result, loading: false, isMainQuery, mutate };
}

/**
 * @internal
 */
// eslint-disable-next-line no-redeclare
export namespace useFetchAppSettings {
	export const fetcher = <
		T extends AppEntity = AppEntity,
		P extends EndpointParams = EndpointParams,
	>(
		sourceUrl?: string,
		defaultParams?: P,
	) => new AppSettingsStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
}
