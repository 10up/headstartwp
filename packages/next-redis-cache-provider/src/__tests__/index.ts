import { CacheHandlerContext } from 'next/dist/server/lib/incremental-cache';
import RedisCache, { getRedisClient } from '..';

// eslint-disable-next-line global-require
jest.mock('ioredis', () => require('ioredis-mock'));

describe('getRedisClient', () => {
	const OLD_ENV = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...OLD_ENV };
	});

	afterAll(() => {
		process.env = OLD_ENV;
	});

	it('connects to VIP Redis', () => {
		process.env.VIP_REDIS_PRIMARY = 'viphost.com:1234';
		process.env.VIP_REDIS_PASSWORD = 'VIP-PASSWORD';

		let redisClient = getRedisClient();
		expect(redisClient.options).toMatchObject({
			host: 'viphost.com',
			lazyConnect: false,
			password: process.env.VIP_REDIS_PASSWORD,
			port: 1234,
		});

		redisClient = getRedisClient(true);
		expect(redisClient.options).toMatchObject({
			host: 'viphost.com',
			lazyConnect: true,
			password: process.env.VIP_REDIS_PASSWORD,
			port: 1234,
		});
	});

	it('connects to an arbitrary redis instance using NEXT_REDIS_URL', () => {
		process.env.NEXT_REDIS_URL = 'redis://:authpassword@127.0.0.1:6380';

		const redisClient = getRedisClient();

		expect(redisClient.options).toMatchObject({
			host: '127.0.0.1',
			port: 6380,
		});
	});

	it('connects to an arbitrary redis instance using NEXT_REDIS_HOST / NEXT_REDIS_PORT / NEXT_REDIS_PASS', () => {
		process.env.NEXT_REDIS_HOST = '127.0.0.1';
		process.env.NEXT_REDIS_PORT = '6380';
		process.env.NEXT_REDIS_PASS = 'authpassword';

		const redisClient = getRedisClient();

		expect(redisClient.options).toMatchObject({
			host: '127.0.0.1',
			port: 6380,
			password: process.env.NEXT_REDIS_PASS,
		});
	});

	it('connects to a redis sentinnel', () => {
		process.env.NEXT_REDIS_HOST = '127.0.0.1';
		process.env.NEXT_REDIS_PORT = '6380';
		process.env.NEXT_REDIS_SENTINEL_NAME = 'sentinel';
		process.env.NEXT_REDIS_SENTINEL_PASSWORD = 'sentinel-password';
		process.env.NEXT_REDIS_PASS = 'authpassword';

		const redisClient = getRedisClient();

		expect(redisClient.options).toMatchObject({
			sentinels: [
				{ host: process.env.NEXT_REDIS_HOST, port: Number(process.env.NEXT_REDIS_PORT) },
			],
			sentinelPassword: process.env.NEXT_REDIS_SENTINEL_PASSWORD,
			password: process.env.NEXT_REDIS_PASS,
			name: process.env.NEXT_REDIS_SENTINEL_NAME,
		});
	});
});

