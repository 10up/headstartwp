
# @10up/next-redis-cache-provider

A drop-in replacement for Next.js Incremental Cache Handler to replace File System cache with Redis.

### How to use

Install the package: 

```bash
npm install --save @10up/next-redis-cache-provider
```

Add it to `next.config.js`:

```js
const { withHeadstarWPConfig } = require('@headstartwp/next/config');

/**
 * Update whatever you need within the nextConfig object.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	eslint: {
		ignoreDuringBuilds: true,
	},
};


if (process.env.NEXT_REDIS_URL || process.env.VIP_REDIS_PRIMARY) {
	// eslint-disable-next-line global-require
	const { initRedisClient } = require('@10up/next-redis-cache-provider');
	initRedisClient();
	nextConfig.experimental = {
		incrementalCacheHandlerPath: require.resolve('@10up/next-redis-cache-provider'),
	};
}

module.exports = withHeadstarWPConfig(nextConfig);
```

Then add the `NEXT_REDIS_URL` to your `.env` file.

For more information read the full documentation.
## Support Level

**Active:** 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Changelog

A complete listing of all notable changes to 10up's Headless Framework are documented in CHANGELOG.md files within the [core](https://github.com/10up/headstartwp/blob/develop/packages/core/CHANGELOG.md), [hooks](https://github.com/10up/headstartwp/blob/develop/packages/hooks/CHANGELOG.md), and [next](https://github.com/10up/headstartwp/blob/develop/packages/next/CHANGELOG.md) packages.

## Repository Structure and Engineering Guidelines

Visit the [CONTRIBUTING](/CONTRIBUTING.md) page for initial contribution and engineering guidance.

This repository is a monorepo, under the `packages` there are all the tools that are published to npm. The `projects` directory is a collection of test projects linked to the tools in `packages` and is used for testing purposes.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" width="850" alt="10up" /></a>
