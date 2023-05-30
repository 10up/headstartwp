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

	constructor(ctx: CacheHandlerContext) {
		this.flushToDisk = ctx.flushToDisk;
		this.fs = ctx.fs;
		this.serverDistDir = ctx.serverDistDir;
		this.redisClient = this.getRedisClient();
	}

	/**
	 * Builds a Redis Client based on the environment variables
	 *
	 * If VIP_REDIS_PRIMARY and VIP_REDIS_PASSWORD are set, it will use those, otherwise
	 * it will use NEXT_REDIS_URL
	 *
	 * @returns Redis client
	 */
	public getRedisClient() {
		const redisUrl = process.env.NEXT_REDIS_URL;

		const endpoint = process.env.VIP_REDIS_PRIMARY;
		const password = process.env.VIP_REDIS_PASSWORD;

		if (endpoint && password) {
			const [host, port] = endpoint.split(':');
			return new Redis({
				host,
				password,
				port: parseInt(port, 10),
			});
		}

		return redisUrl ? new Redis(redisUrl) : new Redis();
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
