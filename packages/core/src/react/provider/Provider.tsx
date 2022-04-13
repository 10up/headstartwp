import { FC, createContext, useMemo, ReactNode } from 'react';
import { getHeadlessConfig } from '../../utils/getHeadlessConfig';
import { SettingsContextProps } from './types';

export const SettingsContext = createContext<Partial<SettingsContextProps>>({});

interface ProviderProps {
	settings: SettingsContextProps;
	children: ReactNode;
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
