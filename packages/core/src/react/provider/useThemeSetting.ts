'use client';

import { getObjectProperty } from '../../utils';
import { useThemeSettings } from './useThemeSettings';

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

	if (blockName && getObjectProperty(settings, `blocks.${blockName}.${path}`)) {
		return getObjectProperty(settings, `blocks.${blockName}.${path}`);
	}

	// if blockName is set but doesn't have the setting and we should not fallback, return the default value only
	if (blockName && !fallbackToGlobalSetting) {
		return defaultValue;
	}

	return getObjectProperty(settings, path, defaultValue);
}
