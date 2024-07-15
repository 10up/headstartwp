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

export type AppQueryResult = {
	data: AppEntity;
	menu?: MenuItemEntity[];
	blockSettingValue?: unknown;
};

export async function fetchAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(
	query: Omit<AppQueryProps<P>, 'path'>,
	_config: HeadlessConfig | undefined = undefined,
): Promise<AppQueryResult> {
	const { params = {}, options, menu, blockSetting } = query;

	const config = _config ?? getHeadstartWPConfig();

	const { data } = await executeFetchStrategy<T, P>(
		fetchAppSettings.fetcher<T, P>(),
		config,
		params,
		options,
	);

	const result: AppQueryResult = { data: data.result };

	if (menu && data.result.menus[menu]) {
		result.menu = data.result.menus[menu];
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
