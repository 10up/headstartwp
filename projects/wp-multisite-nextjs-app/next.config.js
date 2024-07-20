const { withHeadstartWPConfig } = require('@headstartwp/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
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