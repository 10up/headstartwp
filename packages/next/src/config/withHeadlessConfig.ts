import { ConfigError, HeadlessConfig } from '@10up/headless-core';
import { NextConfig } from 'next';

import fs from 'fs';
import path from 'path';

class IgnoreDynamicRequire {
	apply(compiler) {
		compiler.hooks.normalModuleFactory.tap('IgnoreDynamicRequire', (factory) => {
			factory.hooks.parser.for('javascript/auto').tap('IgnoreDynamicRequire', (parser) => {
				parser.hooks.call.for('require').tap('IgnoreDynamicRequire', (expression) => {
					// This is a SyncBailHook, so returning anything stops the parser, and nothing allows to continue
					if (
						expression.arguments.length !== 1 ||
						expression.arguments[0].type === 'Literal'
					) {
						return;
					}
					const arg = parser.evaluateExpression(expression.arguments[0]);
					if (!arg.isString() && !arg.isConditional()) {
							return true; //eslint-disable-line
					}
				});
			});
		});
	}
}

export function loadHeadlessConfig() {
	const headlessConfigPath = path.join(process.cwd(), 'headless.config.js');

	// the headless config is an empty object by default
	let headlessConfig: Partial<HeadlessConfig> = {};
	if (fs.existsSync(headlessConfigPath)) {
		// eslint-disable-next-line
		headlessConfig = require(headlessConfigPath);

		global.__10up__HEADLESS_CONFIG = headlessConfig;

		return headlessConfig;
	}

	return {};
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
	const headlessConfig = loadHeadlessConfig();

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
			const { dev, isServer } = options;
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
				use: ['@10up/headless-webpack-loader'],
			});

			config.plugins.push(new IgnoreDynamicRequire());

			if (frameworkConfig?.preact && !dev && !isServer) {
				Object.assign(config.resolve.alias, {
					react: 'preact/compat',
					'react-dom/test-utils': 'preact/test-utils',
					'react-dom': 'preact/compat', // Must be below test-utils
					'react/jsx-runtime': 'preact/jsx-runtime',
				});
			}

			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options);
			}

			return config;
		},
	};
}
