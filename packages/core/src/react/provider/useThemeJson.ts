import { useContext } from 'react';
import { ThemeJsonContext } from './ThemeJsonProvider';

export function useThemeJson() {
	return useContext(ThemeJsonContext);
}
