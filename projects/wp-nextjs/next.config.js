const webpack = require('webpack'); //eslint-disable-line
const fs = require('fs');

// create an empty object if the file doesn't exist
if (!fs.existsSync('./headless.config.js')) {
	fs.writeFileSync('./headless.config.js', `module.exports = {};\n`);
}

// eslint-disable-next-line
const headlessConfig = require('./headless.config');

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
