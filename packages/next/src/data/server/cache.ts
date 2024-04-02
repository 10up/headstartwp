import { FetchResponse, FetchStrategyCacheHandler } from '@headstartwp/core';
import TTLCache from '@isaacs/ttlcache';

const ttlcache = new TTLCache({ max: 100 });

const cache: FetchStrategyCacheHandler<unknown> = {
	set(key, data, ttl) {
		ttlcache.set(key, data, {
			ttl,
		});
		return Promise.resolve(undefined);
	},

	get(key) {
		const value = ttlcache.get(key) as FetchResponse<unknown>;
		return Promise.resolve(value);
	},
};

export default cache;
