/**
 * Headless Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,

	useWordPressPlugin: true,

	preview: {
		usePostLinkForRedirect: true,
	},

	integrations: {
		yoastSEO: {
			enable: true,
		},
	},
};
