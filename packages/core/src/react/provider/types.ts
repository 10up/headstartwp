import { ReactNode } from 'react';
import { HeadlessConfig } from '../../types';

export type SettingsContextProps = {
	linkComponent?: ReactNode;
} & HeadlessConfig;
