import { ReactNode } from 'react';
import type { HeadlessConfig } from '../../types';

export type SettingsContextProps = {
	linkComponent?: ReactNode;
} & HeadlessConfig;
