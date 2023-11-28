import { getRedisClient } from '..';

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
