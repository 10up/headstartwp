import { createClient } from 'redis';
import { IncrementalCache } from '@neshca/cache-handler';
import createRedisCache from '@neshca/cache-handler/redis-strings';
import createLruCache from '@neshca/cache-handler/local-lru';

export function getRedisClient(lazyConnect = false) {
	const [vipHost, vipPort] = process.env.VIP_REDIS_PRIMARY?.split(':') || [undefined, undefined];
	const host =
		vipHost || process.env.NEXT_REDIS_URL || process.env.NEXT_REDIS_HOST || 'localhost';
	const port = parseInt(
		vipPort ||
			process.env.NEXT_REDIS_PORT ||
			process.env.REDIS_SERVICE_PORT_TCP_SENTINEL ||
			process.env.REDIS_SERVICE_PORT_TCP_REDIS ||
			'6379',
		10,
	);
	const password = process.env.VIP_REDIS_PASSWORD || process.env.NEXT_REDIS_PASS || null;
	const enableSentinel = !!process.env.NEXT_REDIS_SENTINEL_NAME;
	const sentinelName = process.env.NEXT_REDIS_SENTINEL_NAME || null;
	const sentinelPassword = process.env.NEXT_REDIS_SENTINEL_PASSWORD || null;

	let connectionParams = {};

	// Connection was passed in as a URL
	if (host.indexOf('redis://') === 0 || host.indexOf('rediss://') === 0) {
		return createClient({ url: host });
	}

	// We are using Redis Sentinel
	if (enableSentinel) {
		connectionParams = {
			sentinels: [{ host, port }],
			sentinelPassword,
			password,
			name: sentinelName,
			lazyConnect,
		};
		// Normal connections
	} else {
		connectionParams = {
			host,
			port,
			password,
			lazyConnect,
		};
	}

	return createClient(connectionParams);
}

const client = getRedisClient();

client.on('error', (error) => {
	console.error('Redis error:', error);
});

IncrementalCache.onCreation(async () => {
	// read more about TTL limitations https://caching-tools.github.io/next-shared-cache/configuration/ttl
	const useTtl = false;

	await client.connect();

	const redisCache = await createRedisCache({
		client,
		useTtl,
		// timeout for the Redis client operations like `get` and `set`
		// afeter this timeout, the operation will be considered failed and the `localCache` will be used
		timeoutMs: 5000,
	});

	const localCache = createLruCache({
		useTtl,
	});

	return {
		cache: [redisCache, localCache],
		useFileSystem: !useTtl,
	};
});

export default IncrementalCache;
