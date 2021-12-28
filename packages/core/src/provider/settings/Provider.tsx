import { FC, createContext } from 'react';
import { getHeadlessConfig } from '../../utils';
import { SettingsContextProps } from './types';

export const SettingsContext = createContext<Partial<SettingsContextProps>>({});

interface ProviderProps {
	settings: SettingsContextProps;
}

export const SettingsProvider: FC<ProviderProps> = ({ settings, children }) => {
	return (
		<SettingsContext.Provider
			value={{
				...getHeadlessConfig(),
				...settings,
			}}
		>
			{children}
		</SettingsContext.Provider>
	);
};
