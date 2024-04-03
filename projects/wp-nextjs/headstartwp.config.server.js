const baseConfig = require('./headstartwp.config.client');

/**
 * Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	...baseConfig,
	cache: {
		enabled: false,
	},
};
