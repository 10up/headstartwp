---
'@headstartwp/core': minor
---

Fix boxed object types in `PostParams`.

`SinglePostFetchStrategy`'s `id` and `revision` params were typed as `Number`
and `Boolean` (the boxed object types) rather than `number` and `boolean`.
Passing primitives already worked, so this is a type-level fix for nearly all
consumers — but anyone who explicitly annotated a variable as `Number` will need
to switch to `number`.

Note that `params.id` of `0` is now correctly falsy in the strategy's internal
truthiness guards; `0` was never a valid post ID, so this should not change
runtime behavior in practice.
