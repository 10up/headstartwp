import { ConfigError, HeadlessConfig } from '@10up/headless-core';
import { NextConfig } from 'next';
import { ModifySourcePlugin, ConcatOperation } from 'modify-source-webpack-plugin';

const LINARIA_EXTENSION = '.linaria.module.css';

const isPackageInstalled = (packageName: string): boolean => {
	try {
		if (require.resolve(packageName)) {
			return true;
		}
	} catch (error) {
		// do nothing
	}

	return false;
};
function traverse(rules) {
	for (const rule of rules) {
		if (typeof rule.loader === 'string' && rule.loader.includes('css-loader')) {
			if (
				rule.options &&
				rule.options.modules &&
				typeof rule.options.modules.getLocalIdent === 'function'
			) {
				const nextGetLocalIdent = rule.options.modules.getLocalIdent;
				rule.options.modules.mode = 'local';
				rule.options.modules.auto = true;
				rule.options.modules.exportGlobals = true;
				rule.options.modules.exportOnlyLocals = false;
				rule.options.modules.getLocalIdent = (context, _, exportName, options) => {
					if (context.resourcePath.includes(LINARIA_EXTENSION)) {
						return exportName;
					}
					return nextGetLocalIdent(context, _, exportName, options);
				};
			}
		}
		if (typeof rule.use === 'object') {
			traverse(Array.isArray(rule.use) ? rule.use : [rule.use]);
		}
		if (Array.isArray(rule.oneOf)) {
			traverse(rule.oneOf);
		}
	}
}

/**
 * HOC used to wrap the nextjs config object with the headless config object.
 *
 * @param {object} nextConfig The nextjs config object
 * @param {object} headlessConfig The headless config
 * @returns
 */
export function withHeadlessConfig(
	nextConfig: NextConfig = {},
	headlessConfig: HeadlessConfig = {},
): NextConfig {
	if (!headlessConfig.sourceUrl && !headlessConfig.sites) {
		throw new ConfigError(
			'Missing sourceUrl in headless.config.js. Please add it to your headless.config.js file.',
		);
	}

	const imageDomains: string[] = nextConfig.images?.domains ?? [];

	const sites = headlessConfig.sites || [headlessConfig];
	const isMultisite = (headlessConfig?.sites?.length ?? 0) > 0;

	sites.forEach((site) => {
		try {
			const imageMainDomain = new URL(site.sourceUrl || '');

			imageDomains.push(imageMainDomain.hostname);
		} catch (e) {
			// do nothing
		}
	});

	return {
		...nextConfig,
		images: {
			...nextConfig.images,
			domains: imageDomains,
		},
		async rewrites() {
			const rewrites =
				typeof nextConfig.rewrites === 'function' ? await nextConfig.rewrites() : [];

			sites.forEach((site) => {
				const wpUrl = site.sourceUrl;
				const prefix = isMultisite ? '/_sites/:site' : '';
				const shouldRewriteYoastSEOUrls =
					site.integrations?.yoastSEO?.enable === true ? 1 : 0;

				const defaultRewrites = [
					{
						source: `${prefix}/cache-healthcheck`,
						destination: '/api/cache-healthcheck',
					},
					{
						source: `${prefix}/block-library.css`,
						destination: `${wpUrl}/wp-includes/css/dist/block-library/style.min.css`,
					},
					{
						source: `${prefix}/feed`,
						destination: `${wpUrl}/feed/?rewrite_urls=1`,
					},
					{
						source: '/robots.txt',
						destination: `${wpUrl}/robots.txt?rewrite_urls=${shouldRewriteYoastSEOUrls}`,
					},
					// Yoast redirects sitemap.xml to sitemap_index.xml,
					// doing this upfront to avoid being redirected to the wp domain
					{
						source: `${prefix}/sitemap.xml`,
						destination: `${wpUrl}/sitemap_index.xml?rewrite_urls=${shouldRewriteYoastSEOUrls}`,
					},
					// this matches anything that has sitemap and ends with .xml.
					// This could probably be fine tuned but this should do the trick
					{
						// eslint-disable-next-line
						source: `${prefix}/:sitemap(.*sitemap.*\.xml)`,
						destination: `${wpUrl}/:sitemap?rewrite_urls=${shouldRewriteYoastSEOUrls}`,
					},
					// This is to match the sitemap stylesheet,
					// which gets added into the sitemap xml markup by Yoast.
					// And if we don't rewrite this, users may see CSP/CORS error
					// due to different host domains in the url,
					// between WordPress and NextJS app.
					{
						// eslint-disable-next-line
						source: '/:path(.*main-sitemap\.xsl)',
						destination: `${wpUrl}/:path`,
					},
					{
						source: `${prefix}/ads.txt`,
						destination: `${wpUrl}/ads.txt`,
					},
				];
				if (Array.isArray(rewrites)) {
					rewrites.push(...defaultRewrites);
				} else {
					rewrites.fallback.push(...defaultRewrites);
				}
			});

			return rewrites;
		},

		webpack: (config, options) => {
			// const importSetHeadlessConfig = `import { setHeadlessConfig } from '@10up/headless-core';`;

			config.plugins.push(
				new ModifySourcePlugin({
					rules: [
						{
							test: /_app.(tsx|ts|js|mjs|jsx)$/,
							operations: [
								new ConcatOperation(
									'start',
									`
								import { setHeadlessConfig } from '@10up/headless-core';
								setHeadlessConfig(${JSON.stringify(headlessConfig)});
							`,
								),
							],
						},
						{
							test: /middleware.(tsx|ts|js|mjs|jsx)$/,
							operations: [
								new ConcatOperation(
									'start',
									`
								import { setHeadlessConfig } from '@10up/headless-core';
								setHeadlessConfig(${JSON.stringify(headlessConfig)});
							`,
								),
							],
						},
					],
				}),
			);

			if (isPackageInstalled('@linaria/webpack-loader')) {
				traverse(config.module.rules);
				config.module.rules.push({
					test: /\.(tsx|ts|js|mjs|jsx)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: '@linaria/webpack-loader',
							options: {
								sourceMap: process.env.NODE_ENV !== 'production',
								...(nextConfig.linaria || {}),
								extension: LINARIA_EXTENSION,
							},
						},
					],
				});
			}

			if (typeof nextConfig.webpack === 'function') {
				return nextConfig.webpack(config, options);
			}

			return config;
		},
	};
}
