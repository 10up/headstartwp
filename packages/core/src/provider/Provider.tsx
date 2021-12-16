import { FC, createContext } from 'react';
import headlessConfig from '../headless.config';
import { SettingsContextProps } from './types';

export const SettingsContext = createContext<Partial<SettingsContextProps>>({});

interface ProviderProps {
	settings: SettingsContextProps;
}

export const SettingsProvider: FC<ProviderProps> = ({ settings, children }) => {
	return (
		<SettingsContext.Provider value={{ ...headlessConfig, ...settings }}>
			{children}
		</SettingsContext.Provider>
	);
};
