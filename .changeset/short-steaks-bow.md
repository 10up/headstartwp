---
"@headstartwp/next": patch
"@headstartwp/core": patch
---

Fix: Improve types for better page props type inference. 

It also updates types for data fetching hooks to better reflect the fact that `data` is treated as though it is always there and if users do not check for `loading` or `error` by themselves and there's no preloaded data, a runtime fatal error will be issued instead.
