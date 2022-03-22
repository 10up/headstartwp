import { getWPUrl } from '@10up/headless-core';
import { NextConfig } from 'next';

import fs from 'fs';
import path from 'path';

const headlessConfigPath = path.join(process.cwd(), 'headless.config.js');

// the headless config is an empty object by default
let headlessConfig = {};
if (fs.existsSync(headlessConfigPath)) {
	// eslint-disable-next-line
	headlessConfig = require(headlessConfigPath);
}

interface FrameworkConfig {
	preact?: boolean;
}

/**
 * HOC used to wrap the nextjs config object with the headless config object.
 *
 * @param {NextConfig} nextConfig The nextjs config object
 * @param {FrameworkConfig} frameworkConfig The framework config object
 * @returns
 */
export function withHeadlessConfig(
	nextConfig: NextConfig = {},
	frameworkConfig: FrameworkConfig = {},
): NextConfig {
	const imageDomains: Array<string> = [];

	try {
		const imageMainDomain = new URL(process.env.NEXT_PUBLIC_HEADLESS_WP_URL || '');

		imageDomains.push(imageMainDomain.hostname);
	} catch (e) {
		// do nothing
	}

	return {
		...nextConfig,
		images: {
			domains: imageDomains,
		},
		async rewrites() {
			const wpUrl = getWPUrl();
			return [
				{
					source: '/cache-healthcheck',
					destination: '/api/cache-healthcheck',
				},
				{
					source: '/feed',
					destination: `${wpUrl}/feed`,
				},
				// Yoast redirects sitemap.xml to sitemap_index.xml,
				// doing this upfront to avoid being redirected to the wp domain
				{
					source: '/sitemap.xml',
					destination: `${wpUrl}/sitemap_index.xml`,
				},
				// this matches anything that has sitemap and ends with .xml.
				// This could probably be fine tuned but this should do the trick
				{
					// eslint-disable-next-line
					source: "/:sitemap(.*sitemap.*\.xml)",
					destination: `${wpUrl}/:sitemap`,
				},
				{
					source: '/ads.txt',
					destination: `${wpUrl}/ads.txt`,
				},
			];
		},

		webpack: (config, { webpack, dev, isServer }) => {
			config.plugins.push(
				new webpack.DefinePlugin({
					__10up__HEADLESS_CONFIG: webpack.DefinePlugin.runtimeValue(function () {
						return JSON.stringify(headlessConfig);
					}),
				}),
			);

			if (frameworkConfig?.preact && !dev && !isServer) {
				Object.assign(config.resolve.alias, {
					react: 'preact/compat',
					'react-dom/test-utils': 'preact/test-utils',
					'react-dom': 'preact/compat', // Must be below test-utils
					'react/jsx-runtime': 'preact/jsx-runtime',
				});
			}
			return config;
		},
	};
}
