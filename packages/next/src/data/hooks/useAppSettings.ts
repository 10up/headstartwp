import { EndpointParams, AppEntity, AppSettingsStrategy } from '@10up/headless-core';
import { HookResponse } from './types';
import { useFetch } from './useFetch';

interface useAppSettingsResponse extends HookResponse {
	data?: AppEntity;
}

export function useAppSettings(params = {}): useAppSettingsResponse {
	const { data, error } = useFetch<AppEntity, EndpointParams>(params, useAppSettings.fetcher());

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	const { result } = data;

	return { data: result, loading: false };
}

useAppSettings.fetcher = () => new AppSettingsStrategy();
