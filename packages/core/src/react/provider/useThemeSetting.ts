import { useThemeSettings } from './useThemeSettings';

const get = (obj, path, defaultValue = undefined) => {
	const travel = (regexp) =>
		String.prototype.split
			.call(path, regexp)
			.filter(Boolean)
			.reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
	const result = travel(/[,[\]]+?/) || travel(/[,[\].]+?/);
	return result === undefined || result === obj ? defaultValue : result;
};

/**
 * Returns a isngle theme setting normalized
 *
 * @param path - The path to the setting
 * @param blockName - The block name
 * @returns
 */
export function useThemeSetting(path: string, blockName: string = '') {
	const settings = useThemeSettings();

	if (blockName) {
		return get(settings, `${blockName}.${path}`);
	}

	return get(settings, path);
}
