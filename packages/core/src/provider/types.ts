export type CustomPostTypes = string[];
export type RedirectStrategy = '404' | 'none' | 'always';

export type HeadlessConfig = {
	customPostTypes: CustomPostTypes;
	redirectStrategy: RedirectStrategy;
};

export type SettingsContextProps = {
	url: string;
} & HeadlessConfig;
