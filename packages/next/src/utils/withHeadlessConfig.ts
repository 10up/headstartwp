import { getWPUrl } from '@10up/headless-core';
import { NextConfig } from 'next';

/**
 * HOC used to wrap the nextjs config object with the headless config object.
 *
 * @param {object} nextConfig The nextjs config object
 * @returns
 */
export function withHeadlessConfig(nextConfig: NextConfig = {}, headlessConfig = {}): NextConfig {
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

		webpack: (config, { webpack }) => {
			config.plugins.push(
				new webpack.DefinePlugin({
					__10up__HEADLESS_CONFIG: webpack.DefinePlugin.runtimeValue(function () {
						return JSON.stringify(headlessConfig);
					}),
				}),
			);
			return config;
		},
	};
}
