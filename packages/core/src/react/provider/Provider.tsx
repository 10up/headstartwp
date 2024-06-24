'use client';

import React, { FC, createContext, useMemo } from 'react';
import { getHeadlessConfig } from '../../utils/config';
import { SettingsContextProps } from './types';

export const SettingsContext = createContext<Partial<SettingsContextProps>>({});

interface ProviderProps {
	settings: SettingsContextProps;
	children: React.ReactNode;
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
