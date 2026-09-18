---
'@headstartwp/next': major
'@10up/next-redis-cache-provider': major
'@headstartwp/block-primitives': major
---

Upgrade to Next.js 16 and drop webpack in favour of Turbopack.

`@headstartwp/next` now requires Next.js >= 16. React 18 remains supported, so the Pages
Router continues to work.

**Breaking changes**

- The webpack `ModifySourcePlugin` has been removed. The headstartwp config is now injected
  through a Turbopack loader rule (`turbopack.rules`) emitted by `withHeadstartWPConfig`,
  because Next.js 16 builds with Turbopack by default and fails when a webpack config is
  present. Building with `--webpack` is no longer supported.
- The built-in linaria / wyw-in-js integration has been removed along with the webpack config.
- `withHeadstartWPConfig` always emits `images.remotePatterns`; the Next.js < 14
  `images.domains` fallback is gone.
- The `middleware` convention is deprecated in Next.js 16 — rename `middleware.ts` to
  `proxy.ts` and rename the exported `middleware` function to `proxy`. Note that `proxy` always
  runs on the Node.js runtime.
- The `eslint` option was removed from the Next.js config; `next build` no longer lints.

**Fixes**

- The injected config bootstrap is now inserted after the directive prologue, so a
  `'use client'` / `'use server'` directive at the top of a layout or route is preserved.
