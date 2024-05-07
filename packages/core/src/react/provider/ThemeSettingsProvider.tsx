import type { FC } from 'react';
import { createContext } from 'react';
import type { ThemeJSON } from './types';

export const ThemeSettingsContext = createContext<ThemeJSON>({});

interface ProviderProps {
	data: ThemeJSON;
}

export const ThemeSettingsProvider: FC<ProviderProps> = ({ data, children }) => {
	return <ThemeSettingsContext.Provider value={data}>{children}</ThemeSettingsContext.Provider>;
};
