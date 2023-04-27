const { withHeadlessConfig } = require('@headstartwp/next/config');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
	enabled: process.env.ANALYZE === 'true',
});

const headlessConfig = require('./headless.config');

/**
 * Update whatever you need within the nextConfig object.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
};

// if you are not using polylang integration you can remove this code
// if you are replace the locales with the ones you are using
if (process.env?.ENABLE_POLYLANG_INTEGRATION === 'true') {
	nextConfig.i18n = {
		locales: ['en', 'pt'],
		defaultLocale: 'en',
	};
}

module.exports = withBundleAnalyzer(withHeadlessConfig(nextConfig, headlessConfig));
