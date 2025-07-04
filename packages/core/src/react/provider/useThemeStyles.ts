'use client';

import { useContext } from 'react';
import { ThemeSettingsContext } from './ThemeSettingsProvider';

/**
 * Returns the theme.json styles definitions
 *
 * @returns
 */
export function useThemeStyles() {
	const { styles } = useContext(ThemeSettingsContext);

	return styles;
}
