---
slug: /data-fetching/caching
sidebar_position: 10
---

# Caching

HeadstartWP offers a way to cache the results of any fetch strategy. This can be useful when you're not rendering static pages and therefore unable to leverage ISR. However, for most cases, we encourage leveraging Next.js built-in ISR mechanism. So before considering adopting fetch strategy caching, we recommend reviewing the [on-demand revalidation docs](/learn/wordpress-integration/revalidate/).

The fetch strategy cache only runs server-side, i.e., any client-side requests coming out of fetch strategies would still reach the origin directly, this is by design since it doesn't make sense to bypass client-side fetch requests with a local cache. Additionally, certain cache handlers would simply not work in the context of the browser (redis, node-lru-cache, etc...). 

On the client-side, we already cache server data via `swr` internal caching mechanism to avoid multiple requests to the origin when multiple components need the same data, anything beyond that simply doesn't make sense client-side.

You should consider fetch strategy caching if:
- You are using `getServerSideProps`
- You are creating custom fetch strategies for third-party endpoints that are slow or don't have CDN caching.
- The WordPress REST-API endpoints cannot be cached at the CDN level.

:::caution
Bear in mind that if you stack multiple layers of caching in your application it will get harder and harder to properly flush the cache. Before considering utilizing fetch strategy cache, make sure you have a plan of how content/cache will be flushed when content changes in the CMS.
:::caution


## Enabling fetch strategy caching

There are two ways to enable fetch strategy caching in HeadstartWP: individually on each `fetchHookData` call, or globally in `headstartwp.config.js`/`headstartwp.config.server.js`. 

Since fetch strategy caching only runs server-side, we recommend moving the cache config to `headstartwp.config.server.js`, not doing so could lead to server-side code being injected in the client-side bundle which would break your build (i.e if you try to set up a Redis cache chandler). See [splitting config docs](/learn/getting-started/headless-config/#splitting-clientserver-config).

```js title="Enabling caching in fetchHookData"
fetchHookData(
    usePost.fetcher(), 
    ctx, 
    { cache: { enabled: true } }
);
```

`fetchHookData` cache params support the same parameters as the [cache](/api/modules/headstartwp_core/#fetchstrategycacheconfig) property of the global config.

```js title="Enabling caching in headstartwp.config.server.js"
const baseConfig = require('./headstartwp.config.client');

/**
 * Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	...baseConfig,
	cache: {
		enabled: ({ fetchStrategy }) => {
			// cache app endpoints in-memory by default
			return fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app';
		},
        // ttl in seconds, can also be a function
        ttl: 5 * 60,
	},
};
```

`cache.enabled` can also be a function so you can decide whether to cache or not based on the fetchStrategy itself.

## In-Memory caching

The default cache handler is a TTL in-memory cache. This cache handler can be useful when you're not hosting on a serverless platform (e.g. Vercel) since the node process would be alive and therefore you can cache things in memory. On serverless hosting, by design you cannot hold state between functions invocations, therefore if you try to use an In-Memory caching it would only last for the lifetime of a single request.

The main use case for In-Memory caching is when you want to cache/dedupe fetch calls when you're hosting Next.js on non-serverless hostings. Note that if you have multiple node containers/pod each one of them would have its own In-Memory caching.

## Custom cache handler

You can provide your own cache handler. For instance, if you want to cache things in Redis you can easily provide your own cache handler.

```js title="redis cache handler"
const { getRedisClient } = require('@10up/next-redis-cache-provider');
const baseConfig = require('./headstartwp.config.client');

const redisClient = getRedisClient();

/**
 * Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	...baseConfig,
	cache: {
		enabled: ({ fetchStrategy }) => {
            // cache only the app endpoint
			return fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app' || fetchStrategy.getEndpoint() === '/wp-json/wp/v2/posts';
		},

        ttl: ({ fetchStrategy }) => {
            if (fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app') {
                // 30min
                return 30 * 60;
            }

            // 5min
            return 5 * 60;
        },

		/**
		 * @type {import('@headstartwp/core').FetchStrategyCacheHandler}
		 */
		cacheHandler: {
			async set(key, data, ttl) {
				return redisClient.set(key, JSON.stringify(data), 'EX', ttl);
			},
			async get(key) {
				const data = await redisClient.get(key);
				return JSON.parse(data);
			},
		},
	},
};
```

## Other options

### afterGet
This is a function that will get called after retrieving data from the cache and can be used to modify the response.

### beforeSet
This is a function that will get called before storing data in the cache and can be used to modify the data that is going to be cached. This can be used to remove things that should not be cached.

As an example, you might want to remove particular fields from the cache and always calculate it dynamically with `afterGet`.

```js title="redis cache handler with afterGet and beforeGet"
const { getRedisClient } = require('@10up/next-redis-cache-provider');
const baseConfig = require('./headstartwp.config.client');

const redisClient = getRedisClient();

/**
 * Config
 *
 * @type {import('@headstartwp/core').HeadlessConfig}
 */
module.exports = {
	...baseConfig,
	cache: {
		enabled: ({ fetchStrategy }) => {
			// cache app endpoints in-memory by default
			return fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app';
		},

		/**
		 * @type {import('@headstartwp/core').FetchStrategyCacheHandler}
		 */
		cacheHandler: {
			async set(key, data, ttl) {
				return redisClient.set(key, JSON.stringify(data), 'EX', ttl);
			},
			async get(key) {
				const data = await redisClient.get(key);
				return JSON.parse(data);
			},
		},

        // This assumes the app endpoints include user data if user is logged in
		afterGet: async ({ fetchStrategy }, data) => {
			if (fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app') {
				const user = await getUserData();
				data.result.user = user;
			}

			return data;
		},

		beforeSet: async ({ fetchStrategy }, data) => {
			if (fetchStrategy.getEndpoint() === '/wp-json/headless-wp/v1/app') {
				// do not store user data
				delete data.result.data;
			}

			return data;
		},
	},
};
```