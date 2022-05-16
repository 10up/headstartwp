import { useContext } from 'react';
import { ThemeSettingsContext } from './ThemeSettingsPrrovider';

/**
 * Returns the raw theme.json settings definitions
 *
 * @returns
 */
export function useThemeSettings() {
	const { settings } = useContext(ThemeSettingsContext);

	return settings;
}
