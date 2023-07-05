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
 *
 * @returns
 */
export function useThemeSetting(
	path: string,
	blockName: string | null = '',
	defaultValue: any = '',
) {
	const settings = useThemeSettings();

	if (blockName && get(settings, `blocks.${blockName}.${path}`)) {
		return get(settings, `blocks.${blockName}.${path}`);
	}

	return get(settings, path, defaultValue);
}
