import { HeadlessConfig } from '../provider/types';

declare const __10up__HEADLESS_CONFIG: HeadlessConfig;

export function getHeadlessConfig() {
	const { customPostTypes, redirectStrategy, useWordPressPlugin, customTaxonomies } =
		__10up__HEADLESS_CONFIG;

	const headlessConfig: HeadlessConfig = {
		customPostTypes,
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

export function getCustomPostTypesSlugs() {
	const { customPostTypes } = getHeadlessConfig();

	if (!customPostTypes) {
		return [];
	}

	return customPostTypes.map(({ slug }) => slug);
}

export function getCustomPostTypes() {
	const { customPostTypes } = getHeadlessConfig();
	const corePostTypes = [
		{
			slug: 'post',
			endpoint: '/wp-json/wp/v2/posts',
		},
		{
			slug: 'page',
			endpoint: '/wp-json/wp/v2/pages',
		},
	];

	return [...(customPostTypes || []), ...corePostTypes];
}

export function getCustomPostType(slug: string) {
	const postTypes = getCustomPostTypes();

	return postTypes?.find((postType) => postType.slug === slug);
}
