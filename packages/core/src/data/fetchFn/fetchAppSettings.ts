import { AppSettingsStrategy, EndpointParams, executeFetchStrategy } from '../strategies';
import { HeadlessConfig } from '../../types';
import { getHeadstartWPConfig, getObjectProperty, getWPUrl } from '../../utils';
import { AppEntity, MenuItemEntity } from '../types';
import { QueryProps } from './types';

export type AppQueryProps<P> = QueryProps<P> & {
	menu?: string;
	blockSetting?: {
		blockName?: string;
		setting: string;
	};
};

export type AppQueryResult<T> = {
	data: T;
	menu?: MenuItemEntity[];
	blockSettingValue?: unknown;
};

export function flatToHierarchical(flat: MenuItemEntity[]): MenuItemEntity[] {
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

export async function fetchAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(
	query: Omit<AppQueryProps<P>, 'path'> = {},
	_config: HeadlessConfig | undefined = undefined,
): Promise<AppQueryResult<T>> {
	const { params = {}, options, menu, blockSetting } = query;

	const config = _config ?? getHeadstartWPConfig();

	const { data } = await executeFetchStrategy<T, P>(
		fetchAppSettings.fetcher<T, P>(),
		config,
		params,
		options,
	);

	const result: AppQueryResult<T> = { data: data.result };

	if (menu && data.result.menus[menu]) {
		result.menu = flatToHierarchical(data.result.menus[menu]);
	}

	if (blockSetting && data['theme.json']) {
		const blockSettingValue = blockSetting?.blockName
			? getObjectProperty(
					data.result['theme.json'],
					`blocks.${blockSetting?.blockName}.${blockSetting.setting}`,
				)
			: getObjectProperty(result.data['theme.json'], blockSetting.setting);

		if (blockSettingValue) {
			result.blockSettingValue = blockSettingValue;
		}
	}

	return result;
}

fetchAppSettings.fetcher = <
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(
	sourceUrl?: string,
	defaultParams?: P,
) => new AppSettingsStrategy<T, P>(sourceUrl ?? getWPUrl(), defaultParams);
