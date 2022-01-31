import { ReactNode } from 'react';

export type SettingsContextProps = {
	url: string;
	linkComponent?: ReactNode;
} & HeadlessConfig;

export type CustomPostTypes = Array<{ slug: string; endpoint: string }>;
export type RedirectStrategy = '404' | 'none' | 'always';
export type CustomTaxonomies = Array<{ slug: string; endpoint: string }>;

export type HeadlessConfig = {
	customPostTypes?: CustomPostTypes;
	customTaxonomies?: CustomTaxonomies;
	redirectStrategy?: RedirectStrategy;
	useWordPressPlugin?: boolean;
};
