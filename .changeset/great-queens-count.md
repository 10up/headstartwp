---
"@10up/headless-core": patch
---

[#305](https://github.com/10up/headless/issues/305)]. Fix post path mapping for custom post types.

Since the introduction of [#286](https://github.com/10up/headless/pull/286) fetching single custom post types would always yield a 404. This PR fixes the issue by properly matching the current path with the custom post permalinks.

This requires that the `single` property is set in `headless.config.js`.

```js
customPostTypes: [
        {
            slug: 'book',
            endpoint: '/wp-json/wp/v2/book',
            // these should match your file-system routing
            single: '/book',
            archive: '/books',
        },
    ],
```

Without the `single` property set the headless framework can't properly match the current URL to the custom post's permalink.

This PR builds on top of the philosophy that the WordPress permalink structure should match the front-end permalink structure, meaning that your front-end routes should match the permalink structure set in WordPress.