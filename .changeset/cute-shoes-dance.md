---
"@headstartwp/next": patch
---

Fix: revalidate path
Added: A new optional callback parameter was added to `revalidateRouteHandler`. This callback allows extra logic to be run after the path is revalidated. For instance, `revalidateTag` may need to be called for a specific query, or a redis tag may need to be deleted.
