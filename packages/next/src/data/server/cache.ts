import TTLCache from '@isaacs/ttlcache';

const kTTLCache = Symbol.for('ttlcache');
const g = globalThis as typeof globalThis & { [kTTLCache]?: TTLCache<string, any> };
g[kTTLCache] ??= new TTLCache({ max: 10000 });
export const cache = g[kTTLCache];
