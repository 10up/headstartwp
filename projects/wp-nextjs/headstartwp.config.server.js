const baseConfig = require('./headstartwp.config.client');

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
	},
};
