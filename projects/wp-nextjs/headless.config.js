/**
 * UHeadless Config
 *
 * @type {import('@10up/headless-core').HeadlessConfig}
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
};
