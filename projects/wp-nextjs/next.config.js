const webpack = require('webpack'); //eslint-disable-line
const fs = require('fs');

const headlessConfigPath = './headless.config.js';

// the headless config is an empty object by default
let headlessConfig = {};
if (fs.existsSync(headlessConfigPath)) {
	// eslint-disable-next-line
	headlessConfig = require(headlessConfigPath);
}

/**
 * HOC used to wrap the nextjs config object with the headless config object.
 *u
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
					HEADLESS_CONFIG: webpack.DefinePlugin.runtimeValue(function () {
						return JSON.stringify(headlessConfig);
					}),
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
