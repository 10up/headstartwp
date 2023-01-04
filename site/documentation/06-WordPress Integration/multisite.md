---
sidebar_position: 4
slug: /wordpress-integration/multisite
---

# Multisite

10up's headless framework has built in support WordPress multisite via the `sites` property in the `headless.config.js` file. This transform the Next.js app in a multi-tenant app.

The `sites` option allows specifying as many sites you want to connect to your app. Each site must have a `sourceUrl` and a `hostUrl`. The `hostUrl` will be used to match the current site and `sourceUrl` indicates where content should be sourced from.

This feature does not require that all sites belong to the same multisite, you're free to connect the Next.js app to completely separate WordPress instance, as long as those instance implements what you Next.js app needs.

Take a look at the [multisite demo project](https://github.com/10up/headless/tree/develop/projects/wp-multisite-nextjs) to familiarize yourself with the set up.

## Usage

### Config

The first step is to declare all of your sites in `headless.config.js`. In the example below we're declaring two sites.

```javascript
/**
 * Headless Config
 *
 * @type {import('@10up/headless-core').HeadlessConfig}
 */
module.exports = {
    redirectStrategy: '404',
    useWordPressPlugin: true,

	sites: [
		{
			hostUrl: 'http://site1.localhost:3001',
			sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,

		},
		{
			hostUrl: 'http://site2.localhost:3001',
			sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL_2,
		},
	],
};
```

In the example above we specifying that all sites must use the WordPress plugin and that the redirect strategy should be `404`. Then we're declaring two sites which will respond via the http://site1.localhost:3001 and http://site2.localhost:3001 URLs. The sourceUrl for each comes from a env variable.

This means that when we visit http://site1.localhost:3001, the source URL specified by `NEXT_PUBLIC_HEADLESS_WP_URL` will be used.

### Middleware

Make sure you have the framework's middleware setup at `src/middleware.js`.

```javascript
import { AppMiddleware } from '@10up/headless-next/middlewares';

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /fonts (inside /public)
		 * 4. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api|_next|fonts[\\w-]+\\.\\w+).*)',
	],
};

export async function middleware(...args) {
	return AppMiddleware(...args);
}
```

### Folder structure

Put all of your page routes in `_sites/[site]/` folder with the exception of the following files
 - _app.js
 - _document.js
 - 404.js
 - 500.js
 - api/


 This should give you a structure similar to

 ```
 _sites/
├─ [site]/
│  ├─ [...path].js
│  ├─ index.js
_app.js
_document.js
404.js
500.js
api/
```

With this setup, the frameworks middleware will rewrite all requests to `_sites/hostName`. This allows you to power all of you sites with the same codebase. This is very useful if you're building sites that supports internationalization or if the only thing that changes across sites is the content.

## Creating Routes that target a specific site

It is possible to create routes specific to each site. To do this simple create a folder for that particular site eg: `src/pages/_sites/mysite.com/index.js`. Then when a user visits `mysite.com` the `index.js` route file will be used instead of the one in `[site]/index.js`.

This provides a powerfull way of powering complex multi-tenant apps that shares codebase but render completely different pages and layouts.