import { endpoints } from '../data/utils/endpoints';
import { HeadlessConfig } from '../types';

declare const __10up__HEADLESS_CONFIG: HeadlessConfig;

/**
 * Returns the contents of headless.config.js
 *
 * @returns {HeadlessConfig}
 */
export function getHeadlessConfig() {
	const { customPostTypes, redirectStrategy, useWordPressPlugin, customTaxonomies, sourceUrl } =
		__10up__HEADLESS_CONFIG;

	const headlessConfig: HeadlessConfig = {
		sourceUrl,
		customPostTypes,
		customTaxonomies,
		redirectStrategy: redirectStrategy || 'none',
		useWordPressPlugin: useWordPressPlugin || false,
	};

	return headlessConfig;
}

/**
 * Returns the avaliable taxonomy slugs
 *
 * @returns {string[]}
 */
export function getCustomTaxonomySlugs() {
	const { customTaxonomies } = getHeadlessConfig();

	if (!customTaxonomies) {
		return [];
	}

	return customTaxonomies.map(({ slug }) => slug);
}

/**
 * Returns the avaliable taxonomies
 *
 * @returns {HeadlessConfig["customTaxonomies"]}
 */
export function getCustomTaxonomies() {
	const { customTaxonomies } = getHeadlessConfig();

	const taxonomies = customTaxonomies || [];

	const hasCategory = taxonomies.find(({ slug }) => slug === 'category');
	const hasTag = taxonomies.find(({ slug }) => slug === 'post_tag');

	if (!hasCategory) {
		taxonomies.push({
			slug: 'category',
			endpoint: endpoints.category,
			restParam: 'categories',
		});
	}

	if (!hasTag) {
		taxonomies.push({
			slug: 'post_tag',
			endpoint: endpoints.tags,
			rewrite: 'tag',
			restParam: 'tags',
		});
	}

	return taxonomies;
}

/**
 * Returns a single post type by slug if defined
 *
 * @param slug post type slug
 *
 * @returns
 */
export function getCustomTaxonomy(slug: string) {
	const taxonomies = getCustomTaxonomies();

	return taxonomies?.find((taxonomy) => taxonomy.slug === slug);
}

/**
 * Returns the avaliable post type slugs
 *
 * @returns {string[]}
 */
export function getCustomPostTypesSlugs() {
	const { customPostTypes } = getHeadlessConfig();

	if (!customPostTypes) {
		return [];
	}

	return customPostTypes.map(({ slug }) => slug);
}

/**
 * Returns the avaliable post types
 *
 * @returns {HeadlessConfig["customPostTypes"]}
 */
export function getCustomPostTypes() {
	const { customPostTypes } = getHeadlessConfig();

	const postTypes = customPostTypes || [];

	const hasPost = postTypes.find(({ slug }) => slug === 'post');
	const hasPage = postTypes.find(({ slug }) => slug === 'page');

	if (!hasPage) {
		postTypes.push({
			slug: 'page',
			endpoint: '/wp-json/wp/v2/pages',
			single: '/',
		});
	}

	if (!hasPost) {
		postTypes.push({
			slug: 'post',
			endpoint: '/wp-json/wp/v2/posts',
			single: '/',
			archive: '/blog',
		});
	}

	return postTypes;
}

/**
 * Returns a single post type by slug if defined
 *
 * @param slug post type slug
 *
 * @returns
 */
export function getCustomPostType(slug: string) {
	const postTypes = getCustomPostTypes();

	return postTypes?.find((postType) => postType.slug === slug);
}
