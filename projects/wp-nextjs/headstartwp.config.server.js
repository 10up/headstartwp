const { getRedisClient } = require('@10up/next-redis-cache-provider');
const baseConfig = require('./headstartwp.config.client');

const redisClient = getRedisClient();

/**
 * Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	...baseConfig,
	cache: {
		enabled: (fetchStrategy) => {
			// cache app endpoints in-memory by default
			return fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app';
		},

		/**
		 * @type {import('@headstartwp/core').FetchStrategyCacheHandler}
		 */
		cacheHandler: {
			async set(key, data, ttl) {
				return redisClient.set(key, JSON.stringify(data), 'EX', ttl);
			},
			async get(key) {
				const data = await redisClient.get(key);
				return JSON.parse(data);
			},
		},
	},
};
