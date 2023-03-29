import {
	CacheHandler,
	CacheHandlerContext,
	CacheHandlerValue,
} from 'next/dist/server/lib/incremental-cache';
import { IncrementalCacheValue } from 'next/dist/server/response-cache';
import Redis from 'ioredis';

const redisClient = new Redis((process.env.NEXT_REDIS_URL as string) ?? undefined);

export default class RedisCache implements CacheHandler {
	private flushToDisk?: boolean;

	private serverDistDir: string | undefined;

	constructor(ctx: CacheHandlerContext) {
		this.flushToDisk = ctx.flushToDisk;
		this.serverDistDir = ctx.serverDistDir;
	}

	public async get(key: string): Promise<CacheHandlerValue | null> {
		const value = await redisClient.get(key);

		if (!value) {
			return null;
		}

		return JSON.parse(value) as CacheHandlerValue;
	}

	public async set(key: string, data: IncrementalCacheValue | null): Promise<void> {
		if (!this.flushToDisk || !data) return;

		redisClient.set(key, JSON.stringify({ lastModified: Date.now(), value: data }));
	}
}
