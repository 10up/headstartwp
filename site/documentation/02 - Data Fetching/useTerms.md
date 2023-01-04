---
slug: /data-fetching/useterms
sidebar_position: 4
---

# The useTerms hook

> The [useTerms](/api/modules/10up_headless_next#useterms) hook is the Next.js binding for the [useFetchTerms](/api/namespaces/10up_headless_core.react#usefetchterms).

The `useTerms` hook returns terms for a given WordPress taxonomy.

## Basic Usage

```javascript
const {
    data: { terms },
} = useTerms({ taxonomy: 'category' });
```

:::caution
You do not need to use `useTerms` if you simply need to access the term object for a taxonomy archive page (e.g category archive). You should use the `queriedObject` from the `usePosts` hook. See [usePosts docs](/docs/data-fetching/useposts/#queried-object) for more details.
:::caution