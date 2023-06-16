import { endpoints } from './endpoints';
import type { HeadlessConfig } from '../types';

let __10up__HEADLESS_CONFIG: HeadlessConfig = {};

export function setHeadstartWPConfig(config: HeadlessConfig) {
	__10up__HEADLESS_CONFIG = { ...config };
}

export const setHeadlessConfig = setHeadstartWPConfig;

/**
 * Returns the contents of headless.config.js
 *
 * This function requires framework integration in order to work. The contents of `headless.config.js`
 * needs to be injected at build time into a global variable.
 *
 * Make sure you are using one of the framework's integration (such as next) before using this function.
 *
 * @returns The contents of headless.config.js
 */
export function getHeadstartWPConfig() {
	const {
		customPostTypes,
		redirectStrategy,
		useWordPressPlugin,
		customTaxonomies,
		sourceUrl,
		sites,
		hostUrl,
		integrations,
		debug,
	} = __10up__HEADLESS_CONFIG;

	const headlessConfig: HeadlessConfig = {
		sourceUrl,
		hostUrl: hostUrl || '',
		customPostTypes,
		customTaxonomies,
		redirectStrategy: redirectStrategy || 'none',
		useWordPressPlugin: useWordPressPlugin || false,
		integrations,
		debug,
		sites: (sites || []).map((site) => {
			// if host is not defined but hostUrl is, infer host from hostUrl
			if (typeof site.host === 'undefined' && typeof site.hostUrl !== 'undefined') {
				try {
					const url = new URL(site.hostUrl);

					return {
						...site,
						host: url.host,
					};
				} catch (e) {
					return site;
				}
			}

			return site;
		}),
	};

	return headlessConfig;
}

export const getHeadlessConfig = getHeadstartWPConfig;
/**
 * Get a config for a specific site
 *
 * @param site
 * @returns
 */
export function getSite(site?: HeadlessConfig) {
	const settings = getHeadlessConfig();
	const headlessConfig: HeadlessConfig = {
		sourceUrl: site?.sourceUrl || settings.sourceUrl,
		hostUrl: site?.hostUrl,
		host: site?.host,
		customPostTypes: site?.customPostTypes || settings.customPostTypes,
		customTaxonomies: site?.customTaxonomies || settings.customTaxonomies,
		redirectStrategy: site?.redirectStrategy || settings.redirectStrategy || 'none',
		useWordPressPlugin: site?.useWordPressPlugin || settings.useWordPressPlugin || false,
		integrations: site?.integrations || settings.integrations,
	};

	return headlessConfig;
}

/**
 * Finds a site by host and optionally locale
 *
 * @param hostOrUrl The hostname
 *
 * @param locale
 * @returns
 */
export function getSiteByHost(hostOrUrl: string, locale?: string) {
	const settings = getHeadlessConfig();
	let normalizedHost = hostOrUrl;

	if (normalizedHost.startsWith('https://') || normalizedHost.startsWith('http://')) {
		try {
			const { host } = new URL(hostOrUrl);
			normalizedHost = host;
		} catch (e) {
			// do nothing
		}
	}

	const site =
		settings.sites &&
		settings.sites.find((site) => {
			const isHost = site.host === normalizedHost;

			if (typeof locale !== 'undefined' && locale) {
				return isHost && site.locale === locale;
			}

			return isHost;
		});

	if (!site) {
		return null;
	}

	return getSite(site);
}

/**
 * Get a site by source url
 *
 * @param sourceUrl
 * @returns HeadlessConfig
 */
export function getSiteBySourceUrl(sourceUrl: string) {
	const settings = getHeadlessConfig();
	const site = settings.sites && settings.sites.find((site) => site.sourceUrl === sourceUrl);

	return getSite(site);
}

/**
 * Returns the available taxonomy slugs
 *
 * @param sourceUrl
 */
export function getCustomTaxonomySlugs(sourceUrl?: string) {
	const { customTaxonomies } = sourceUrl ? getSiteBySourceUrl(sourceUrl) : getHeadlessConfig();

	if (!customTaxonomies) {
		return [];
	}

	return customTaxonomies.map(({ slug }) => slug);
}

/**
 * Returns the available taxonomies
 *
 * @param sourceUrl
 */
export function getCustomTaxonomies(sourceUrl?: string) {
	const { customTaxonomies } = sourceUrl ? getSiteBySourceUrl(sourceUrl) : getHeadlessConfig();

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
 
 * @param sourceUrl
 */
export function getCustomTaxonomy(slug: string, sourceUrl?: string) {
	const taxonomies = getCustomTaxonomies(sourceUrl);

	return taxonomies?.find((taxonomy) => taxonomy.slug === slug);
}

/**
 * Returns the available post type slugs
 *
 * @param sourceUrl
 */
export function getCustomPostTypesSlugs(sourceUrl?: string) {
	const { customPostTypes } = sourceUrl ? getSiteBySourceUrl(sourceUrl) : getHeadlessConfig();

	if (!customPostTypes) {
		return [];
	}

	return customPostTypes.map(({ slug }) => slug);
}

/**
 * Returns the available post types
 *
 * @param sourceUrl
 */
export function getCustomPostTypes(sourceUrl?: string) {
	const { customPostTypes } = sourceUrl ? getSiteBySourceUrl(sourceUrl) : getHeadlessConfig();

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
 * @param sourceUrl
 */
export function getCustomPostType(slug: string, sourceUrl?: string) {
	const postTypes = getCustomPostTypes(sourceUrl);

	return postTypes?.find((postType) => postType.slug === slug);
}

/**
 * Returns the WP URL based on the headless config
 */
export function getWPUrl() {
	const { sourceUrl } = getHeadlessConfig();
	return sourceUrl || '';
}

/**
 * Returns the WP URL based on the headless config
 */
export function getHostUrl() {
	const { hostUrl } = getHeadlessConfig();
	return hostUrl || '';
}
