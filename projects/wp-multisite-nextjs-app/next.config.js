const { withHeadstartWPConfig } = require('@headstartwp/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Linting is handled repo-wide by Oxlint (`npm run lint`), not by next build.
	eslint: {
		ignoreDuringBuilds: true,
	},
	webpack: (config) => {
		// TODO: figure out why this is needed
		config.resolve = {
			...config.resolve,
			conditionNames: ['import'],
		};

		return config;
	},
};

module.exports = withHeadstartWPConfig(nextConfig);
