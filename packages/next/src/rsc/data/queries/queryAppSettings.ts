import {
	AppEntity,
	EndpointParams,
	HeadlessConfig,
	MenuItemEntity,
	fetchAppSettings,
	getObjectProperty,
} from '@headstartwp/core';
import { handleFetchError } from '../handleFetchError';
import { prepareQuery } from './prepareQuery';
import { AppNextQueryProps } from './types';

type QueryAppSettingsResult = Awaited<ReturnType<typeof fetchAppSettings>> & {
	menu?: MenuItemEntity[];
	blockSetting?: any;
};

export async function queryAppSettings<
	T extends AppEntity = AppEntity,
	P extends EndpointParams = EndpointParams,
>(
	q: AppNextQueryProps<P>,
	_config: HeadlessConfig | undefined = undefined,
): Promise<QueryAppSettingsResult> {
	const { menu, blockSetting, ...rest } = q;

	const { config, ...query } = prepareQuery<P>(rest, _config);

	try {
		const result = (await fetchAppSettings<T, P>(query, config)) as QueryAppSettingsResult;

		if (menu && result.data.menus[menu]) {
			result.menu = result.data.menus[menu];
		}

		if (blockSetting && result.data['theme.json']) {
			const blockSettingValue = blockSetting?.blockName
				? getObjectProperty(
						result.data['theme.json'],
						`blocks.${blockSetting?.blockName}.${blockSetting.setting}`,
					)
				: getObjectProperty(result.data['theme.json'], blockSetting.setting);

			if (blockSettingValue) {
				result.blockSetting = blockSettingValue;
			}
		}

		return result;
	} catch (error) {
		if (error instanceof Error) {
			await handleFetchError(error, config, query.path);
		}
		throw error;
	}
}
