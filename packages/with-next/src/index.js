import TranspileModules from 'next-transpile-modules';

const WithTM = TranspileModules(['@10up/headless-core', '@10up/headless-next'], { debug: false });

/**
 * HOC used to wrap the nextjs config object with the headless config object.
 *
 * @param {import('next').NextConfig} nextConfig The nextjs config object
 * @param {object} headlessConfig
 *
 * @returns {import('next').NextConfig}
 */
export async function withHeadlessConfig(nextConfig = {}, headlessConfig = {}) {
	if (!headlessConfig.sourceUrl) {
		throw new Error(
			'Missing sourceUrl in headless.config.mjs. Please add it to your headless.config.js file.',
		);
	}

	const imageDomains = [];

	try {
		const imageMainDomain = new URL(headlessConfig.sourceUrl || '');

		imageDomains.push(imageMainDomain.hostname);
	} catch (e) {
		// do nothing
	}

	return WithTM({
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
			const { webpack } = options;

			config.plugins.push(
				new webpack.DefinePlugin({
					__10up__HEADLESS_CONFIG: webpack.DefinePlugin.runtimeValue(function () {
						return JSON.stringify(headlessConfig);
					}),
				}),
			);
			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options);
			}

			return config;
		},
	});
}
