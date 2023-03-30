import {
	CacheHandler,
	CacheHandlerContext,
	CacheHandlerValue,
} from 'next/dist/server/lib/incremental-cache';
import { IncrementalCacheValue } from 'next/dist/server/response-cache';
import Redis from 'ioredis';

const defaultRedisClient = new Redis((process.env.NEXT_REDIS_URL as string) ?? undefined);

export default class RedisCache implements CacheHandler {
	private flushToDisk?: boolean;

	constructor(ctx: CacheHandlerContext) {
		this.flushToDisk = ctx.flushToDisk;
	}

	public getRedisClient() {
		return defaultRedisClient;
	}

	public async get(key: string, fetchCache?: boolean): Promise<CacheHandlerValue | null> {
		if (fetchCache) {
			return null;
		}

		const redisClient = this.getRedisClient();
		const value = await redisClient.get(key);

		if (!value) {
			return null;
		}

		return JSON.parse(value) as CacheHandlerValue;
	}

	public async set(
		key: string,
		data: IncrementalCacheValue | null,
		fetchCache?: boolean,
	): Promise<void> {
		if (!this.flushToDisk || !data || fetchCache) return;

		const redisClient = this.getRedisClient();

		await redisClient.set(key, JSON.stringify({ lastModified: Date.now(), value: data }));
	}
}
