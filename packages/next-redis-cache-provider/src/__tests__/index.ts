import { CacheHandlerContext } from 'next/dist/server/lib/incremental-cache';
import Redis from 'ioredis';
import RedisCache, { getRedisClient, initRedisClient } from '..';

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

		if (globalThis._nextRedisProviderRedisClient) {
			delete globalThis._nextRedisProviderRedisClient;
		}

		const redis = new Redis();
		initRedisClient();
		return redis.flushall();
	});

	afterEach(() => {
		global.Date.now = realDateNow;
	});

	const createMockContext = (options = {}): CacheHandlerContext => ({
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
		...options,
	});

	it('should set and get values correctly', async () => {
		const mockContext = createMockContext();
		const redisCache = new RedisCache(mockContext);

		// Define test data with a structure that matches what the implementation expects
		const testKey = 'test-cache-key';
		const testData: any = {
			kind: 'ROUTE',
			data: { html: '<div>Test content</div>' },
			revalidate: 60,
		};
		const testCtx = {};

		await redisCache.set(testKey, testData, testCtx);

		const result = await redisCache.get(testKey, { revalidate: 60 } as any);

		expect(result).toEqual({ lastModified: mockNow, value: testData });

		const redis = new Redis();
		const storedData = await redis.get('test-build-id:test-cache-key');

		expect(JSON.parse(storedData!)).toEqual({ lastModified: mockNow, value: testData });
	});

	it('should handle get when no data exists', async () => {
		const mockContext = createMockContext();
		const redisCache = new RedisCache(mockContext);

		const result = await redisCache.get('non-existent-key', { revalidate: 60 } as any);

		expect(result).toBeNull();
	});

	it('should not set data when flushToDisk is false', async () => {
		const mockContext = createMockContext({ flushToDisk: false });
		const redisCache = new RedisCache(mockContext);

		const testData: any = {
			kind: 'ROUTE',
			data: { html: '<div>Test content</div>' },
			revalidate: 60,
		};

		await redisCache.set('test-key', testData, {});

		const redis = new Redis();
		const storedData = await redis.get('test-build-id:test-key');

		expect(storedData).toBeNull();
	});

	it('should handle revalidation in get method', async () => {
		const mockContext = createMockContext();
		const redisCache = new RedisCache(mockContext);

		// Data that was cached 1 hour ago
		const oldTimestamp = mockNow - 3600 * 1000;

		// Create cached data
		const cachedData: any = {
			kind: 'ROUTE',
			data: { html: '<div>Stale content</div>' },
			revalidate: 60,
		};

		// Set up the database with stale data and associated tags
		const redis = new Redis();
		await redis.set(
			'test-build-id:test-key',
			JSON.stringify({ lastModified: oldTimestamp, value: cachedData }),
		);
		// Set up tag associations
		await redis.sadd('test-build-id:tag:tag1', 'test-key');
		await redis.sadd('test-build-id:tag:tag2', 'test-key');

		// Get with revalidation context (revalidate after 30 minutes)
		const result = await redisCache.get('test-key', {
			revalidate: 1800, // 30 minutes
			tags: ['tag1', 'tag2'],
		} as any);

		// It should return the stale data
		expect(result).toEqual({
			lastModified: oldTimestamp,
			value: cachedData,
		});

		// But the data should be deleted from Redis
		const storedData = await redis.get('test-build-id:test-key');
		expect(storedData).toBeNull();

		// And the tags should no longer have the key
		const tag1Members = await redis.smembers('test-build-id:tag:tag1');
		const tag2Members = await redis.smembers('test-build-id:tag:tag2');
		expect(tag1Members).toEqual([]);
		expect(tag2Members).toEqual([]);
	});

	it('should add tags when setting data with tags context', async () => {
		const mockContext = createMockContext();
		const redisCache = new RedisCache(mockContext);

		// Test data
		const testData: any = {
			kind: 'ROUTE',
			data: { html: '<div>Test content</div>' },
			revalidate: 60,
		};

		// Set with tags
		await redisCache.set('test-key', testData, {
			tags: ['tag1', 'tag2'],
		} as any);

		// Verify tags were added to Redis
		const redis = new Redis();
		const tag1Members = await redis.smembers('test-build-id:tag:tag1');
		const tag2Members = await redis.smembers('test-build-id:tag:tag2');

		expect(tag1Members).toContain('test-key');
		expect(tag2Members).toContain('test-key');
	});

	it('should revalidate tags correctly', async () => {
		const mockContext = createMockContext();
		const redisCache = new RedisCache(mockContext);

		// Setup some test data with tags
		const redis = new Redis();

		// Set up keys
		await redis.set('test-build-id:key1', 'value1');
		await redis.set('test-build-id:key2', 'value2');

		// Set up tag with members
		await redis.sadd('test-build-id:tag:tag1', 'key1', 'key2');

		// Revalidate the tag
		await redisCache.revalidateTag('tag1');

		// Verify all keys were deleted
		const key1Value = await redis.get('test-build-id:key1');
		const key2Value = await redis.get('test-build-id:key2');
		expect(key1Value).toBeNull();
		expect(key2Value).toBeNull();

		// Verify tag set was deleted
		const tag1Exists = await redis.exists('test-build-id:tag:tag1');
		expect(tag1Exists).toBe(0);
	});
});
