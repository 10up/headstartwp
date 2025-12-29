import { setHeadstartWPConfig } from '@headstartwp/core/utils';
import { Rewrite } from 'next/dist/lib/load-custom-routes';
import { withHeadstartWPConfig } from '../withHeadstartWPConfig';

// Mock fs module
jest.mock('fs', () => ({
	existsSync: jest.fn(),
	readFileSync: jest.fn(),
}));

// Mock path module
jest.mock('path', () => ({
	join: jest.fn((...args) => args.join('/')),
	resolve: jest.fn((...args) => args.join('/')),
	normalize: jest.fn((path) => path),
}));

// Mock require.resolve for next package.json
jest.mock('module', () => ({
	...jest.requireActual('module'),
	createRequire: jest.fn(() => ({
		resolve: jest.fn((path) => {
			if (path === 'next/package.json') {
				return '/mock/path/next/package.json';
			}
			throw new Error('Module not found');
		}),
	})),
}));

describe('withHeadstartWPConfig - Host Check', () => {
	let mockExistsSync: jest.Mock;
	let mockReadFileSync: jest.Mock;

	beforeEach(() => {
		// Reset config before each test
		setHeadstartWPConfig({});

		// Get the mocked functions
		// eslint-disable-next-line global-require
		const fs = require('fs');
		mockExistsSync = fs.existsSync;
		mockReadFileSync = fs.readFileSync;

		// Mock file system to return a config file
		mockExistsSync.mockImplementation((path: string) => {
			if (path.includes('headstartwp.config.js') || path.includes('headless.config.js')) {
				return true;
			}
			return false;
		});

		// Mock readFileSync to return a valid config
		mockReadFileSync.mockReturnValue(JSON.stringify({ version: '14.0.0' }));
	});

	describe('Single Site Configuration', () => {
		it('should add has check when site.host is explicitly defined', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
				host: 'example.com',
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(8);

			// Check that all rewrites have the has check
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite).toHaveProperty('has');
				expect(rewrite.has).toEqual([
					{ type: 'header', key: 'host', value: 'example.com' },
				]);
			});
		});

		it('should add has check when host is inferred from hostUrl', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
				hostUrl: 'https://example.com',
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(8);

			// Check that all rewrites have the has check with inferred host
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite).toHaveProperty('has');
				expect(rewrite.has).toEqual([
					{ type: 'header', key: 'host', value: 'example.com' },
				]);
			});
		});

		it('should not add has check when neither host nor hostUrl is defined', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(8);

			// Check that no rewrites have the has check
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite).not.toHaveProperty('has');
			});
		});

		it('should handle invalid hostUrl gracefully', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
				hostUrl: 'invalid-url',
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(8);

			// Check that no rewrites have the has check due to invalid URL
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite).not.toHaveProperty('has');
			});
		});

		it('should prefer explicitly defined host over hostUrl', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
				host: 'explicit.example.com',
				hostUrl: 'https://inferred.example.com',
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(8);

			// Check that all rewrites use the explicitly defined host
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite).toHaveProperty('has');
				expect(rewrite.has).toEqual([
					{ type: 'header', key: 'host', value: 'explicit.example.com' },
				]);
			});
		});
	});

	describe('Multisite Configuration', () => {
		it('should add different has checks for different sites', async () => {
			const headlessConfig = {
				sites: [
					{
						sourceUrl: 'https://wp.site1.com',
						host: 'site1.com',
					},
					{
						sourceUrl: 'https://wp.site2.com',
						hostUrl: 'https://site2.com',
					},
					{
						sourceUrl: 'https://wp.site3.com',
						// No host or hostUrl
					},
				],
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(24); // 8 rewrites per site

			// First 8 rewrites should have site1.com host check
			for (let i = 0; i < 8; i++) {
				expect(rewrites[i]).toHaveProperty('has');
				expect(rewrites[i].has).toEqual([
					{ type: 'header', key: 'host', value: 'site1.com' },
				]);
			}

			// Next 8 rewrites should have site2.com host check (inferred from hostUrl)
			for (let i = 8; i < 16; i++) {
				expect(rewrites[i]).toHaveProperty('has');
				expect(rewrites[i].has).toEqual([
					{ type: 'header', key: 'host', value: 'site2.com' },
				]);
			}

			// Last 8 rewrites should not have has check (no host defined)
			for (let i = 16; i < 24; i++) {
				expect(rewrites[i]).not.toHaveProperty('has');
			}
		});

		it('should handle mixed host configurations in multisite', async () => {
			const headlessConfig = {
				sites: [
					{
						sourceUrl: 'https://wp.example.com',
						host: 'example.com',
						hostUrl: 'https://example.com',
					},
					{
						sourceUrl: 'https://wp.test.com',
						hostUrl: 'https://test.com',
					},
				],
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(16); // 8 rewrites per site

			// All rewrites should have has checks
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite).toHaveProperty('has');
				expect(rewrite.has).toHaveLength(1);
				expect(rewrite.has?.[0]).toHaveProperty('type', 'header');
				expect(rewrite.has?.[0]).toHaveProperty('key', 'host');
				expect(['example.com', 'test.com']).toContain(rewrite.has?.[0].value);
			});
		});
	});

	describe('Rewrite Structure', () => {
		it('should maintain correct rewrite structure with has check', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
				host: 'example.com',
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);

			// Check specific rewrite patterns
			const cacheHealthcheckRewrite = (rewrites as Rewrite[]).find(
				(r) => r.source === '/cache-healthcheck',
			);
			expect(cacheHealthcheckRewrite).toBeDefined();
			expect(cacheHealthcheckRewrite).toMatchObject({
				source: '/cache-healthcheck',
				destination: '/api/cache-healthcheck',
				has: [{ type: 'header', key: 'host', value: 'example.com' }],
			});

			const feedRewrite = (rewrites as Rewrite[]).find((r) => r.source === '/feed');
			expect(feedRewrite).toBeDefined();
			expect(feedRewrite).toMatchObject({
				source: '/feed',
				destination: 'https://wp.example.com/feed/?rewrite_urls=1',
				has: [{ type: 'header', key: 'host', value: 'example.com' }],
			});
		});

		it('should work with existing rewrites', async () => {
			const existingRewrites = [
				{
					source: '/custom-rewrite',
					destination: '/custom-destination',
				},
			];

			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
				host: 'example.com',
			};

			const nextConfig = withHeadstartWPConfig(
				{ rewrites: () => Promise.resolve(existingRewrites) },
				headlessConfig,
			);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(9); // 1 existing + 8 default

			// Check that existing rewrites are preserved
			expect(rewrites[0]).toEqual(existingRewrites[0]);

			// Check that default rewrites have has checks
			for (let i = 1; i < 9; i++) {
				expect(rewrites[i]).toHaveProperty('has');
			}
		});
	});

	describe('Edge Cases', () => {
		it('should handle empty sites array', async () => {
			const headlessConfig = {
				sites: [],
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = await nextConfig.rewrites?.();

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(0);
		});

		it('should handle hostUrl with port', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
				hostUrl: 'https://example.com:3000',
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(8);

			// Check that host includes port
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite).toHaveProperty('has');
				expect(rewrite.has).toEqual([
					{ type: 'header', key: 'host', value: 'example.com:3000' },
				]);
			});
		});

		it('should handle hostUrl with subdomain', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
				hostUrl: 'https://subdomain.example.com',
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(8);

			// Check that subdomain is preserved
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite).toHaveProperty('has');
				expect(rewrite.has).toEqual([
					{ type: 'header', key: 'host', value: 'subdomain.example.com' },
				]);
			});
		});
	});

	describe('Locale/i18n Handling', () => {
		beforeEach(() => {
			// Mock file system to ensure we're using pages router (not app router)
			// by returning false for app directory checks
			// eslint-disable-next-line global-require
			const fs = require('fs');
			const mockExistsSync = fs.existsSync;
			mockExistsSync.mockImplementation((path: string) => {
				if (path.includes('headstartwp.config.js') || path.includes('headless.config.js')) {
					return true;
				}
				// Return false for app directory to ensure pages router
				if (path.includes('/app') || path.includes('src/app')) {
					return false;
				}
				return false;
			});
		});

		it('should create locale-aware rewrites when i18n is configured for pages router', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
			};

			const nextConfig = withHeadstartWPConfig(
				{
					i18n: {
						locales: ['en', 'es', 'fr'],
						defaultLocale: 'en',
					},
				},
				headlessConfig,
			);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			// Should have 7 paths * 4 variants (default + 3 locales) = 28 rewrites
			// Plus 1 sitemap xsl rewrite without locale + 3 with locales = 4
			// Total: 28 + 4 = 32
			expect(rewrites).toHaveLength(32);

			// Check that we have rewrites for each locale
			const cacheHealthcheckRewrites = (rewrites as Rewrite[]).filter((r) =>
				r.source.includes('cache-healthcheck'),
			);
			expect(cacheHealthcheckRewrites).toHaveLength(4); // default + 3 locales

			// Check default rewrite (no locale)
			const defaultRewrite = cacheHealthcheckRewrites.find(
				(r) => r.source === '/cache-healthcheck',
			);
			expect(defaultRewrite).toBeDefined();
			expect(defaultRewrite?.destination).toBe('/api/cache-healthcheck');

			// Check locale-specific rewrites
			const enRewrite = cacheHealthcheckRewrites.find(
				(r) => r.source === '/en/cache-healthcheck',
			);
			expect(enRewrite).toBeDefined();
			expect(enRewrite?.destination).toBe('/api/cache-healthcheck');

			const esRewrite = cacheHealthcheckRewrites.find(
				(r) => r.source === '/es/cache-healthcheck',
			);
			expect(esRewrite).toBeDefined();
			expect(esRewrite?.destination).toBe('/api/cache-healthcheck');

			const frRewrite = cacheHealthcheckRewrites.find(
				(r) => r.source === '/fr/cache-healthcheck',
			);
			expect(frRewrite).toBeDefined();
			expect(frRewrite?.destination).toBe('/api/cache-healthcheck');
		});

		it('should not create locale-aware rewrites when i18n is not configured', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
			};

			const nextConfig = withHeadstartWPConfig({}, headlessConfig);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			expect(rewrites).toHaveLength(8); // Standard 8 rewrites without locales

			// Verify no locale prefixes in sources
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite.source).not.toMatch(/^\/(en|es|fr)\//);
			});
		});

		it('should create locale-aware rewrites for multisite with i18n', async () => {
			const headlessConfig = {
				sites: [
					{
						sourceUrl: 'https://wp.site1.com',
						host: 'site1.com',
					},
					{
						sourceUrl: 'https://wp.site2.com',
						host: 'site2.com',
					},
				],
			};

			const nextConfig = withHeadstartWPConfig(
				{
					i18n: {
						locales: ['en', 'es'],
						defaultLocale: 'en',
					},
				},
				headlessConfig,
			);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			// 2 sites * 7 paths * 3 variants (default + 2 locales) = 42
			// Plus 2 sites * 3 sitemap xsl rewrites (default + 2 locales) = 6
			// Total: 42 + 6 = 48
			expect(rewrites).toHaveLength(48);

			// Check multisite prefix with locales
			const site1CacheRewrites = (rewrites as Rewrite[]).filter(
				(r) => r.source.includes('_sites/:site') && r.source.includes('cache-healthcheck'),
			);
			expect(site1CacheRewrites.length).toBeGreaterThan(0);

			// Check that we have rewrites with multisite prefix and locales
			const multisiteEnRewrite = (rewrites as Rewrite[]).find(
				(r) => r.source === '/_sites/:site/en/cache-healthcheck',
			);
			expect(multisiteEnRewrite).toBeDefined();

			const multisiteEsRewrite = (rewrites as Rewrite[]).find(
				(r) => r.source === '/_sites/:site/es/cache-healthcheck',
			);
			expect(multisiteEsRewrite).toBeDefined();

			const multisiteDefaultRewrite = (rewrites as Rewrite[]).find(
				(r) => r.source === '/_sites/:site/cache-healthcheck',
			);
			expect(multisiteDefaultRewrite).toBeDefined();
		});

		it('should handle sitemap stylesheet rewrites with locales', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
			};

			const nextConfig = withHeadstartWPConfig(
				{
					i18n: {
						locales: ['en', 'es'],
						defaultLocale: 'en',
					},
				},
				headlessConfig,
			);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			// Find sitemap xsl rewrites - the pattern uses escaped dots
			const sitemapXslRewrites = (rewrites as Rewrite[]).filter((r) =>
				r.source.includes('main-sitemap'),
			);

			// Should have default + 2 locales = 3 rewrites
			expect(sitemapXslRewrites).toHaveLength(3);

			// Check default - pattern uses \\. for escaped dot
			const defaultXsl = sitemapXslRewrites.find((r) =>
				r.source.includes(':path(.*main-sitemap'),
			);
			expect(defaultXsl).toBeDefined();
			expect(defaultXsl?.source).toBe('/:path(.*main-sitemap\\.xsl)');

			// Check locale-specific
			const enXsl = sitemapXslRewrites.find((r) => r.source.startsWith('/en/'));
			expect(enXsl).toBeDefined();
			expect(enXsl?.source).toBe('/en/:path(.*main-sitemap\\.xsl)');

			const esXsl = sitemapXslRewrites.find((r) => r.source.startsWith('/es/'));
			expect(esXsl).toBeDefined();
			expect(esXsl?.source).toBe('/es/:path(.*main-sitemap\\.xsl)');
		});

		it('should not apply i18n rewrites when using app router', async () => {
			// Mock app router by returning true for app directory
			// eslint-disable-next-line global-require
			const fs = require('fs');
			const mockExistsSync = fs.existsSync;
			mockExistsSync.mockImplementation((path: string) => {
				if (path.includes('headstartwp.config.js') || path.includes('headless.config.js')) {
					return true;
				}
				// Return true for app directory to simulate app router
				if (path.includes('/app') || path.includes('src/app')) {
					return true;
				}
				return false;
			});

			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
			};

			const nextConfig = withHeadstartWPConfig(
				{
					i18n: {
						locales: ['en', 'es'],
						defaultLocale: 'en',
					},
				},
				headlessConfig,
			);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			expect(Array.isArray(rewrites)).toBe(true);
			// App router should not use Next.js i18n, so should have standard 8 rewrites
			expect(rewrites).toHaveLength(8);

			// Verify no locale prefixes (app router uses its own i18n system)
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite.source).not.toMatch(/^\/(en|es)\//);
			});
		});

		it('should handle feed rewrites with locales', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
			};

			const nextConfig = withHeadstartWPConfig(
				{
					i18n: {
						locales: ['en', 'de'],
						defaultLocale: 'en',
					},
				},
				headlessConfig,
			);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			// Find feed rewrites
			const feedRewrites = (rewrites as Rewrite[]).filter((r) => r.source.includes('feed'));

			// Should have default + 2 locales = 3 rewrites
			expect(feedRewrites).toHaveLength(3);

			// Check all have correct destination
			feedRewrites.forEach((rewrite) => {
				expect(rewrite.destination).toBe('https://wp.example.com/feed/?rewrite_urls=1');
			});

			// Check sources
			const defaultFeed = feedRewrites.find((r) => r.source === '/feed');
			expect(defaultFeed).toBeDefined();

			const enFeed = feedRewrites.find((r) => r.source === '/en/feed');
			expect(enFeed).toBeDefined();

			const deFeed = feedRewrites.find((r) => r.source === '/de/feed');
			expect(deFeed).toBeDefined();
		});

		it('should preserve host checks when i18n is configured', async () => {
			const headlessConfig = {
				sourceUrl: 'https://wp.example.com',
				host: 'example.com',
			};

			const nextConfig = withHeadstartWPConfig(
				{
					i18n: {
						locales: ['en', 'es'],
						defaultLocale: 'en',
					},
				},
				headlessConfig,
			);
			const rewrites = (await nextConfig.rewrites?.()) ?? [];

			// All rewrites should have host check
			(rewrites as Rewrite[]).forEach((rewrite) => {
				expect(rewrite).toHaveProperty('has');
				expect(rewrite.has).toEqual([
					{ type: 'header', key: 'host', value: 'example.com' },
				]);
			});
		});
	});
});
