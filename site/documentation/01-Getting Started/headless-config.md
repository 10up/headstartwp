---
slug: /getting-started/headless-config
sidebar_position: 3
---
# Headless Config

The `headless.config.js` file contains several config options for 10up's headless framework. This file should export a object of type [HeadlessConfig](/api/modules/10up_headless_core/#headlessconfig).

Here's a sample config file

```javascript
module.exports = {
    sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
    hostUrl: process.env.HOST_URL,
    customPostTypes: [],
    customTaxonomies: [],
    redirectStrategy: '404',
    useWordPressPlugin: true,
};
```

## sourceUrl

The `sourceUrl` option should point to a valid WordPress installation form where the headless site should be sourced to.

## useWordPressPlugin

The `useWordPressPlugin` indicates whether the WordPress instance at `sourceUrl` contains the Headless WordPress plugin. While it is possible to use this framework without the plugin, it is strongly recommended to install the WP plugin and set this option to true.

## hostUrl

The `hostUrl` option should contain the value where the frontend app lives. This would typically be the public domain of the site.

## host

The `host` option is automatically inferrered if `hostUrl` is set. You probably don't need to se this option by yourself. The `host` value is used by the multisite feature to match the current site to a site config.

## customPostTypes

To add support for custom post types, add your custom post type to the `customPostTypes` setting in `headless.config.js`.

```js
// src/headless.config.js
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

The `single` option is required for properly previwing custom post types when the "single" route is at a different prefix. E.g: `/book/da-vince-code` instead of `/da-vice-code`; The framework will use the `single` path to redirect the previewed post to the right path/route.

## customTaxonomies

To add support for custom taxonomies, add your custom taxonomy to the `customTaxonomies` setting in `headless.config.js`.

```js
// src/headless.config.js
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
    cstomTaxonomies: [
		// this is just an example
		{ 
			slug: 'genre',
			endpoint: '/wp-json/wp/v2/genre',
			postType: ['book'],
		},
	],
}
```

## redirectStrategy

This option control how redirects are handlded. There are 2 supported methods of handling redirects.
- 404: If a route 404, the framework will check to see if there's a redirect for that page in WP. If so it performs the redirect. This is the recommended option.
- always: When this option is set, the framework will **always** check for redirects prior to rendering any page. Using this option carefully as it will impact perfomance.