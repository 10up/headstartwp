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
});
