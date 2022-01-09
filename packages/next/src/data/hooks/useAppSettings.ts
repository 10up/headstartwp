import { EndpointParams, Entity, AppSettingsStrategy } from '@10up/headless-core';
import { useFetch } from './useFetch';

const endpoint = '/wp-json/headless-wp/v1/app';

const fetchStrategy = new AppSettingsStrategy();

export function useAppSettings(params = {}) {
	const { data, error } = useFetch<Entity, EndpointParams>(endpoint, params, fetchStrategy);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	return { data, loading: false };
}
