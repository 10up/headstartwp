import {
	CacheHandler,
	CacheHandlerContext,
	CacheHandlerValue,
} from 'next/dist/server/lib/incremental-cache';
import { IncrementalCacheValue } from 'next/dist/server/response-cache';
import { createClient, RedisClientType } from 'redis';
import path from 'path';

export default class RedisCache implements CacheHandler {
	private flushToDisk?: boolean;

	private redisClient: RedisClientType<Record<string, never>, Record<string, never>>;

	private serverDistDir: string | undefined;

	constructor(ctx: CacheHandlerContext) {
		this.flushToDisk = ctx.flushToDisk;
		this.redisClient = createClient({
			url: process.env.NEXT_REDIS_URL ?? undefined,
		});
		this.serverDistDir = ctx.serverDistDir;
	}

	private async connect() {
		if (!this.redisClient.isOpen) {
			await this.redisClient.connect();
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

		const value = await this.redisClient.get(this.getSeedPath(key));
		console.log('key', key);
		if (!value) {
			return null;
		}

		return {
			value: {
				kind: 'ROUTE',
				body: Buffer.from(value),
				headers: {},
				status: 200,
			},
		};
	}

	public async set(
		key: string,
		data: IncrementalCacheValue | null,
		fetchCache?: boolean,
	): Promise<void> {
		if (!this.flushToDisk || !data) return;

		await this.connect();
		const pathname = this.getSeedPath(key);
		console.log(pathname, data);
		if (data.kind === 'PAGE') {
			await this.redisClient.set(pathname, data.html);
		} else if (data.kind === 'ROUTE') {
			await this.redisClient.set(pathname, data.body);
		}
	}
}
