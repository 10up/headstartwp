export type SettingsContextProps = {
	url: string;
	customPostTypes: string[];
	redirectStrategy: '404' | 'none' | 'always';
};
