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
