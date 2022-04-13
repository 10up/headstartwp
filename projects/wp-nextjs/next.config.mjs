import { withHeadlessConfig } from '@10up/headless-with-next';
import BundleAnalyzer from '@next/bundle-analyzer';
import headlessConfig from './headless.config.mjs';

const withBundleAnalyzer = BundleAnalyzer({
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
};

export default withHeadlessConfig(withBundleAnalyzer(nextConfig), headlessConfig);
