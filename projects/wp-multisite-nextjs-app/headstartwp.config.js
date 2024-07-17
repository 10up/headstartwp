/**
 * Headless Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	useWordPressPlugin: true,

	preview: {
		usePostLinkForRedirect: true,
	},

	sites: [
		{
			sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
			hostUrl: 'http://site1.localhost:3000',
		},
		{
			sourceUrl: 'https://js1.10up.com/',
			hostUrl: 'http://js1.localhost:3000',
		},
	],
};
