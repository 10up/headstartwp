---
"@headstartwp/next": minor
"@headstartwp/headstartwp": patch
"@headstartwp/core": patch
---

Improves the Next.js preview cookie handling and fixes a bug where the locale was not properly being passed from WP when previewing.

First of all, it sets the preview cookie to expire within 5 minutes which aligns with the JWT token expiration.

Secondly, it will narrow the cookie to the post path being previewed so that `context.preview` is not true for other paths and thus avoiding bypassing getStaticProps until the cookies are cleared (either expires or the browser closes).
