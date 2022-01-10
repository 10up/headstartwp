import { useAppSettings } from './useAppSettings';

export function useMenu(menuLocation: string) {
	const { data, error } = useAppSettings();

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	const { menus } = data;

	return { data: menus[menuLocation], error: false, loading: false };
}
