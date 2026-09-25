# PRD — Pages Router Multisite with i18n (legacy)

> Legacy source: [`projects/wp-multisite-i18n-nextjs`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3/projects/wp-multisite-i18n-nextjs)
> Requires: [00-foundation.md](./00-foundation.md). **Diff against** [pages-router-multisite.md](./pages-router-multisite.md) — everything there applies unless stated here.
> Status: **maintenance reference.**
> Docs: https://headstartwp.fueled.com/docs/learn/wordpress-integration/multisite (Internationalized routing)

## 1. Summary

Multisite where **each language is its own WordPress site**, combined with Next.js Pages Router i18n
routing. A site is identified by `hostUrl` **plus** `locale`, so the same host can serve several
languages from different WordPress backends (e.g. `site2.localhost/en` from WP #1 and
`site2.localhost/es` from WP #2). This is the alternative to Polylang when translations live in separate
WordPress sites.

## 2. Config

```js
// headstartwp.config.js — no `slug`; sites are keyed by host + locale
sites: [
	{ hostUrl: 'http://site1.localhost:3002', locale: 'en', sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL, ... },
	{ hostUrl: 'http://site2.localhost:3002', locale: 'en', sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL, ... },
	{ hostUrl: 'http://site2.localhost:3002', locale: 'es', sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL_2, ... },
],
```

```js
// next.config.js — Pages Router uses Next's own i18n
i18n: {
	locales: ['default', 'en', 'es'],
	defaultLocale: 'default',
	localeDetection: false,
},
```

The `'default'` pseudo-locale is a known Next.js Pages Router trick: it makes every real locale appear in
the URL (`/en/...`, `/es/...`) because the default locale is never prefixed. The middleware then redirects
`default` to `en`:

```js
export async function middleware(req) {
	if (req.nextUrl.locale === 'default') {
		return NextResponse.redirect(new URL(`/en${req.nextUrl.pathname}`, req.url));
	}
	return AppMiddleware(req);
}
```

Dev server on port 3002.

## 3. Differences from Pages Router multisite

- No `site1` override folder.
- Because sites have no `slug`, route params use `site: site.host`.
- Every `getStaticPaths` entry includes `locale: site.locale`:
  - `[site]/index.js`: `sites.map((site) => ({ params: { site: site.host }, locale: site.locale }))`.
  - `[site]/[...path].js`: each post/page path gets `locale: site.locale`.
- `Nav` uses plain `useMenu('primary')`.

## 4. Acceptance criteria

Foundation §7, plus:

- [ ] `http://site2.localhost:3002/en` and `/es` render content from different WordPress backends.
- [ ] `http://site1.localhost:3002/` redirects to `/en/`.
- [ ] `next build` pre-renders each site × locale combination.
- [ ] Links inside content keep the current locale prefix.

## 5. Pitfalls

- A site entry's `locale` must be one of `next.config.js` `i18n.locales`.
- Removing `'default'` from locales makes the default language unprefixed and breaks the host+locale lookup
  for that language.
- On the App Router, this pattern moves the `i18n` block into `headstartwp.config.js` and routes to
  `app/[lang]/[site]/`; see [app-router-multisite.md](./app-router-multisite.md) §8.
