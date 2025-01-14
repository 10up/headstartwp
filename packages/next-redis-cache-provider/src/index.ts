import {
	CacheHandler,
	CacheHandlerContext,
	CacheHandlerValue,
	IncrementalCache,
} from 'next/dist/server/lib/incremental-cache';
import Redis from 'ioredis';
import { CacheFs } from 'next/dist/shared/lib/utils';
import path from 'path';

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
	if (host.indexOf('redis://') === 0) {
		return new Redis(host, { lazyConnect });
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

	return new Redis(connectionParams);
}

export function initRedisClient() {
	globalThis._nextRedisProviderRedisClient = getRedisClient();
}

export default class RedisCache implements CacheHandler {
	private flushToDisk?: boolean;

	private fs?: CacheFs;

	/**
	 * The build ID of the current build
	 */
	private BUILD_ID?: string;

	/**
	 * The server dist directory
	 */
	private serverDistDir?: string;

	/**
	 * The Redis client
	 */
	private redisClient: Redis;

	private lazyConnect: boolean = false;

	constructor(ctx: CacheHandlerContext) {
		this.flushToDisk = ctx.flushToDisk;
		this.fs = ctx.fs;
		this.serverDistDir = ctx.serverDistDir;
		this.redisClient = this.getRedisClient();
	}

	resetRequestCache(): void {}

	/**
	 * Builds a Redis Client based on the environment variables
	 *
	 * If VIP_REDIS_PRIMARY and VIP_REDIS_PASSWORD are set, it will use those, otherwise
	 * it will use NEXT_REDIS_URL
	 *
	 * @returns Redis client
	 */
	public getRedisClient() {
		if (typeof globalThis._nextRedisProviderRedisClient !== 'undefined') {
			this.lazyConnect = false;
			return globalThis._nextRedisProviderRedisClient;
		}

		this.lazyConnect = true;
		return getRedisClient(this.lazyConnect);
	}

	/**
	 * Gets an unique build id from the BUILD_ID file
	 *
	 * @returns The build ID from the BUILD_ID file
	 */
	public async getBuildId() {
		if (!this.fs || !this.serverDistDir) {
			return '';
		}

		if (this.BUILD_ID) {
			return this.BUILD_ID;
		}

		try {
			const BUILD_ID = await this.fs.readFile(
				path.join(path.dirname(this.serverDistDir), 'BUILD_ID'),
			);

			this.BUILD_ID = BUILD_ID.toString();

			return this.BUILD_ID;
		} catch (e) {
			return '';
		}
	}

	private async getBuildIdAndConnect() {
		return Promise.all([
			this.getBuildId(),
			this.lazyConnect ? this.redisClient.connect() : Promise.resolve(),
		]);
	}

	private buildKey(key: string) {
		return `${this.BUILD_ID}:${key}`;
	}

	public async get(
		...args: Parameters<IncrementalCache['get']>
	): Promise<CacheHandlerValue | null> {
		const [key, ctx] = args;
		if (ctx?.fetchIdx || ctx?.fetchUrl) {
			return null;
		}

		await this.getBuildIdAndConnect();

		const value = await this.redisClient.get(this.buildKey(key));

		if (this.lazyConnect) {
			this.redisClient.disconnect();
		}

		if (!value) {
			return null;
		}

		return JSON.parse(value) as CacheHandlerValue;
	}

	public async set(...args: Parameters<IncrementalCache['set']>): Promise<void> {
		const [key, data, ctx] = args;

		if (!this.flushToDisk || !data || ctx.fetchCache) return;

		await this.getBuildIdAndConnect();

		await this.redisClient.set(
			this.buildKey(key),
			JSON.stringify({ lastModified: Date.now(), value: data }),
		);

		const tags = ctx.tags || [];

		for await (const tag of tags) {
			await this.redisClient.sadd(this.buildKey(tag), key);
		}

		if (this.lazyConnect) {
			this.redisClient.disconnect();
		}
	}

	async revalidateTag(_tag: string | string[]): Promise<void> {
		await this.getBuildIdAndConnect();
		const tags = [_tag].flat();

		for await (const tag of tags) {
			const keys = await this.redisClient.smembers(this.buildKey(tag));

			for await (const key of keys) {
				await this.redisClient.del(this.buildKey(key));
			}

			await this.redisClient.del(this.buildKey(tag));
		}
	}
}
