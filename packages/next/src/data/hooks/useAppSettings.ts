import {
	EndpointParams,
	AppEntity,
	AppSettingsStrategy,
	getWPUrl,
	FetchResponse,
	HookResponse,
	useFetch,
} from '@10up/headless-core';
import { SWRConfiguration } from 'swr';

export interface useAppSettingsResponse extends HookResponse {
	data?: AppEntity;
}

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

useAppSettings.fetcher = () => new AppSettingsStrategy(getWPUrl());
