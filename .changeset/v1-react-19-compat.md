---
'@headstartwp/core': minor
'@headstartwp/next': minor
'@headstartwp/epio-search': minor
---

React 19 compatibility for the v1 line, with the pages router fully intact.

This is the release for projects that are staying on the Next.js pages router. v2 is app-router
only; v1 continues to support both routers and now installs and runs cleanly on React 19.

**Block matching no longer breaks under React 19.** Every block this package ships declares its
matching predicate — and sometimes `exclude` — through a namespace-merged `defaultProps`. React 19
stopped applying `defaultProps` to function components under the automatic JSX runtime, so
`<ParagraphBlock />` reached the renderer with `props.test` undefined and **all 20 shipped blocks
silently stopped matching**: no error, blocks simply rendered as unreplaced HTML.
`BaseBlocksRenderer` now resolves `defaultProps` explicitly, which also covers consumer blocks
written to the same documented pattern.

This is the single most important fix here. If you are running v1 on React 19 today, your blocks
are affected.

**`html-react-parser` `^3` → `^5`.** The 3.x and 4.x lines cap their React peer at 18, so they made
a clean React 19 install impossible. 5.x is the earliest line that supports React 19. Because
`@headstartwp/core` re-exports the parser's API (`export * from 'html-react-parser'`), two changes
surface in core's own types:

- `Element['children']` is now `ChildNode[]` (which includes `CDATA`) while `domToReact` takes
  `DOMNode[]`. A new exported `getChildNodes()` narrows between them — use it if you recurse with
  `domToReact(element.children, …)` in a `replace` callback.
- The `replace` callback signature gained an `index` parameter.
- `attributesToProps` types values as `string | boolean`, so props destined for string APIs may
  need narrowing.

**`react-inspector` removed.** It peered `react <= 18`, so it blocked a clean React 19 install, and
both fixed releases are `exports`-only packages this package's `moduleResolution` cannot read. It
powered only the debug-only `DebugBlock`, which now uses a small internal object viewer with no
external dependency.

**The global `JSX` namespace.** React 19's types removed it. Affected files now use
`import type { JSX } from 'react'`, which is valid under `@types/react` 18.3 and 19 alike, so this
does not force consumers off React 18.

**Security floors.** `path-to-regexp` `^6.2.0 → ^6.3.0` (CVE-2024-45296, ReDoS) and `loader-utils`
`^3.2.0 → ^3.2.1` (CVE-2022-37603, ReDoS). Both previously permitted a fixed version but floored on
a vulnerable one, so a consumer lockfile pinned at the floor stayed exposed.

Verified against React 19.2.7 by installing the packed package into a clean project — no
`--legacy-peer-deps` required — and confirming the shipped blocks still match when constructed
through the real JSX runtime.
