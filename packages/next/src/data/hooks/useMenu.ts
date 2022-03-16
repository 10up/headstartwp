import { AppEntity } from '@10up/headless-core';
import { HookResponse } from './types';
import { useAppSettings } from './useAppSettings';

export interface useMenuResponse extends HookResponse {
	data?: AppEntity['menus'][0];
}

export function useMenu(menuLocation: string): useMenuResponse {
	const { data, error } = useAppSettings();

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	const { menus } = data;

	return { data: menus[menuLocation], loading: false };
}
