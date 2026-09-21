---
'@headstartwp/core': minor
'@headstartwp/next': minor
'@headstartwp/block-primitives': minor
'@headstartwp/epio-search': minor
'@10up/next-redis-cache-provider': minor
'@headstartwp/headstartwp': minor
---

Require Node 24.

`engines.node` moves to `>=24.11.0` across the monorepo, and the root
`package.json` declares it through `devEngines.runtime` so the floor is actually
enforced rather than warned about. Node 20 and 22 are no longer supported or
tested — CI runs a single Node 24 leg per workflow.
