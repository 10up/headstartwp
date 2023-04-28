const { withHeadlessConfig } = require('@10up/headless-next/config');

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
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		// make sure you're running tsc on your CI.
		ignoreBuildErrors: true,
	},
};

module.exports = withBundleAnalyzer(withHeadlessConfig(nextConfig, headlessConfig));
