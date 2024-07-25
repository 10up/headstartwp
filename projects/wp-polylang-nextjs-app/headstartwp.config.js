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
	i18n: {
		locales: ['en', 'pt', 'es'],
		defaultLocale: 'en',
	},
	integrations: {
		polylang: {
			enable: true,
		},
	},
};
