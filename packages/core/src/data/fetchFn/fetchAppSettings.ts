import { AppSettingsStrategy, EndpointParams, executeFetchStrategy } from '../strategies';
import { HeadlessConfig } from '../../types';
import { getHeadstartWPConfig, getObjectProperty, getWPUrl } from '../../utils';
import { AppEntity, MenuItemEntity } from '../types';
import { QueryProps } from './types';
import { ThemeJSON } from '../../react/provider/types';

export type BlockSettingQuery = {
	blockName?: string;
	setting: string;
};

export type AppQueryProps<P extends EndpointParams> = QueryProps<P> & {
	menu?: string;
	blockSetting?: BlockSettingQuery;
};

export type AppQueryResult<T> = {
	data: T;
	menu?: MenuItemEntity[];
	blockSettingValue?: unknown;
};

export function flatToHierarchical(flat: MenuItemEntity[]): MenuItemEntity[] {
	const roots: MenuItemEntity[] = [];

	const all: Record<string, MenuItemEntity> = {};
	flat.forEach((item, index) => {
		all[item.ID] = { ...item, children: [], order: index };
	});

	Object.keys(all).forEach((key) => {
		const id = key;
		const item = all[id];
		const parentId = item.menu_item_parent;

		if (parentId === '0') {
			roots.push(item);
		} else if (item.menu_item_parent in all) {
			const p = all[item.menu_item_parent];
			if (!p.children) {
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

export function getThemeSetting(
	themeSettings: ThemeJSON['settings'],
	blockSetting: BlockSettingQuery,
) {
	return blockSetting?.blockName
		? getObjectProperty(
				themeSettings,
				`blocks.${blockSetting?.blockName}.${blockSetting.setting}`,
			)
		: getObjectProperty(themeSettings, blockSetting.setting);
}

export async function fetchAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(
	query: Omit<AppQueryProps<P>, 'path'> = {},
	_config: HeadlessConfig | undefined = undefined,
	fetcher: AppSettingsStrategy<T, P> | undefined = undefined,
): Promise<AppQueryResult<T>> {
	const { params = {}, options, menu, blockSetting } = query;

	const config = _config ?? getHeadstartWPConfig();

	const { data } = await executeFetchStrategy<T, P>(
		fetcher ?? fetchAppSettings.fetcher<T, P>(),
		config,
		params,
		options,
	);

	const themeSettings = data.result['theme.json']?.settings;

	const result: AppQueryResult<T> = { data: data.result };

	if (menu && data.result.menus[menu]) {
		result.menu = flatToHierarchical(data.result.menus[menu]);
	}

	if (blockSetting && themeSettings) {
		const blockSettingValue = getThemeSetting(themeSettings, blockSetting);

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
