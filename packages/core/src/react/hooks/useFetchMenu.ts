import { SWRConfiguration } from 'swr';
import { MenuItemEntity } from '../../data';
import { HookResponse } from './types';
import { useFetchAppSettings } from './useFetchAppSettings';
import { isProxy, makeErrorCatchProxy } from './util';

export interface useMenuResponse extends HookResponse {
	data?: MenuItemEntity[];
}

function flatToHierarchical(flat: MenuItemEntity[]): MenuItemEntity[] {
	const roots: MenuItemEntity[] = [];

	const all: Record<number, MenuItemEntity> = {};
	flat.forEach((item, index) => {
		all[item.ID] = { ...item, children: [], order: index };
	});

	Object.keys(all).forEach((key) => {
		const id = Number(key);
		const item = all[id];
		const parentId = Number(item.menu_item_parent);

		if (parentId === 0) {
			roots.push(item);
		} else if (item.menu_item_parent in all) {
			const p = all[item.menu_item_parent];
			if (!('children' in p)) {
				p.children = [];
			}
			p.children.push(item);
		}
	});

	roots.sort((a, b) => a.order - b.order);
	roots.forEach((root) => {
		root?.children?.sort((a, b) => a.order - b.order);
	});

	return roots;
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
	options: SWRConfiguration = {},
): useMenuResponse {
	const { data, error } = useFetchAppSettings({}, options);

	const doesNotHasData = !data || data[isProxy] === true;
	if (error || doesNotHasData) {
		const fakeData = makeErrorCatchProxy<MenuItemEntity[]>('data');
		return { error, loading: doesNotHasData, data: fakeData };
	}

	const { menus } = data;

	const menu = menus && menus[menuLocation] ? flatToHierarchical(menus[menuLocation]) : [];

	return { data: menu, loading: false };
}
