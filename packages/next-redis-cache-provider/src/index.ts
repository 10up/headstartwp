import {
	CacheHandler,
	CacheHandlerContext,
	CacheHandlerValue,
} from 'next/dist/server/lib/incremental-cache';
import { IncrementalCacheValue } from 'next/dist/server/response-cache';
import Redis from 'ioredis';
import { CacheFs } from 'next/dist/shared/lib/utils';
import path from 'path';

const defaultRedisClient = new Redis((process.env.NEXT_REDIS_URL as string) ?? undefined);

export default class RedisCache implements CacheHandler {
	private flushToDisk?: boolean;

	private fs?: CacheFs;

	private BUILD_ID?: string;

	private serverDistDir?: string;

	constructor(ctx: CacheHandlerContext) {
		this.flushToDisk = ctx.flushToDisk;
		this.fs = ctx.fs;
		this.serverDistDir = ctx.serverDistDir;
	}

	public getRedisClient() {
		return defaultRedisClient;
	}

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
			return BUILD_ID;
		} catch (e) {
			return '';
		}
	}

	public async get(key: string, fetchCache?: boolean): Promise<CacheHandlerValue | null> {
		if (fetchCache) {
			return null;
		}

		const BUILD_ID = await this.getBuildId();
		const redisClient = this.getRedisClient();
		const value = await redisClient.get(`${BUILD_ID}:${key}`);

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
		const BUILD_ID = await this.getBuildId();

		await redisClient.set(
			`${BUILD_ID}:${key}`,
			JSON.stringify({ lastModified: Date.now(), value: data }),
		);
	}
}
