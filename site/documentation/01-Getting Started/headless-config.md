---
slug: /getting-started/headless-config
sidebar_position: 3
---
# Headless Config

## Custom Post Types

To add support for cusotm post types, add your custom post type to the `customPostTypes` setting in `headless.config.js`.

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