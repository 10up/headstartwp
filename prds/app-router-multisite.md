# PRD — App Router Multisite

> Legacy source: [`projects/wp-multisite-nextjs-app`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3/projects/wp-multisite-nextjs-app)
> Requires: [00-foundation.md](./00-foundation.md). Builds on [app-router-starter.md](./app-router-starter.md).
> Docs: https://headstartwp.fueled.com/docs/learn/wordpress-integration/multisite

## 1. Summary

One Next.js App Router deployment serving **several WordPress sites**, each on its own hostname. The
sites can be sub-sites of a WordPress multisite network or entirely separate WordPress installs. The
middleware maps the incoming host to a configured site and rewrites the request into a `[site]` dynamic
segment, so every route receives the site slug in its params and queries the right backend.

It also demonstrates overriding a route for **one specific site**.

## 2. When to use

- Multiple brands/regions that share components and deployment but have separate WordPress content.
- A WordPress multisite network you want to serve headlessly from one app.

## 3. Scope

**In scope:** host-based site resolution, per-site layout and menu, the starter's routes nested under
`[site]`, a site-specific route override, per-site previews.

**Out of scope:** per-site theming (legacy used none), locale-per-site (see the Pages Router i18n PRD for
the pattern, or combine with Polylang), path-based multisite (`/site1/...`).

## 4. Config

```js
// headstartwp.config.js
module.exports = {
	useWordPressPlugin: true,
	preview: { usePostLinkForRedirect: true },
	sites: [
		{ slug: 'site1', sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL, hostUrl: 'http://site1.localhost:3000' },
		{ slug: 'js1', sourceUrl: 'https://js1.10up.com/', hostUrl: 'http://js1.localhost:3000' },
	],
	integrations: { yoastSEO: { enable: true, optimizeYoastPayload: true } },
};
```

- Top-level options (`useWordPressPlugin`, `preview`, `integrations`) are shared defaults; each site can
  override any of them.
- `slug` is what appears in the `[site]` segment. `hostUrl` is how the middleware recognizes the site.
- In a real project, every `sourceUrl`/`hostUrl` should come from env vars, one pair per site
  (`SITE1_WP_URL`, `SITE1_HOST_URL`, …). The legacy config hard-coded one of them.
- `*.localhost` hostnames resolve to 127.0.0.1 in modern browsers, which makes local multi-host testing
  work without editing `/etc/hosts`.

`next.config.js`: foundation §4.2. The legacy project also forced
`config.resolve.conditionNames = ['import']` in a custom webpack hook with a `TODO: figure out why this is
needed`. **Do not copy it by default.** Only add it if the build fails with dual-package (CJS/ESM)
resolution errors, and leave a comment explaining the observed error.

Middleware: foundation §4.3 unchanged — `AppMiddleware(req, { appRouter: true })` performs the
host → `[site]` rewrite.

## 5. File structure

```
src/app/
├── layout.tsx                 # bare <html><body> shell, no data fetching
├── not-found.tsx
├── api/preview/route.ts
├── api/revalidate/route.ts
├── [site]/
│   ├── layout.tsx             # per-site settings, menu, block styles
│   ├── page.tsx               # home
│   ├── not-found.tsx
│   ├── (single)/[...path]/page.tsx
│   ├── blog/[[...path]]/page.tsx
│   ├── category/[...path]/page.tsx
│   ├── tag/[...path]/page.tsx
│   ├── author/[...path]/page.tsx
│   └── search/[[...path]]/page.tsx
└── site1/
    └── (single)/[...path]/page.tsx   # override for site1 only
```

## 6. Requirements

### 6.1 Two layouts

- **Root `app/layout.tsx`** renders only `<html><body>` and fonts. It cannot fetch because it doesn't
  know the site.
- **`app/[site]/layout.tsx`** receives `HeadstartWPLayout` props (`{ children, params }`):

```tsx
const { menu, data, config } = await queryAppSettings({ menu: 'primary', routeParams: await params });
return (
	<>
		<BlockLibraryStyles params={await params} />
		<HeadstartWPApp settings={config} themeJSON={data['theme.json']}>
			{menu ? <Menu items={menu} /> : null}
			{children}
			<PreviewIndicator />
		</HeadstartWPApp>
	</>
);
```

Note `routeParams` on `queryAppSettings` and `params` on `BlockLibraryStyles` — both need the site.
Add `linkComponent: Link` to the settings as in the starter (the legacy multisite layout omitted it,
which is a bug: menu links then do full page loads).

### 6.2 Routes under `[site]`

Identical to the starter PRD, with every query passing `routeParams: await params`. The site is resolved
from `params.site`; no other code changes. Add `generateMetadata`, `JSONLD`, and `HtmlDecoder` the same
way as the starter — the legacy multisite routes skipped SEO, which should not be copied.

Home: query the front page per site via `queryAppSettings({ routeParams })` → `data.home.slug`,
falling back to `'front-page'` (legacy hard-coded `'front-page'`).

### 6.3 Site-specific override

`app/site1/(single)/[...path]/page.tsx` takes precedence over `app/[site]/(single)/[...path]` when the
rewritten path starts with `/site1`. Because the folder is static, `params` has no `site` key — inject
it:

```ts
queryPost({ routeParams: { ...(await params), site: 'site1' }, params: { postType: ['post', 'page'] } });
```

Use this only for genuinely different templates; otherwise branch on `params.site` inside the shared route.

## 7. Acceptance criteria

Foundation §7, plus:

- [ ] `http://site1.localhost:3000/` and `http://<other>.localhost:3000/` render different WordPress content.
- [ ] Each host shows its own primary menu.
- [ ] A post permalink on site1 renders through the `site1` override (visible marker), while the same path
      on the other host renders through the shared `[site]` route.
- [ ] A request for an unconfigured host returns 404. `AppMiddleware` only rewrites hosts it recognizes,
      so an unknown host's `/about` would otherwise match `app/[site]/page.tsx` with `site = "about"`.
      Guard in `app/[site]/layout.tsx`: if `params.site` is not a configured site slug, call `notFound()`.
- [ ] Previews from each WordPress site land on that site's host (each WP's Headless Frontend URL must
      be set to its own `hostUrl`).
- [ ] Revalidation from site A only invalidates site A pages.

## 8. Pitfalls

- Forgetting `routeParams` in any `query*` call silently queries the wrong (or no) site.
- Putting `queryAppSettings` in the root layout — it runs before the site is known.
- **Polylang + multisite is not supported on the App Router** — `AppMiddleware` throws
  `Polylang and multisite are not supported together`. For multilingual multisite, give each language
  its own site entry with a `locale` (see the Pages Router i18n PRD); on the App Router the middleware
  then rewrites to `/<locale>/<site>/...`, so routes live under `app/[lang]/[site]/`.
- The middleware sets `x-headstartwp-site` (and `x-headstartwp-locale`) response headers — handy for
  debugging which site a request resolved to.
- Using `getHeadstartWPConfig()` in `generateStaticParams`; use `loadHeadstartWPConfig(params)` so you get
  the config of the site being generated.
