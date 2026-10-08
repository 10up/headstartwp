import { ConfigError, getSite, type HeadlessConfig } from '@headstartwp/core';
import fs from 'fs';
import type { NextConfig } from 'next';
import path from 'path';

/**
 * Resolves the path to the compiled config-injection loader.
 *
 * Turbopack resolves loaders from disk, so it must be referenced by an absolute path to the
 * built (js) file.
 *
 * @returns absolute path to the loader
 */
function resolveInjectConfigLoader(): string {
	const candidates = [
		'./loaders/injectHeadstartWPConfigLoader.js',
		// resolves the TypeScript source when running from `src` (e.g. under jest)
		'./loaders/injectHeadstartWPConfigLoader',
	];

	for (const candidate of candidates) {
		try {
			return require.resolve(candidate);
		} catch (e) {
			// try the next candidate
		}
	}

	return path.join(__dirname, 'loaders', 'injectHeadstartWPConfigLoader.js');
}

/**
 * Project relative paths that receive the headstartwp config bootstrap.
 *
 * These are the framework entrypoints where the config must be available before user code runs.
 */
const INJECT_CONFIG_PATHS = [
	/(^|\/)_app\.(tsx|ts|jsx|js|mjs)$/,
	/(^|\/)(proxy|middleware)\.(ts|js|mjs)$/,
	/(^|\/)pages\/api\/.*\.(ts|js|mjs)$/,
	/(^|\/)app\/.*layout\.(tsx|ts|jsx|js|mjs)$/,
	/(^|\/)app\/.*\/route\.(ts|js|mjs)$/,
];

type RemotePattern = {
	protocol?: 'http' | 'https';
	hostname: string;
	port?: string;
	pathname?: string;
};

/**
 * HOC used to wrap the nextjs config object with the headless config object.
 *
 * @param {object} nextConfig The nextjs config object
 * @param {object} headlessConfig The headless config
 * @param withHeadstarWPConfigOptions
 * @returns
 */
