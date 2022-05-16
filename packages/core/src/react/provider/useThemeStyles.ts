import { useContext } from 'react';
import { ThemeSettingsContext } from './ThemeSettingsPrrovider';

/**
 * Returns the theme.json styles definitions
 *
 * @returns
 */
export function useThemeStyles() {
	const { styles } = useContext(ThemeSettingsContext);

	return styles;
}
