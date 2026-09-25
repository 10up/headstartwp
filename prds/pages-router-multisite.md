# PRD — Pages Router Multisite (legacy)

> Legacy source: [`projects/wp-multisite-nextjs`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3/projects/wp-multisite-nextjs)
> Requires: [00-foundation.md](./00-foundation.md). Builds on [pages-router-starter.md](./pages-router-starter.md).
> Status: **maintenance reference.** New projects should use [app-router-multisite.md](./app-router-multisite.md).

## 1. Summary

The Pages Router starter serving multiple WordPress sites by hostname. `AppMiddleware` rewrites each
request to `/_sites/<site-slug-or-host>/<path>`, so every page lives under `pages/_sites/[site]/` and
receives `context.params.site`. HeadstartWP's `fetchHookData` reads the site from the context
automatically. The legacy project was written in **JavaScript** with `prop-types`.

## 2. Config

```js
// headstartwp.config.js
module.exports = {
	sites: [
		{ slug: 'site1', hostUrl: 'http://site1.localhost:3001', sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
		  redirectStrategy: '404', useWordPressPlugin: true },
		{ slug: 'site2', hostUrl: 'http://site2.localhost:3001', sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL_2,
		  redirectStrategy: '404', useWordPressPlugin: true },
	],
	integrations: { yoastSEO: { enable: true, optimizeYoastPayload: true } },
};
```

- Dev server on port 3001 (`next dev -p 3001`) so it can run next to a single-site project.
- Env: `NEXT_PUBLIC_HEADLESS_WP_URL`, `NEXT_PUBLIC_HEADLESS_WP_URL_2`.
- `next.config.js`: legacy used the old `withHeadlessConfig` name — use `withHeadstartWPConfig`.
- Middleware: foundation §4.3 (no `appRouter` flag).

## 3. File structure

```
src/pages/
├── _app.js, _document.js, 404.js, 500.js      # same as the Pages starter
├── api/preview.js, api/revalidate.js, api/cache-healthcheck.js
└── _sites/
    ├── [site]/
    │   ├── index.js
    │   ├── [...path].js
    │   ├── blog/[[...path]].js
    │   ├── category/[...path].js
    │   ├── tag/[...path].js
    │   ├── author/[...path].js
    │   └── search/[[...path]].js
    └── site1/
        └── index.js          # site-specific home override
```

Components (`Layout`, `Header`, `Nav`, `Logo`, `Search`, `Footer`, `Link`, `PageContent`, `Blocks`,
`Pagination`) and `utils/promises.js` are identical to the Pages starter.

## 4. Requirements

### 4.1 Pages under `[site]`

Same data functions as the Pages starter. The differences:

- **`[site]/index.js` `getStaticPaths`** returns one path per configured site
  (`getHeadstartWPConfig().sites` — legacy used the `getHeadlessConfig` alias — `{ params: { site: site.slug ?? site.host } }`), **excluding** `site1`
  because `site1` has its own static override; `fallback: true`.
- **`[site]/[...path].js` `getStaticPaths`** loops over every site, and for each uses
  `useAppSettings.fetcher(site.sourceUrl)` and `usePosts.fetcher(site.sourceUrl)` — fetchers accept a
  source URL so build-time code can target a specific site — then maps posts/pages through
  `removeSourceUrl({ link, backendUrl: site.sourceUrl })` into `{ params: { site, path } }`.
  `fallback: 'blocking'`.

### 4.2 Site-specific override

`_sites/site1/index.js` is a static segment, so Next doesn't supply `params.site`. Wrap the context:

```js
export async function getStaticProps(_context) {
	const context = withSiteContext(_context, 'site1');
	// ...fetchHookData(useAppSettings.fetcher(), context) etc.
}
```

`withSiteContext` (from `@headstartwp/next`) injects the site so fetches target the right backend.

### 4.3 Menu

`Nav` calls `useMenu('primary', { swr: { revalidateOnMount: true, revalidateOnFocus: true } })` so menus
re-render client-side with the latest items (legacy passed these without the `swr` namespace).

## 5. Acceptance criteria

Foundation §7, plus:

- [ ] `http://site1.localhost:3001` and `http://site2.localhost:3001` serve content from their respective
      WordPress URLs.
- [ ] site1's home renders the override (visible marker showing `settings.slug`); site2's home renders the
      shared `[site]/index.js`.
- [ ] `next build` pre-renders post/page paths for **both** sites.
- [ ] Archives, search and pagination work on both hosts.

## 6. Pitfalls

- Using `usePosts.fetcher()` without `site.sourceUrl` in `getStaticPaths` fetches from the default
  (possibly undefined) source.
- Forgetting to exclude override sites from `[site]/index.js` `getStaticPaths` creates two pages for one URL.
- `HeadstartWP` hooks in components need no site argument — the site comes from the `HeadlessApp` settings
  populated from `pageProps`.
