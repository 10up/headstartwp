import { ReactNode } from 'react';

export type SettingsContextProps = {
	url: string;
	linkComponent?: ReactNode;
} & HeadlessConfig;

export type CustomPostTypes = string[];
export type RedirectStrategy = '404' | 'none' | 'always';

export type HeadlessConfig = {
	customPostTypes: CustomPostTypes;
	redirectStrategy: RedirectStrategy;
};
