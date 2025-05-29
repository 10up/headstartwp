---
slug: /wordpress-integration/feeds
---
# Feeds

Feeds are proxied via Next.js rewrites by default. meaning that you can directly access the feed via your front-end/Next.js URL.

If you have the plugin enabled, the URLs in the feed will also be rewritten to use front-end URLs. URLs are only rewritten if `?rewrite_urls=1` is passed to a feed URL (which the framework does automatically). The following is the default rewrite rule set by the framework in Next.js:

```ts
{
    source: `${prefix}/feed`,
    destination: `${wpUrl}/feed/?rewrite_urls=1`,
},
```

Therefore, accessing the feed from your WordPress domain will display the WP URLs unless you pass `?rewrite_urls=1`.

## Filtering when to rewrite URLs

If you want to better control when feed URLs are rewritten there's a filter called `tenup_headless_wp_should_rewrite_feed_urls`.

```php
/**
 * Filter's out whether feed urls should be rewritten
 *
 * @param boolean $rewrite_urls Whether the current request should rewrite_urls
 */
return apply_filters( 'tenup_headless_wp_should_rewrite_feed_urls', (bool) $rewrite_urls );
```

You could use this to always enable rewriting the feed URLs or to use a different query param to enable URL rewrites in the feed.