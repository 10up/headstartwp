---
sidebar_label: Using WordPress packages on the frontend
title: Using WordPress packages on the frontend
---
# Using `@wordpress` packages on the frontend

As part of the Gutenberg project WordPress has gained much more than just the editor itself. The Gutenberg repository currently houses more than 80 individual packages. These packages span everything from the actual React components, utilities to calculate word count, end-to-end test utilities and much more. Naturally there is the desire to also use some of these packages in the frontend code we are shipping. However, because there are many caveats when trying to use them on the frontend which is why it is generally **not recommended** to do so.

You can find a list of `@wordpress/` packages that are the exception to this rule and that can be used in the [Useful packages outside of the editor](#useful-packages-outside-of-the-editor) section.

:::caution
The `@wordpress/` dependencies are first and foremost designed to be used within the editor. Therefore they are not necessarily optimized for frontend performance and size. Some packages rely on [`lodash`](https://lodash.com) or [`moment`](https://momentjs.com) and therefore come with a **lot** of code.

_Starting in WordPress 6.1 a lot of packages have dropped their reliance of `lodash`._
:::caution

## Bundle size

One of the pitfalls of using the [Dependency Extraction Webpack Plugin](https://www.npmjs.com/package/@wordpress/dependency-extraction-webpack-plugin) is that you don't see the size of the externalized WordPress packages. They are not a part of your bundle but instead get added as an additional script that gets loaded before yours. Given these packages are bundled via WodPress, they don't allow you to do any sort of tree shaking.

This is especially problematic because they often rely on individual functions from [`lodash`](https://lodash.com) but therefore load all of lodash as a result which is a heavy import.

Speaking of [`lodash`](https://lodash.com) one pitfall is, that the [Dependency Extraction Webpack Plugin](https://www.npmjs.com/package/@wordpress/dependency-extraction-webpack-plugin) externalizes more than just the `@wordpress/*` dependencies. It externalizes all these imports:

- [`moment`](https://momentjs.com)
- `@babel/runtime/regenerator`
- [`lodash`](https://lodash.com) / [`lodash-es`](https://www.npmjs.com/package/lodash-es)
- [`jquery`](https://jquery.com)
- [`react`](https://reactjs.org)
- [`react-dom`](https://reactjs.org/docs/react-dom.html)
- [`react-refresh/runtime`](https://www.npmjs.com/package/react-refresh)
- `@wordpress/*`

:::info
There are some `@wordpress/` packages, like the [`@wordpress/icons`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/) package, that are not bundled in WordPress and therefore don't get externalized. You can view the [excluded list in the GitHub repo](https://github.com/WordPress/gutenberg/blob/b1f2064d64df4db70a379c690ee1e28ebef8b86d/packages/dependency-extraction-webpack-plugin/lib/util.js#L2-L6).
:::info

This means that even if any of your other frontend dependencies try to load something from lodash the [Dependency Extraction Webpack Plugin](https://www.npmjs.com/package/@wordpress/dependency-extraction-webpack-plugin) will pick that up and add [`lodash`](https://lodash.com) to your dependency array.

## Editor dependant packages

The [`@wordpress/packages`](https://developer.wordpress.org/block-editor/reference-guides/packages/) can also be divided into different groups. There are some that are dependant on being used in the editor. The entire [`@wordpress/block-editor`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/) package for example should not be used outside of the editor because it depends on the surrounding architecture like the data api being setup correctly etc.

:::caution
As a rule of thumb any package that includes _editor_ in it's name should **not** be used outside of the editor.
:::caution

## Useful packages outside of the editor

There are some packages that suit themselves very well for being used outside of the editor. This list is not comprehensive and if something is not listed here it doesn't mean that it cannot be used on the frontend. These are just some good examples of packages that showed they work well on the frontend.

### [`@wordpress/api-fetch`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-api-fetch/)

The [`@wordpress/api-fetch`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-api-fetch/) package is great for making it easier to talk to the WordPress REST API from your frontend code. It allows you to configure middlewares so, for example, you could define the root URL of your project to define it throughout the entire frontend bundle.

```js
import apiFetch from '@wordpress/api-fetch';
const rootURL = 'http://my-wordpress-site/wp-json/';
apiFetch.use( apiFetch.createRootURLMiddleware( rootURL ) );
```

To make the above even better we can use [`wp_localize_script`](https://developer.wordpress.org/reference/functions/wp_localize_script/) to pass the `rest_base` value to the frontend code as a variable:

```php
wp_localize_script(
    'frontend',
    'tenupTheme',
    [
        'restBase' => get_rest_url(),
    ]
);
```

```js
import apiFetch from '@wordpress/api-fetch';
const rootURL = window.tenupTheme.restBase;
apiFetch.use( apiFetch.createRootURLMiddleware( rootURL ) );
```

Or if you need to deal with authenticated requests, you can also create a middleware to work with nonces:

```js
import apiFetch from '@wordpress/api-fetch';
const nonce = 'nonce value';
apiFetch.use( apiFetch.createNonceMiddleware( nonce ) );
```

### [`@wordpress/dom-ready`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom-ready/)

The [`@wordpress/dom-ready`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-dom-ready/) package is a simple utility function that makes it super simple to only invoke a callback once the dom is loaded.

```js
import domReady from '@wordpress/dom-ready';

domReady( function () {
    //do something after DOM loads.
} );
```

If you look at the [source code for the package](https://github.com/WordPress/gutenberg/blob/71a63fd636b871b73e475821f94fa634e7550b92/packages/dom-ready/src/index.js#L31-L45) it really is nothing more than an event listener for the `DOMContentLoaded` event with additional checks for the `document.readyState` `complete` or `interactive`.

### [`@wordpress/hooks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/)

The [`@wordpress/hooks`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/) package is a lightweight Event Manager for JavaScript. The API is meant to be as close as possible to the WordPress php hooks API. It is a great way to add extensibility to your JavaScript code.

This package lets you add filters (to be able to change the value of a variable) and actions (to be able to run some code) to your JavaScript code.

### [`@wordpress/html-entities`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-html-entities/)

The [`@wordpress/html-entities`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-html-entities/) is super useful when working with data from the WordPress REST API. You might want to decode HTML entities to get the final rendered value. This is specially handy if you need to use `innerHTML` or `dangerouslySetInnerHTML` if you are using React.

```js
import { decodeEntities } from '@wordpress/html-entities';

const result = decodeEntities( '&aacute;' );
console.log( result ); // result will be "á"
```

### [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/)

Localizing strings within frontend js code always is a bit of a pain. Usually you would use [`wp_localize_script`](https://developer.wordpress.org/reference/functions/wp_localize_script/) in order to provide the localized strings as a variable. This gets rather difficult to manage though with plurals etc. Using the [`@wordpress/i18n`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/) package to manage frontend translations can solve this by providing the developers with the same `__`, `_n`, `_x`, etc. functions that they are used to from php.

### [`@wordpress/url`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-url%20/)

This package is a collection of utility functions for working with URLs. It is a great way to manipulate URLs, extract information  or even validate them in JavaScript.

The current list of utilities is:

- `addQueryArgs`
- `buildQueryString`
- `cleanForSlug`
- `filterURLForDisplay`
- `getAuthority`
- `getFilename`
- `getFragment`
- `getPath`
- `getPathAndQueryString`
- `getProtocol`
- `getQueryArg`
- `getQueryArgs`
- `getQueryString`
- `hasQueryArg`
- `isEmail`
- `isURL`
- `isValidAuthority`
- `isValidFragment`
- `isValidPath`
- `isValidProtocol`
- `isValidQueryString`
- `normalizePath`
- `prependHTTP`
- `removeQueryArgs`
- `safeDecodeURI`
- `safeDecodeURIComponent`

We find the functions related to query arguments to be the most useful!
