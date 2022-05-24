import { MenuItemEntity } from '@10up/headless-core';
import { SWRConfiguration } from 'swr';
import { HookResponse } from '@10up/headless-core/react';
import { useAppSettings } from './useAppSettings';

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
 * The useMenu hooks. Returns a Menu object.
 *
 * **Important**: This hook depends on {@link useAppSettings}. If you want to enable SSR;SSG for
 * this hook you will need to fetch app settings on the server side.
 *
 * ## Usage
 *
 * ### Basic usage
 *
 * ```tsx
 * export const Nav = () => {
 * 	const { data, loading, error } = useMenu('primary-menu');
 *
 * 	// handle loading, error states
 *
 * 	return <Menu items={data} css={navStyles} />;
 * }
 * ```
 *
 * ### Re-fetching client-side on focus and/or mount
 * If you are fetching app settings on the server, you can enable re-fetching on focus and/or mount
 * to ensure menus are always up-to date even when using SSG/ISR.
 *
 * ```tsx
 * export const Nav = () => {
 * 	const { data, loading, error } = useMenu('primary-menu', {
 *		revalidateOnFocus: true,
 *		revalidateOnMount: true,
 * 	});
 *
 *	// handle loading, error states
 *
 * 	return <Menu items={data} css={navStyles} />;
 * }
 * ```
 *
 * @param menuLocation The slug of the menu location you want to fetch
 * @param options SWR configuration options
 *
 * @category Data Fetching Hooks
 */
export function useMenu(menuLocation: string, options: SWRConfiguration = {}): useMenuResponse {
	const { data, error } = useAppSettings({}, options);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

	const { menus } = data;

	const menu = menus && menus[menuLocation] ? flatToHierarchical(menus[menuLocation]) : [];

	return { data: menu, loading: false };
}
