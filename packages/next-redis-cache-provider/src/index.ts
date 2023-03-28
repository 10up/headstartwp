import {
	CacheHandler,
	CacheHandlerContext,
	CacheHandlerValue,
} from 'next/dist/server/lib/incremental-cache';
import { IncrementalCacheValue } from 'next/dist/server/response-cache';
import { createClient, RedisClientType } from 'redis';
import path from 'path';

let redisClient: RedisClientType<Record<string, never>, Record<string, never>>;

export default class RedisCache implements CacheHandler {
	private flushToDisk?: boolean;

	private serverDistDir: string | undefined;

	constructor(ctx: CacheHandlerContext) {
		this.flushToDisk = ctx.flushToDisk;
		redisClient = createClient({
			url: process.env.NEXT_REDIS_URL ?? undefined,
		});
		this.serverDistDir = ctx.serverDistDir;
		this.connect();
	}

	private async connect() {
		if (!redisClient.isOpen) {
			console.log('connecting');
			await redisClient.connect();
			console.log('connected');
		}
	}

	private getSeedPath(pathname: string): string {
		if (this.serverDistDir) {
			return path.join(this.serverDistDir, pathname);
		}

		return '';
	}

	public async get(key: string, fetchCache?: boolean): Promise<CacheHandlerValue | null> {
		await this.connect();

		const value = await redisClient.get(this.getSeedPath(key));

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
		if (!this.flushToDisk || !data) return;
		await this.connect();

		redisClient.set(key, JSON.stringify({ lastModified: Date.now(), value: data }));
	}
}
