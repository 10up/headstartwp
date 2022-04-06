import { FC, createContext, useMemo } from 'react';
import { getHeadlessConfig } from '../../utils';
import { SettingsContextProps } from './types';

export const SettingsContext = createContext<Partial<SettingsContextProps>>({});

interface ProviderProps {
	settings: SettingsContextProps;
}

export const SettingsProvider: FC<ProviderProps> = ({ settings, children }) => {
	const settingsValue = useMemo(
		() => ({
			...getHeadlessConfig(),
			...settings,
		}),
		[settings],
	);

	return <SettingsContext.Provider value={settingsValue}>{children}</SettingsContext.Provider>;
};
