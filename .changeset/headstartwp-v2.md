---
'@headstartwp/core': major
'@headstartwp/next': major
'@headstartwp/epio-search': major
---

HeadstartWP v2: React 19, bounded peer ranges, and pages-router deprecation.

**React 19 only.** `react` and `react-dom` peers move from `>= 17.0.2` (open-ended) to `^19.0.0`.
v1 already *permitted* React 19 through that open range, so v2 removes nothing consumers had — it
replaces an untested compatibility claim with a tested line. React 18 users stay on v1.

`@headstartwp/block-primitives` is deliberately **not** part of this major. It stays on its `0.x`
line with `react: ^18.0.0 || ^19.0.0`, because its only runtime is the WordPress block editor, which
ships React 18.3 as of WP 7.1. The `@wordpress/*` packages it depends on declare that same dual
range, so this matches its dependencies rather than diverging from them. It will move when
WordPress does.

**Bounded peer ranges.** `next` moves from `>= 12.0.0` to `^15.5.21 || ^16.2.11`. The open-ended
range was a liability: 2026's high-severity Next.js advisories reach back into majors 12–14 and are
first patched only in 15.5.x, so there was nothing upstream to backport. Both floors are the
security-patched releases of their lines. `engines.node` is now `>=24.0.0` — Node 20 reached end of life in April 2026, and 24 is Active LTS.

**`html-react-parser` 3 → 6.** Required for React 19 support. Because `@headstartwp/core` re-exports
the parser's public API (`export * from 'html-react-parser'`), this lands directly in core's own
surface rather than behind it:

- `Element['children']` is now `ChildNode[]` (which includes `CDATA`) while `domToReact` takes
  `DOMNode[]`. A new exported `getChildNodes()` narrows between them — use it if you recurse with
  `domToReact(element.children, …)` in a `replace` callback.
- The `replace` callback signature gained an `index` parameter.
- `attributesToProps` now types values as `string | boolean`, so props destined for string APIs
  need narrowing.
- Void elements no longer carry `children: null` in their props; the key is simply absent. Checks
  written as `props.children === null` need to become truthiness checks.

Behaviour was audited rather than assumed: 120 comparisons across both the server and browser
parser builds, over a fixture corpus of real Gutenberg block markup, found no rendered-markup or
element-tree differences beyond that `children` change. See `packages/core/parity/`.

**The pages router is not supported.** v2 is app router only. `HeadlessApp`, `fetchHookData`,
`prepareFetchHookData`, `addHookData`, `handleError`, `withSiteContext`, `getSiteFromContext`,
`previewHandler` and `revalidateHandler` are **removed**, not deprecated. Use the app-router
equivalents from `@headstartwp/next/app`: `queryPost`/`queryPosts`/`queryTerms` and friends in
server components, `HeadstartWPApp` in your root `layout.tsx`, and `previewRouteHandler` /
`revalidateRouteHandler` in route handlers.

The client hooks (`usePost`, `usePosts`, `useSearch`, `useSearchNative`, `useTerms`,
`useAppSettings`, `useAuthorArchive`, `usePostOrPosts`) are **kept**, but now read the route from
`useParams()` instead of `useRouter()`. Two behaviours have no app-router equivalent and are gone:

- **Locale.** The pages router had built-in i18n; the app router does not. Polylang's language now
  comes from the `lang` route segment, matching what `prepareQuery` already did server-side.
- **Preview.** `router.isPreview` has no client counterpart — draft mode is server-only. Preview
  fetching happens server-side in v2. A client component that needs the alternative preview auth
  header can still set it via `options.fetchStrategyOptions`.

If you are on the pages router, **stay on v1**, which continues to receive support on its own line.

The three pages-router example projects (`wp-nextjs`, `wp-multisite-nextjs`,
`wp-multisite-i18n-nextjs`) have been removed from the repository; their app-router counterparts
(`wp-nextjs-app`, `wp-multisite-nextjs-app`, `wp-polylang-nextjs-app`) cover the same ground.

**Block matching under React 19.** Every shipped block declares its matching predicate through a
namespace-merged `defaultProps`, which React 19 no longer applies under the automatic JSX runtime.
Left unfixed, all of them would silently stop matching — no error, just unreplaced HTML.
`BaseBlocksRenderer` now resolves `defaultProps` explicitly, which also covers consumer blocks
written to the same documented pattern.

**`react-inspector` has been dropped** from `@headstartwp/core`'s dependencies. It peered
`react <= 18`, so it was the last thing preventing a clean React 19 install. The debug-only object
viewer it powered is now a small internal component with no external dependency.

**Bundle size.** React 19 adds **~15KB gzip (+17.9%)** to shared first-load JS, measured on the
`wp-nextjs-app` example (85,850 → 101,229 bytes). This is a deliberate, accepted regression, not an
oversight. The repository's bundle budget has been re-derived against it — see
`projects/wp-nextjs-app/BUNDLE-BUDGET.md`.

**Test-harness note for consumers.** `html-react-parser@6` pulls in `domhandler@6` and friends,
which ship ESM-only builds. If your tests run under jest, an unmocked `require` of them throws
*"Cannot use import statement outside a module"* — add a `transformIgnorePatterns` carve-out for
that subtree. If you also use msw 2, note that it needs the platform Fetch API, which stock jsdom
does not provide.
