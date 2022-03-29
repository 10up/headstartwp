import { ConfigError, HeadlessConfig } from '@10up/headless-core';
import { NextConfig } from 'next';

import fs from 'fs';
import path from 'path';

const headlessConfigPath = path.join(process.cwd(), 'headless.config.js');

// the headless config is an empty object by default
let headlessConfig: Partial<HeadlessConfig> = {};
if (fs.existsSync(headlessConfigPath)) {
	// eslint-disable-next-line
	headlessConfig = require(headlessConfigPath);
}

/**
 * HOC used to wrap the nextjs config object with the headless config object.
 *
 * @param {object} nextConfig The nextjs config object
 * @returns
 */
export function withHeadlessConfig(nextConfig: NextConfig = {}): NextConfig {
	if (!headlessConfig.sourceUrl) {
		throw new ConfigError(
			'Missing sourceUrl in headless.config.js. Please add it to your headless.config.js file.',
		);
	}

	const imageDomains: Array<string> = [];

	try {
		const imageMainDomain = new URL(headlessConfig.sourceUrl || '');

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
			const wpUrl = headlessConfig.sourceUrl;
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

		webpack: (config, { webpack }) => {
			config.plugins.push(
				new webpack.ProvidePlugin({
					__10up__HEADLESS_CONFIG: headlessConfigPath,
				}),
			);

			/* config.module.rules.push({
				test: /@10up\/headless-next\/config\/loader/,
				use: [
					{
						loader: `val-loader`,
					},
				],
			}); */

			return config;
		},
	};
}
