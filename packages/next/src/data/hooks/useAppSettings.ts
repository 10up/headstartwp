import { EndpointParams, AppEntity, AppSettingsStrategy } from '@10up/headless-core';
import { HookResponse } from './types';
import { useFetch } from './useFetch';

const endpoint = '/wp-json/headless-wp/v1/app';

const fetchStrategy = new AppSettingsStrategy();

interface useAppSettingsResponse extends HookResponse {
	data?: AppEntity;
}

export function useAppSettings(params = {}): useAppSettingsResponse {
	const { data, error } = useFetch<AppEntity, EndpointParams>(endpoint, params, fetchStrategy);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	return { data: data as AppEntity, loading: false };
}
