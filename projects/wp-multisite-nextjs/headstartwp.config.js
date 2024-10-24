/**
 * UHeadless Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	sites: [
		{
			slug: 'site1',
			hostUrl: 'http://site1.localhost:3001',
			/**
			 * The WordPress Source Url
			 */
			sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
			redirectStrategy: '404',
			/**
			 * Using 10up's headless plugin is recommended
			 */
			useWordPressPlugin: true,
		},
		{
			slug: 'site2',
			hostUrl: 'http://site2.localhost:3001',
			/**
			 * The WordPress Source Url
			 */
			sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL_2,
			redirectStrategy: '404',
			/**
			 * Using 10up's headless plugin is recommended
			 */
			useWordPressPlugin: true,
		},
	],
};
