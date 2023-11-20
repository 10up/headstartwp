---
slug: /data-fetching/useSeo
sidebar_position: 7
---

# The useSeo hook

:::info
This hook was introduced in `@headstartwp/next@1.1.0`
:::info

The `useSeo` hook returns the SEO data for the current page.

## Basic Usage

```javascript
// by default it returns the json object
const yoast_json = useSeo();
const yoast_json = useSeo('json');
// but you can also get the plain html markup for the metadata
const yoast_head = useSeo('html');
```

If there's no seo information for the current route, this hook will return `null` therefore we recommend checking for null before using the return value.