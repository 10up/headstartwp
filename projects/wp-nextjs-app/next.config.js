const { withHeadstartWPConfig } = require('@headstartwp/next/config');
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: {
		fetches: {
			fullUrl: true,
		},
	},
};

if (process.env.NEXT_REDIS_URL || process.env.VIP_REDIS_PRIMARY) {
	// eslint-disable-next-line global-require
	const { initRedisClient } = require('@10up/next-redis-cache-provider');
	initRedisClient();

	nextConfig.cacheHandler = require.resolve('@10up/next-redis-cache-provider');
	nextConfig.cacheMaxMemorySize = 0;
}

module.exports = withVanillaExtract(withHeadstartWPConfig(nextConfig));
