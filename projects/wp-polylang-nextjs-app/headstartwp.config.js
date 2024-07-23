/**
 * Headless Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	useWordPressPlugin: true,
	sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
	hostUrl: process.env.NEXT_PUBLIC_HOST_URL,
	preview: {
		usePostLinkForRedirect: true,
	},
	integrations: {
		polylang: {
			enabled: true,
			locales: ['en', 'pt', 'es'],
			defaultLocale: 'en',
		},
	},
};
