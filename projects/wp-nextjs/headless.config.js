/**
 * UHeadless Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	/**
	 * The WordPress Source Url
	 */
	sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
	hostUrl: process.env.HOST_URL,
	customPostTypes: [
		// this is just an example
		{
			slug: 'book',
			endpoint: '/wp-json/wp/v2/book',
			// these should match your file-system routing
			single: '/book',
			archive: '/books',
		},
	],
	customTaxonomies: [
		// this is just an example
		{
			slug: 'genre',
			endpoint: '/wp-json/wp/v2/genre',
		},
	],
	redirectStrategy: '404',
	/**
	 * Using 10up's headless plugin is recommended
	 */
	useWordPressPlugin: true,

	integrations: {
		yoastSEO: {
			enable: true,
		},
		polylang: {
			enable: process.env?.ENABLE_POLYLANG_INTEGRATION === 'true',
		},
	},

	debug: {
		requests: process.env?.ENABLE_REQUEST_DEBUG === 'true',
		redirects: process.env?.ENABLE_REDIRECT_DEBUG === 'true',
		/**
		 * devMode logs additional stuff that can be helpful for debugging
		 */
		devMode: process.env?.ENABLE_DEV_MODE === 'true',
	},
};
