import { useTheme } from '@emotion/react';

/**
 * Returns the raw theme.json settings definitions
 *
 * @returns
 */
export function useThemeSettings() {
	const { settings } = useTheme();

	return settings;
}
