const webpack = require('webpack'); //eslint-disable-line
const headlessConfig = require('./headless.config');

/**
 * HOC used to wrap the nextjs config object with the headless config object.
 *
 * @param {object} nextConfig The nextjs config object
 * @returns
 */
const withHeadlessConfig = (nextConfig) => {
	return {
		...nextConfig,
		webpack: (config) => {
			config.plugins.push(
				new webpack.DefinePlugin({
					HEADLESS_CONFIG: JSON.stringify(headlessConfig),
				}),
			);
			return config;
		},
	};
};

/**
 * Update whatever you need within the nextConfig object.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {};

module.exports = withHeadlessConfig(nextConfig);
