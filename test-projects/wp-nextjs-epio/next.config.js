const { withHeadstartWPConfig } = require('@headstartwp/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Linting is handled repo-wide by Oxlint (`npm run lint`), not by next build.
	eslint: {
		ignoreDuringBuilds: true,
	},
};

module.exports = withHeadstartWPConfig(nextConfig);
