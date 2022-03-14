const fs = require('fs');
const path = require('path');

const { withHeadlessConfig } = require('@10up/headless-next');

const headlessConfigPath = path.join(process.cwd(), 'headless.config.js');

// the headless config is an empty object by default
let headlessConfig = {};
if (fs.existsSync(headlessConfigPath)) {
	// eslint-disable-next-line
	headlessConfig = require(headlessConfigPath);
}

/**
 * Update whatever you need within the nextConfig object.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {};

module.exports = withHeadlessConfig(nextConfig, headlessConfig);
