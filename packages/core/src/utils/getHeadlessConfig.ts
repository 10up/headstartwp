import { HeadlessConfig } from '../provider/types';

export function getHeadlessConfig() {
	// @ts-ignore
	const { customPostTypes, redirectStrategy, useWordPressPlugin } = __10up__HEADLESS_CONFIG;

	const headlessConfig: HeadlessConfig = {
		customPostTypes: customPostTypes || [],
		redirectStrategy: redirectStrategy || 'none',
		useWordPressPlugin: useWordPressPlugin || false,
	};

	return headlessConfig;
}
