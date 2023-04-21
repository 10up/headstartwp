import {
	CacheHandler,
	CacheHandlerContext,
	CacheHandlerValue,
} from 'next/dist/server/lib/incremental-cache';
import { IncrementalCacheValue } from 'next/dist/server/response-cache';
import Redis from 'ioredis';
import { CacheFs } from 'next/dist/shared/lib/utils';
import path from 'path';

export default class RedisCache implements CacheHandler {
	private flushToDisk?: boolean;

	private fs?: CacheFs;

	private BUILD_ID?: string;

	private serverDistDir?: string;

	private redisClient: Redis;

	constructor(ctx: CacheHandlerContext) {
		this.flushToDisk = ctx.flushToDisk;
		this.fs = ctx.fs;
		this.serverDistDir = ctx.serverDistDir;
		this.redisClient = this.getRedisClient();
	}

	public getRedisClient() {
		return new Redis((process.env.NEXT_REDIS_URL as string) ?? undefined);
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
		const value = await this.redisClient.get(`${BUILD_ID}:${key}`);

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

		const BUILD_ID = await this.getBuildId();

		await this.redisClient.set(
			`${BUILD_ID}:${key}`,
			JSON.stringify({ lastModified: Date.now(), value: data }),
		);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	async revalidateTag(_tag: string): Promise<void> {
		// do nothing
	}
}
