export type HeadlessConfigType = {
	customPostTypes: string[];
	redirectStrategy: '404' | 'none' | 'always';
};

const headlessConfig: Partial<HeadlessConfigType> = {
	customPostTypes: ['book'],
	redirectStrategy: '404',
};

export default headlessConfig;
