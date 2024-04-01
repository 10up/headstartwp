/**
 * Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	/**
	 * The WordPress Source Url
	 */
	sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
	hostUrl: process.env.NEXT_PUBLIC_HOST_URL,
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
	customTaxonomies: (defaultTaxonomies) => {
		return [
			// turn on matchArchivePath for default taxonomies
			...defaultTaxonomies.map((taxonomy) => ({ ...taxonomy, matchArchivePath: true })),
			// this is just an example
			{
				slug: 'genre',
				endpoint: '/wp-json/wp/v2/genre',
			},
		];
	},

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
			enable: process?.env?.NEXT_PUBLIC_ENABLE_POLYLANG_INTEGRATION === 'true',
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

	preview: {
		/**
		 * If enabled, it will use the `post.link` property of the REST response
		 * to redirect to the appropriate route for previewing
		 */
		usePostLinkForRedirect: true,
	},
};
