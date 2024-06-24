'use client';

import { FC, createContext } from 'react';
import { ThemeJSON } from './types';

export const ThemeSettingsContext = createContext<ThemeJSON>({});

interface ProviderProps {
	data: ThemeJSON;
	children: React.ReactNode;
}

export const ThemeSettingsProvider: FC<ProviderProps> = ({ data, children }) => {
	return <ThemeSettingsContext.Provider value={data}>{children}</ThemeSettingsContext.Provider>;
};
