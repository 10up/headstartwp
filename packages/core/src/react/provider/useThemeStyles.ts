import { useTheme } from '@emotion/react';

/**
 * Returns the theme.json styles definitions
 *
 * @returns
 */
export function useThemeStyles() {
	const { styles } = useTheme();

	return styles;
}