export function withHeadstartWPConfig(
	nextConfig: NextConfig = {},
	headlessConfig: HeadlessConfig = {},
	withHeadstarWPConfigOptions: { injectConfig: boolean } = { injectConfig: true },
): NextConfig {
	const cwd = process.cwd();
	const isUsingAppRouter =
		fs.existsSync(path.join(cwd, 'src', 'app')) || fs.existsSync(path.join(cwd, 'app'));

	const headlessConfigPath = path.resolve(cwd, 'headless.config.js');
	const headstartWpConfigPath = path.resolve(cwd, 'headstartwp.config.js');
	const headstartWpConfigClientPath = path.resolve(cwd, 'headstartwp.config.client.js');
	const headstartWpConfigServerPath = path.resolve(cwd, 'headstartwp.config.server.js');

	let clientConfigPath = '';
	let serverConfigPath = '';

	if (fs.existsSync(headstartWpConfigClientPath)) {
		clientConfigPath = headstartWpConfigClientPath;
	}

	if (fs.existsSync(headstartWpConfigServerPath)) {
		serverConfigPath = headstartWpConfigServerPath;
	}

	if (!clientConfigPath && !serverConfigPath) {
		if (fs.existsSync(headstartWpConfigPath)) {
			clientConfigPath = headstartWpConfigPath;
			serverConfigPath = headstartWpConfigPath;
		} else if (fs.existsSync(headlessConfigPath)) {
			clientConfigPath = headlessConfigPath;
			serverConfigPath = headlessConfigPath;
		}
	}

	// Normalize paths for the bundler
	if (clientConfigPath) {
		clientConfigPath = path.normalize(clientConfigPath).replace(/\\/g, '/');
	}
	if (serverConfigPath) {
		serverConfigPath = path.normalize(serverConfigPath).replace(/\\/g, '/');
	}

	if (!clientConfigPath && !serverConfigPath) {
		throw new ConfigError(
			'Missing config, when spliting config between server and client you need to specify both headstartwp.config.client.js and headstartwp.server.config.js',
		);
	}

	if (Object.keys(headlessConfig).length === 0) {
		// eslint-disable-next-line
		headlessConfig = require(serverConfigPath);
	}

	if (!headlessConfig.sourceUrl && !headlessConfig.sites) {
		throw new ConfigError(
			'Missing sourceUrl in headstartwp.config.js (or headless.config.js). Please add it to your config file.',
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

	const imageConfig: { remotePatterns?: RemotePattern[] } = {
		remotePatterns:
			nextConfig?.images?.remotePatterns ??
			imageDomains.map((hostname) => {
				return { hostname };
			}),
	};

	const config: NextConfig = {
		...nextConfig,
		images: {
			...nextConfig.images,
			...imageConfig,
		},
		async rewrites() {
			const rewrites =
				typeof nextConfig.rewrites === 'function' ? await nextConfig.rewrites() : [];

			sites.forEach((rawSite) => {
				const site = getSite(rawSite);
				const wpUrl = site.sourceUrl;

				let prefix = isMultisite ? '/_sites/:site' : '';
				if (isUsingAppRouter) {
					prefix = isMultisite ? '/:site' : '';
				}

				const shouldRewriteYoastSEOUrls =
					site.integrations?.yoastSEO?.enable === true ? 1 : 0;

				// Extract site host for has check
				let siteHost = site.host;

				// If host is not defined but hostUrl is, infer host from hostUrl
				if (typeof siteHost === 'undefined' && typeof site.hostUrl !== 'undefined') {
					try {
						const url = new URL(site.hostUrl);
						siteHost = url.host;
					} catch (e) {
						// do nothing, keep siteHost undefined
					}
				}

				const hasHostCheck = siteHost && {
					has: [{ type: 'header' as const, key: 'host', value: siteHost }],
				};

				const defaultRewrites = [
					{
						source: `${prefix}/cache-healthcheck`,
						destination: '/api/cache-healthcheck',
						...hasHostCheck,
					},
					{
						source: `${prefix}/block-library.css`,
						destination: `${wpUrl}/wp-includes/css/dist/block-library/style.min.css`,
						...hasHostCheck,
					},
					{
						source: `${prefix}/feed`,
						destination: `${wpUrl}/feed/?rewrite_urls=1`,
						...hasHostCheck,
					},
					{
						source: `${prefix}/robots.txt`,
						destination: `${wpUrl}/robots.txt?rewrite_urls=${shouldRewriteYoastSEOUrls}`,
						...hasHostCheck,
					},
					// Yoast redirects sitemap.xml to sitemap_index.xml,
					// doing this upfront to avoid being redirected to the wp domain
					{
						source: `${prefix}/sitemap.xml`,
						destination: `${wpUrl}/sitemap_index.xml?rewrite_urls=${shouldRewriteYoastSEOUrls}`,
						...hasHostCheck,
					},
					// this matches anything that has sitemap and ends with .xml.
					// This could probably be fine tuned but this should do the trick
					{
						// eslint-disable-next-line
						source: `${prefix}/:sitemap(.*sitemap.*\.xml)`,
						destination: `${wpUrl}/:sitemap?rewrite_urls=${shouldRewriteYoastSEOUrls}`,
						...hasHostCheck,
					},
					// This is to match the sitemap stylesheet,
					// which gets added into the sitemap xml markup by Yoast.
					// And if we don't rewrite this, users may see CSP/CORS error
					// due to different host domains in the url,
					// between WordPress and NextJS app.
					{
						// eslint-disable-next-line
						source: "/:path(.*main-sitemap\.xsl)",
						destination: `${wpUrl}/:path`,
						...hasHostCheck,
					},
					{
						source: `${prefix}/ads.txt`,
						destination: `${wpUrl}/ads.txt`,
						...hasHostCheck,
					},
				];
				if (Array.isArray(rewrites)) {
					rewrites.push(...defaultRewrites);
				} else {
					rewrites.fallback = rewrites.fallback ?? [];
					rewrites.fallback.push(...defaultRewrites);
				}
			});

			return rewrites;
		},
	};

	if (withHeadstarWPConfigOptions.injectConfig) {
		// HeadstartWP needs its config to be registered before any framework entrypoint runs. That
		// is done with a Turbopack loader rule that prepends the bootstrap to those entrypoints.
		const injectConfigLoader = resolveInjectConfigLoader();
		const matchesInjectedPath = {
			any: INJECT_CONFIG_PATHS.map((injectedPath) => ({ path: injectedPath })),
		};

		const injectConfigRules = [
			{
				condition: {
					all: [{ not: 'foreign' }, 'browser', matchesInjectedPath],
				},
				loaders: [
					{ loader: injectConfigLoader, options: { configPath: clientConfigPath } },
				],
			},
			{
				condition: {
					all: [{ not: 'foreign' }, { not: 'browser' }, matchesInjectedPath],
				},
				loaders: [
					{ loader: injectConfigLoader, options: { configPath: serverConfigPath } },
				],
			},
		];

		const turbopackConfig = (nextConfig.turbopack ?? {}) as Record<string, any>;
		const turbopackRules = (turbopackConfig.rules ?? {}) as Record<string, any>;
		const existingRule = turbopackRules['*'];

		config.turbopack = {
			...turbopackConfig,
			rules: {
				...turbopackRules,
				'*': [
					...(Array.isArray(existingRule) ? existingRule : [existingRule].filter(Boolean)),
					...injectConfigRules,
				],
			},
		} as NextConfig['turbopack'];
	}

	// if i18n is sets
	// but we are on pages router
	// error it out!
	if ((headlessConfig.i18n?.locales?.length ?? 0) > 0 && !isUsingAppRouter) {
		throw new ConfigError(
			'The `i18n` option is not supported in the pages router. In the Pages router you must set the locales in the next config',
		);
	}

	return config;
}

export function withHeadlessConfig(
	nextConfig: NextConfig = {},
	headlessConfig: HeadlessConfig = {},
	withHeadstarWPConfigOptions: { injectConfig: boolean } = {
		injectConfig: true,
	},
) {
	return withHeadstartWPConfig(nextConfig, headlessConfig, withHeadstarWPConfigOptions);
}
