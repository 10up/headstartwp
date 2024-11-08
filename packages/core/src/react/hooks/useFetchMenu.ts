import { AppEntity, FetchResponse, flatToHierarchical, MenuItemEntity } from '../../data';
import { FetchHookOptions, HookResponse } from './types';
import { useFetchAppSettings } from './useFetchAppSettings';
import { isProxy, makeErrorCatchProxy } from './util';

export interface useMenuResponse extends HookResponse {
	data: MenuItemEntity[];
}

/**
 * The useFetchMenu hooks. Returns a Menu object.
 *
 * @param menuLocation The slug of the menu location you want to fetch
 * @param options SWR configuration options
 *
 * @category Data Fetching Hooks
 */
export function useFetchMenu(
	menuLocation: string,
	options: FetchHookOptions<FetchResponse<AppEntity>> = {},
): useMenuResponse {
	const { data, error, isMainQuery } = useFetchAppSettings({}, options);

	const doesNotHasData = !data || data[isProxy] === true;
	if (error || doesNotHasData) {
		const fakeData = makeErrorCatchProxy<MenuItemEntity[]>('data');
		return { error, loading: doesNotHasData, data: fakeData, isMainQuery };
	}

	const { menus } = data;

	const menu = menus && menus[menuLocation] ? flatToHierarchical(menus[menuLocation]) : [];

	return { data: menu, loading: false, isMainQuery };
}
