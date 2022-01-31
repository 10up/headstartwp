import { HeadlessConfig } from '../provider/types';

declare const __10up__HEADLESS_CONFIG: HeadlessConfig;

export function getHeadlessConfig() {
	const { customPostTypes, redirectStrategy, useWordPressPlugin, customTaxonomies } =
		__10up__HEADLESS_CONFIG;

	const headlessConfig: HeadlessConfig = {
		customPostTypes: customPostTypes || [],
		customTaxonomies,
		redirectStrategy: redirectStrategy || 'none',
		useWordPressPlugin: useWordPressPlugin || false,
	};

	return headlessConfig;
}

export function getCustomTaxonomySlugs() {
	const { customTaxonomies } = getHeadlessConfig();

	if (!customTaxonomies) {
		return [];
	}

	return customTaxonomies.map(({ slug }) => slug);
}

export function getCustomTaxonomies() {
	const { customTaxonomies } = getHeadlessConfig();

	return customTaxonomies;
}
