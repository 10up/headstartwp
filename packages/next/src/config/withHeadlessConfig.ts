import { ConfigError, HeadlessConfig } from '@10up/headless-core';
import { NextConfig } from 'next';

/**
 * HOC used to wrap the nextjs config object with the headless config object.
 *
 * @param {object} nextConfig The nextjs config object
 * @param {object} headlessConfig
 * @returns
 */
export function withHeadlessConfig(
	nextConfig: NextConfig = {},
	headlessConfig: HeadlessConfig = {},
): NextConfig {
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

		webpack: (config, options) => {
			config.module.rules.push({
				test(source) {
					if (
						// for the monorepo
						/packages\/next\/dist\/config\/loader/.test(source) ||
						/packages\/core\/dist/.test(source) ||
						// for the pubished packaged version
						/@10up\/headless-next\/dist\/config\/loader/.test(source) ||
						/@10up\/headless-core\/dist/.test(source)
					) {
						return true;
					}

					return false;
				},
				use: [
					{
						loader: '@10up/headless-webpack-loader',
						options: { config: headlessConfig },
					},
				],
			});

			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options);
			}

			return config;
		},
	};
}
