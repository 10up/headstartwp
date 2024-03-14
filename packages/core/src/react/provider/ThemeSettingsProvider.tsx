import { PropsWithChildren, createContext } from 'react';
import { ThemeJSON } from './types';

export const ThemeSettingsContext = createContext<ThemeJSON>({});

interface ProviderProps {
	data: ThemeJSON;
}

export const ThemeSettingsProvider = ({ data, children }: PropsWithChildren<ProviderProps>) => {
	return <ThemeSettingsContext.Provider value={data}>{children}</ThemeSettingsContext.Provider>;
};
