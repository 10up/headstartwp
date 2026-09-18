const { withHeadstartWPConfig } = require('@headstartwp/next/config');


/**
 * Update whatever you need within the nextConfig object.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	i18n: {
		locales: ['default', 'en', 'es'],
		defaultLocale: 'default',
		localeDetection: false,
	},
};

module.exports = withHeadstartWPConfig(nextConfig);
