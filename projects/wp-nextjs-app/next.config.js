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

module.exports = withVanillaExtract(withHeadstartWPConfig(nextConfig));
