import TTLCache from '@isaacs/ttlcache';

export const cache = new TTLCache({ max: 10000 });

export default cache;
