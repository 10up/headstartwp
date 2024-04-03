import { FetchStrategyCacheHandler } from '@headstartwp/core';
import TTLCache from '@isaacs/ttlcache';

const ttlcache = new TTLCache({ max: 100 });

const cache: FetchStrategyCacheHandler = {
	set(key, data, ttl) {
		ttlcache.set(key, data, {
			// convert ttl from secs to ms
			ttl: ttl * 1000,
		});
		return Promise.resolve(undefined);
	},

	get(key) {
		const value = ttlcache.get(key);
		return Promise.resolve(value) as any;
	},
};

export default cache;
