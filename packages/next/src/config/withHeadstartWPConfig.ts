import { ConfigError, getSite, type HeadlessConfig } from '@headstartwp/core';
import fs from 'fs';
import type { NextConfig } from 'next';
import path from 'path';
import { ConcatOperation, ModifySourcePlugin } from './plugins/ModifySourcePlugin';

type RemotePattern = {
	protocol?: 'http' | 'https';
	hostname: string;
	port?: string;
	pathname?: string;
};

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

function readNextPackageJson() {
	try {
		// Use require.resolve to get the path to the package.json
		const nextPackageJsonPath = require.resolve('next/package.json');
		const nextPackageJson = nextPackageJsonPath
			? JSON.parse(fs.readFileSync(nextPackageJsonPath, 'utf8'))
			: {};

		return nextPackageJson;
	} catch (e) {
		return {};
	}
}

function meetsMinimumVersion(versionString: string, compareVersion: number): boolean {
	if (versionString === 'latest') {
		return true;
	}

	try {
		// Remove the prefix (^, >=) from the version string
		const cleanedVersion = versionString.replace(/^[^\d]*/, '');

		// Split the version into major, minor, and patch components
		const [major] = cleanedVersion.split('.').map(Number);

		// Compare the major version number
		return major >= compareVersion;
	} catch (e) {
		return false;
	}
}

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

	// Normalize paths for webpack
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

	const nextPackageJson = readNextPackageJson();
	const useImageRemotePatterns = meetsMinimumVersion(nextPackageJson?.version ?? '', 14);
	const imageConfig: { domains?: string[]; remotePatterns?: RemotePattern[] } = {};

	if (useImageRemotePatterns) {
		imageConfig.remotePatterns =
			nextConfig?.images?.remotePatterns ??
			imageDomains.map((each) => {
				return {
					hostname: each,
				};
			});
	} else {
		imageConfig.domains = imageDomains;
	}

	const config: NextConfig = {
		...nextConfig,
		images: {
			...nextConfig.images,
			...imageConfig,
		},
		async rewrites() {
			const rewrites =
				typeof nextConfig.rewrites === 'function' ? await nextConfig.rewrites() : [];

			// Check if i18n is configured for pages router
			const hasI18n =
				!isUsingAppRouter &&
				nextConfig.i18n !== undefined &&
				nextConfig.i18n !== null &&
				Array.isArray(nextConfig.i18n.locales) &&
				nextConfig.i18n.locales.length > 0;
			const locales = hasI18n && nextConfig.i18n ? nextConfig.i18n.locales : [];

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
					has: [{ type: 'header', key: 'host', value: siteHost }],
				};

				// Helper function to create rewrite sources with locale support
				// Returns an array of sources to handle both localized and non-localized paths
				const createRewriteSources = (path: string): string[] => {
					if (hasI18n && locales.length > 0) {
						// For pages router with i18n, create rewrites for each locale plus default
						const sources: string[] = [];
						// Add rewrite without locale (for default locale or when locale is stripped)
						sources.push(`${prefix}${path}`);
						// Add rewrites for each locale
						locales.forEach((locale) => {
							sources.push(`${prefix}/${locale}${path}`);
						});
						return sources;
					}
					return [`${prefix}${path}`];
				};

				// Build rewrites array - create multiple rewrites for each path when i18n is enabled
				const defaultRewrites: Array<{
					source: string;
					destination: string;
					has?: Array<{ type: string; key: string; value: string }>;
				}> = [];

				// Define rewrite paths and their destinations
				const rewritePaths = [
					{ path: '/cache-healthcheck', destination: '/api/cache-healthcheck' },
					{
						path: '/block-library.css',
						destination: `${wpUrl}/wp-includes/css/dist/block-library/style.min.css`,
					},
					{ path: '/feed', destination: `${wpUrl}/feed/?rewrite_urls=1` },
					{
						path: '/robots.txt',
						destination: `${wpUrl}/robots.txt?rewrite_urls=${shouldRewriteYoastSEOUrls}`,
					},
					{
						path: '/sitemap.xml',
						destination: `${wpUrl}/sitemap_index.xml?rewrite_urls=${shouldRewriteYoastSEOUrls}`,
					},
					{
						path: '/:sitemap(.*sitemap.*\\.xml)',
						destination: `${wpUrl}/:sitemap?rewrite_urls=${shouldRewriteYoastSEOUrls}`,
					},
					{
						path: '/ads.txt',
						destination: `${wpUrl}/ads.txt`,
					},
				];

				// Create rewrites for each path (with locale variants if i18n is enabled)
				rewritePaths.forEach(({ path, destination }) => {
					const sources = createRewriteSources(path);
					sources.forEach((source) => {
						defaultRewrites.push({
							source,
							destination,
							...hasHostCheck,
						});
					});
				});

				// Handle sitemap stylesheet separately (it doesn't use prefix)
				const sitemapXslPath = '/:path(.*main-sitemap\\.xsl)';
				if (hasI18n && locales.length > 0) {
					// Add rewrite without locale
					defaultRewrites.push({
						// eslint-disable-next-line
						source: sitemapXslPath,
						destination: `${wpUrl}/:path`,
						...hasHostCheck,
					});
					// Add rewrites for each locale
					locales.forEach((locale) => {
						defaultRewrites.push({
							// eslint-disable-next-line
							source: `/${locale}${sitemapXslPath}`,
							destination: `${wpUrl}/:path`,
							...hasHostCheck,
						});
					});
				} else {
					defaultRewrites.push({
						// eslint-disable-next-line
						source: sitemapXslPath,
						destination: `${wpUrl}/:path`,
						...hasHostCheck,
					});
				}
				if (Array.isArray(rewrites)) {
					rewrites.push(...defaultRewrites);
				} else {
					rewrites.fallback = rewrites.fallback ?? [];
					rewrites.fallback.push(...defaultRewrites);
				}
			});

			return rewrites;
		},

		webpack: (config, options) => {
			const importSetHeadlessClientConfig = `
				import { setHeadstartWPConfig as __setHeadstartWPConfig } from '@headstartwp/core/utils';
				import __headlessConfig from '${clientConfigPath}';
				__setHeadstartWPConfig(__headlessConfig);
			`;

			const importSetHeadlessServerConfig = `
				import { setHeadstartWPConfig as __setHeadstartWPConfig } from '@headstartwp/core/utils';
				import __headlessConfig from '${serverConfigPath}';
				__setHeadstartWPConfig(__headlessConfig);
			`;

			config.plugins.push(
				new ModifySourcePlugin({
					rules: [
						{
							test: (normalModule) => {
								if (!withHeadstarWPConfigOptions.injectConfig) {
									return false;
								}

								const userRequest = normalModule.userRequest || '';

								const startIndex =
									userRequest.lastIndexOf('!') === -1
										? 0
										: userRequest.lastIndexOf('!') + 1;

								const moduleRequest = userRequest
									.substring(startIndex)
									.replace(/\\/g, '/');

								// skip next/dist/pages/_app.js
								if (/next\/dist\/pages\/_app.js/.test(moduleRequest)) {
									return false;
								}

								if (moduleRequest.includes('node_modules')) {
									return false;
								}

								const matched =
									/_app.(tsx|ts|js|mjs|jsx)$/.test(moduleRequest) ||
									/middleware.(ts|js|mjs)$/.test(moduleRequest) ||
									/pages\/api\/.*.(ts|js|mjs)/.test(moduleRequest) ||
									/app\/.*layout.(tsx|ts|js|mjs|jsx)$/.test(moduleRequest) ||
									/app\/.*.\/route.(ts|js|mjs)$/.test(moduleRequest);

								return matched;
							},
							operations: [
								new ConcatOperation(
									'start',
									options.isServer && options.nextRuntime === 'nodejs'
										? importSetHeadlessServerConfig
										: importSetHeadlessClientConfig,
								),
							],
						},
					],
				}),
			);

			const isLinariaInstalled =
				isPackageInstalled('@linaria/webpack-loader') ||
				isPackageInstalled('@wyw-in-js/webpack-loader');

			// only load linaria with the pages router configuration if not using app router
			if (isLinariaInstalled && !isUsingAppRouter) {
				const isWYWInJS = isPackageInstalled('@wyw-in-js/webpack-loader');

				traverse(config.module.rules);
				config.module.rules.push({
					test: /\.(tsx|ts|js|mjs|jsx)$/,
					exclude: /node_modules/,
					use: [
						{
							loader: isWYWInJS
								? '@wyw-in-js/webpack-loader'
								: '@linaria/webpack-loader',
							options: {
								sourceMap: process.env.NODE_ENV !== 'production',
								...(nextConfig.linaria || {}),
								extension: LINARIA_EXTENSION,
								babelOptions: {
									presets: ['next/babel', isWYWInJS ? '@wyw-in-js' : '@linaria'],
								},
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