describe('RedisCache', () => {
	// Mock Date.now for consistent lastModified values in tests
	const mockNow = 1625097600000; // July 1, 2021
	const realDateNow = Date.now.bind(global.Date);

	beforeEach(() => {
		jest.resetModules();
		global.Date.now = jest.fn(() => mockNow);

		// Clear any global redis client that might be set
		if (globalThis._nextRedisProviderRedisClient) {
			delete globalThis._nextRedisProviderRedisClient;
		}
	});

	afterEach(() => {
		global.Date.now = realDateNow;
	});

	it('should set and get values correctly', async () => {
		// Create a mock context with all required properties
		const mockContext: CacheHandlerContext = {
			flushToDisk: true,
			serverDistDir: '/path/to/dist',
			fs: {
				readFile: jest.fn().mockResolvedValue('test-build-id'),
				writeFile: jest.fn(),
				mkdir: jest.fn(),
				stat: jest.fn(),
				existsSync: jest.fn(),
				readFileSync: jest.fn(),
			},
			revalidatedTags: [],
			_requestHeaders: {},
		};

		const redisCache = new RedisCache(mockContext);

		const mockGet = jest.spyOn(redisCache._getRedisClient(), 'get').mockImplementation(() => {
			return Promise.resolve(null);
		});

		const mockSet = jest.spyOn(redisCache._getRedisClient(), 'set').mockResolvedValue('OK');

		jest.spyOn(redisCache._getRedisClient(), 'connect').mockResolvedValue(undefined);
		jest.spyOn(redisCache._getRedisClient(), 'disconnect').mockReturnValue(undefined);

		const testKey = 'test-cache-key';
		const testData: any = {
			value: 'test data',
		};
		const testCtx = {};

		await redisCache.set(testKey, testData, testCtx);

		expect(mockSet).toHaveBeenCalledWith(
			'test-build-id:test-cache-key',
			JSON.stringify({ lastModified: mockNow, value: testData }),
		);

		mockGet.mockImplementation((key) => {
			if (key === 'test-build-id:test-cache-key') {
				return Promise.resolve(JSON.stringify({ lastModified: mockNow, value: testData }));
			}
			return Promise.resolve(null);
		});

		const result = await redisCache.get(testKey, { revalidate: 60 } as any);

		expect(result).toEqual({ lastModified: mockNow, value: testData });
	});

	it('should handle get when no data exists', async () => {
		const mockContext: CacheHandlerContext = {
			flushToDisk: true,
			serverDistDir: '/path/to/dist',
			fs: {
				readFile: jest.fn().mockResolvedValue('test-build-id'),
				writeFile: jest.fn(),
				mkdir: jest.fn(),
				stat: jest.fn(),
				existsSync: jest.fn(),
				readFileSync: jest.fn(),
			},
			revalidatedTags: [],
			_requestHeaders: {},
		};

		const redisCache = new RedisCache(mockContext);

		jest.spyOn(redisCache._getRedisClient(), 'get').mockResolvedValue(null);
		jest.spyOn(redisCache._getRedisClient(), 'connect').mockResolvedValue(undefined);
		jest.spyOn(redisCache._getRedisClient(), 'disconnect').mockReturnValue(undefined);

		const result = await redisCache.get('non-existent-key', { revalidate: 60 } as any);

		expect(result).toBeNull();
	});

	it('should not set data when flushToDisk is false', async () => {
		const mockContext: CacheHandlerContext = {
			flushToDisk: false,
			serverDistDir: '/path/to/dist',
			fs: {
				readFile: jest.fn().mockResolvedValue('test-build-id'),
				writeFile: jest.fn(),
				mkdir: jest.fn(),
				stat: jest.fn(),
				existsSync: jest.fn(),
				readFileSync: jest.fn(),
			},
			revalidatedTags: [],
			_requestHeaders: {},
		};

		const redisCache = new RedisCache(mockContext);

		const mockSet = jest.spyOn(redisCache._getRedisClient(), 'set');

		const testData: any = {
			value: 'test data',
		};

		await redisCache.set('test-key', testData, {});

		expect(mockSet).not.toHaveBeenCalled();
	});

	it('should handle revalidation in get method', async () => {
		const mockContext: CacheHandlerContext = {
			flushToDisk: true,
			serverDistDir: '/path/to/dist',
			fs: {
				readFile: jest.fn().mockResolvedValue('test-build-id'),
				writeFile: jest.fn(),
				mkdir: jest.fn(),
				stat: jest.fn(),
				existsSync: jest.fn(),
				readFileSync: jest.fn(),
			},
			revalidatedTags: [],
			_requestHeaders: {},
		};

		const redisCache = new RedisCache(mockContext);

		const oldTimestamp = mockNow - 3600 * 1000;

		const cachedData: any = {
			value: 'stale data',
		};

		jest.spyOn(redisCache._getRedisClient(), 'get').mockImplementation(() => {
			return Promise.resolve(
				JSON.stringify({
					lastModified: oldTimestamp,
					value: cachedData,
				}),
			);
		});

		const mockDel = jest.spyOn(redisCache._getRedisClient(), 'del').mockResolvedValue(1);
		const mockSrem = jest.spyOn(redisCache._getRedisClient(), 'srem').mockResolvedValue(1);
		jest.spyOn(redisCache._getRedisClient(), 'connect').mockResolvedValue(undefined);
		jest.spyOn(redisCache._getRedisClient(), 'disconnect').mockReturnValue(undefined);

		// Get with revalidation context (revalidate after 30 minutes)
		const result = await redisCache.get('test-key', {
			revalidate: 1800, // 30 minutes
			tags: ['tag1', 'tag2'],
		} as any);

		// Should have attempted to delete the stale data
		expect(mockDel).toHaveBeenCalledWith('test-build-id:test-key');
		// Should have removed the key from each tag's set
		expect(mockSrem).toHaveBeenCalledWith('test-build-id:tag:tag1', 'test-key');
		expect(mockSrem).toHaveBeenCalledWith('test-build-id:tag:tag2', 'test-key');

		// It still returns the stale data
		expect(result).toEqual({
			lastModified: oldTimestamp,
			value: cachedData,
		});
	});

	it('should add tags when setting data with tags context', async () => {
		// Create a mock context with all required properties
		const mockContext: CacheHandlerContext = {
			flushToDisk: true,
			serverDistDir: '/path/to/dist',
			fs: {
				readFile: jest.fn().mockResolvedValue('test-build-id'),
				writeFile: jest.fn(),
				mkdir: jest.fn(),
				stat: jest.fn(),
				existsSync: jest.fn(),
				readFileSync: jest.fn(),
			},
			revalidatedTags: [],
			_requestHeaders: {},
		};

		const redisCache = new RedisCache(mockContext);

		// Mock methods
		jest.spyOn(redisCache._getRedisClient(), 'set').mockResolvedValue('OK');
		const mockSadd = jest.spyOn(redisCache._getRedisClient(), 'sadd').mockResolvedValue(1);
		jest.spyOn(redisCache._getRedisClient(), 'connect').mockResolvedValue(undefined);
		jest.spyOn(redisCache._getRedisClient(), 'disconnect').mockReturnValue(undefined);

		// Test data
		const testData: any = {
			value: 'test data',
		};

		// Set with tags
		await redisCache.set('test-key', testData, {
			tags: ['tag1', 'tag2'],
		} as any);

		// Should have added the key to each tag's set
		expect(mockSadd).toHaveBeenCalledWith('test-build-id:tag:tag1', 'test-key');
		expect(mockSadd).toHaveBeenCalledWith('test-build-id:tag:tag2', 'test-key');
	});

	it('should revalidate tags correctly', async () => {
		// Create a mock context with all required properties
		const mockContext: CacheHandlerContext = {
			flushToDisk: true,
			serverDistDir: '/path/to/dist',
			fs: {
				readFile: jest.fn().mockResolvedValue('test-build-id'),
				writeFile: jest.fn(),
				mkdir: jest.fn(),
				stat: jest.fn(),
				existsSync: jest.fn(),
				readFileSync: jest.fn(),
			},
			revalidatedTags: [],
			_requestHeaders: {},
		};

		const redisCache = new RedisCache(mockContext);

		const mockSmembers = jest
			.spyOn(redisCache._getRedisClient(), 'smembers')
			.mockResolvedValue(['key1', 'key2']);
		const mockDel = jest.spyOn(redisCache._getRedisClient(), 'del').mockResolvedValue(1);
		jest.spyOn(redisCache._getRedisClient(), 'connect').mockResolvedValue(undefined);
		jest.spyOn(redisCache._getRedisClient(), 'disconnect').mockReturnValue(undefined);

		// Revalidate a tag
		await redisCache.revalidateTag('tag1');

		// Should have fetched the members of the tag set
		expect(mockSmembers).toHaveBeenCalledWith('test-build-id:tag:tag1');

		// Should have deleted each key in the tag set
		expect(mockDel).toHaveBeenCalledWith('test-build-id:key1');
		expect(mockDel).toHaveBeenCalledWith('test-build-id:key2');

		// Should have deleted the tag set itself
		expect(mockDel).toHaveBeenCalledWith('test-build-id:tag:tag1');
	});
});
