const { withHeadstartWPConfig } = require('@headstartwp/next/config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

/**
 * Update whatever you need within the nextConfig object.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
	i18n: {
		locales: ['default', 'en', 'es'],
		defaultLocale: 'default',
		localeDetection: false,
	},
};

module.exports = withBundleAnalyzer(withHeadstartWPConfig(nextConfig));
