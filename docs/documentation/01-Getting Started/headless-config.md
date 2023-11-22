---
slug: /getting-started/headless-config
sidebar_position: 3
---
# Configuring the Framework

The `headstartwp.config.js` (previously, `headless.config.js`) file contains several config options for HeadstartWP. This file should export an object of type [HeadlessConfig](/api/modules/headstartwp_core/#headlessconfig).

## Usage with Next.js

The file **must be named** either `headstartwp.config.js` or `headless.config.js`. When `injectConfig` param of `withHeadstartWPConfig` (previously `withHeadlessConfig`) is set to true, the framework will look for these two files to be injected and loaded in the runtime bundle of the Next.js App.

```js title=next.config.js
const { withHeadstartWPConfig } = require('@headstartwp/next/config');

/**
 * Update whatever you need within the nextConfig object.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {};

module.exports = withHeadstartWPConfig(nextConfig);
```
:::caution
Since `@headstartwp/next@1.2.0` you do not need to import `headstartwp.config.js` in `next.config.js` anymore, the framework will dynamically load the config.
:::caution

Here's a sample config file

```javascript title="headstartwp.config.js"
module.exports = {
    sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
    hostUrl: process.env.HOST_URL,
    customPostTypes: [],
    customTaxonomies: [],
    redirectStrategy: '404',
    useWordPressPlugin: true,
	debug: {
		redirects: false,
		requests: false,
	}
};
```

## sourceUrl

The `sourceUrl` option should point to a valid WordPress installation from where the headless site should be sourced to.

## useWordPressPlugin

The `useWordPressPlugin` indicates whether the WordPress instance at `sourceUrl` contains the Headless WordPress plugin. While it is possible to use this framework without the plugin, it is strongly recommended to install the WP plugin and set this option to true.

## hostUrl

The `hostUrl` option should contain the value where the frontend app lives. This would typically be the public domain of the site.

## host

The `host` option is automatically inferred if `hostUrl` is set. You probably don't need to set this option by yourself. The `host` value is used by the multisite feature to match the current site to a site config.

## customPostTypes

To add support for custom post types, add your custom post type to the `customPostTypes` setting in `headstartwp.config.js`.

```js title="headstartwp.config.js"
module.exports = {
    sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
    hostUrl: process.env.HOST_URL,
    customPostTypes: [
        {
            slug: 'book',
            endpoint: '/wp-json/wp/v2/book',
            // these should match your file-system routing
			single: '/book',
			archive: '/books',
        },
    ],
}
```

After adding a custom post type to the config, you will be able to fetch posts from the registered post type via the slug:

```js
usePost({ postType: ['book'] });
usePosts({ postType:'book', perPage: 10 });
```

The `single` option is required for several things including:
- properly previewing custom post types when the "single" route is at a different prefix. E.g: `/book/da-vince-code` instead of `/da-vice-code`; In this case, the framework will use the `single` path to redirect the previewed post to the right path/route.
- Matching post path permalinks with the current URL. E.g: when fetching a single custom post type the framework will filter the returned posts to the one that matches the existing URL. Therefore, the framework needs to know the single prefix url for custom post types. This is required to properly handle parent pages that share the same child slug. See [post path mapping](/learn/data-fetching/usepost/#post-path-matching) for more info.

It is also possible to pass a function, when doing so the default post types (post and pages) will be passed to the function. The code snipped below will disable [post path mapping](/learn/data-fetching/usepost/#post-path-matching) to the default post types.

```js title="headstartwp.config.js"
module.exports = {
    sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
    hostUrl: process.env.HOST_URL,
    customPostTypes: (defaultPostTypes) => {
		// disable post path mapping for default post types
		return defaultPostTypes.map((postType) => ({...postType, matchSinglePath: false}));
	}
}
```

## customTaxonomies

To add support for custom taxonomies, add your custom taxonomy to the `customTaxonomies` setting in `headstartwp.config.js`.

```js title="headstartwp.config.js"
module.exports = {
    customPostTypes: [
        {
            slug: 'book',
            endpoint: '/wp-json/wp/v2/book',
            // these should match your file-system routing
			single: '/book',
			archive: '/books',
        },
    ],
    customTaxonomies: [
		{ 
			slug: 'genre',
			endpoint: '/wp-json/wp/v2/genre',
			postType: ['book'],
			rewrite: 'genre',
			restParam: 'genre'
		},
	],
}
```

After adding a custom taxonomy to the config, you will be able to filter posts by the registered taxonomy or fetch terms from it.

```js
usePost({ postType: ['book'], genre: 'action' });
usePosts({ postType:'book', genre: 'action', perPage: 10 });
useTerms({ taxonomy: 'genre' });
```

Additionally, if you have an archive route such as `/blog` or `/books` filtering for all registered taxonomies works out of the box. For instance, take the headless config above the following page route:

```js title=src/pages/books/[[...path]].js
import { usePosts } from '@headstartwp/next';
const BooksPage = () => {
	const { data, error, loading } = usePosts({postType: 'book'});

	if (error) {
		return 'error';
	}

	if (loading) {
		return 'Loading...';
	}

	return (
		<ul>
			{data.posts.map((post) => (
				<li key={post.id}>{post.title.rendered}</li>
			))}
		</ul>
	);
};

export default BooksPage;
```

This route would automatically handle the following URLs:
- /books -> list latest books
- /books/page/x -> paginate books
- /books/genre/genre-name -> filter books by genre
- /books/genre/genre-name/page/2 -> paginate books filtered by genre

:::caution
The code snippet above does not implement pre-fetching, which you probably want to. Check out the [pre-fetching docs](/learn/data-fetching/prefetching) for instructions.
:::caution

It is also possible to specify a function for 'customTaxonomies', when doing so the default taxonomies will be passed to the function. This can be used for instance to enable [archive path matching](/learn/data-fetching/useposts#archive-path-matching).

```js title="headstartwp.config.js"
module.exports = {
    customPostTypes: [
        {
            slug: 'book',
            endpoint: '/wp-json/wp/v2/book',
            // these should match your file-system routing
			single: '/book',
			archive: '/books',
        },
    ],
    customTaxonomies: (defaultTaxonomies) => {
		return defaultTaxonomies.map((taxonomy) => ({ ...taxonomy, matchArchivePath: true })),
	},
}
```
### restParam

This option shouldn't be necessary most of the time, but this is used to map a custom taxonomy to its REST API parameter. Most of the times the slug is equal to the restParam but in some cases it differs. For instance, the default post tag taxonomy has a slug of `post_tag` but a `restParam` of `tags` (i.e., to filter posts by `tags` in the REST API, we must use `tags=<tag-id>`).


### rewrite

This option controls the expected prefix the taxonomy must use in front-end urls. This generally should match `rewrite.slug` of the [register_taxonomy](https://developer.wordpress.org/reference/functions/register_taxonomy/) function.

## redirectStrategy

This option control how redirects are handled. There are 2 supported methods of handling redirects.
- 404: If a route 404, the framework will check to see if there's a redirect for that page in WP. If so it performs the redirect. This is the recommended option.
- always: When this option is set, the framework will **always** check for redirects before rendering any page. Using this option carefully since it will impact performance.

## debug

You can enable log debugging for both requests and redirects. `debug.requests` will enable logging all API requests made by the framework and `debug.redirects` will log all attempts to detect and fetch a redirect from WordPress.