'use client';

import { useThemeSettings } from './useThemeSettings';

const get = (obj, path, defaultValue: any = undefined) => {
	const travel = (regexp) =>
		String.prototype.split
			.call(path, regexp)
			.filter(Boolean)
			.reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
	const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
	return result === undefined || result === obj ? defaultValue : result;
};

/**
 * Returns a single theme setting normalized
 *
 * @param path - The path to the setting
 * @param blockName - The block name
 * @param defaultValue the default value to return
 * @param fallbackToGlobalSetting Whether it should fallback to global setting if blockName is passed but setting does not exist
 * @returns
 */
export function useThemeSetting(
	path: string,
	blockName: string | null = '',
	defaultValue: any = '',
	fallbackToGlobalSetting = true,
) {
	const settings = useThemeSettings();

	if (blockName && get(settings, `blocks.${blockName}.${path}`)) {
		return get(settings, `blocks.${blockName}.${path}`);
	}

	// if blockName is set but doesn't have the setting and we should not fallback, return the default value only
	if (blockName && !fallbackToGlobalSetting) {
		return defaultValue;
	}

	return get(settings, path, defaultValue);
}
