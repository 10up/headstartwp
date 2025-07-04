/**
 * UHeadless Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	sites: [
		{
			hostUrl: 'http://site1.localhost:3002',
			locale: 'en',
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
			hostUrl: 'http://site2.localhost:3002',
			locale: 'en',
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
			hostUrl: 'http://site2.localhost:3002',
			locale: 'es',
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
