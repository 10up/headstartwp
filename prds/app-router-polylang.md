# PRD — App Router + Polylang (multilingual)

> Legacy source: [`projects/wp-polylang-nextjs-app`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3/projects/wp-polylang-nextjs-app)
> Requires: [00-foundation.md](./00-foundation.md). Builds on [app-router-starter.md](./app-router-starter.md).
> Docs: https://headstartwp.fueled.com/docs/learn/wordpress-integration/polylang

## 1. Summary

A single WordPress install with the **Polylang** plugin serving content in several languages, rendered by
an App Router app whose routes live under a `[lang]` segment. HeadstartWP's middleware detects the
locale, and its data layer automatically adds `lang=<locale>` to every REST request, so route code is
identical to the single-language starter.

## 2. When to use

- One WordPress site, multiple languages, translations managed with Polylang.
- Not for multisite: Polylang and multisite cannot be combined on the App Router (the middleware throws).
  For "one site per language", use the multisite pattern with a `locale` per site instead.

## 3. WordPress prerequisites

Foundation §3, plus Polylang active with languages whose codes **exactly match** `i18n.locales`
(e.g. `en`, `pt`, `es`), and every language's posts published.

## 4. Config

```js
// headstartwp.config.js
module.exports = {
	useWordPressPlugin: true,
	sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
	hostUrl: process.env.NEXT_PUBLIC_HOST_URL,
	preview: { usePostLinkForRedirect: true },
	i18n: { locales: ['en', 'pt', 'es'], defaultLocale: 'en' },
	integrations: {
		polylang: { enable: true },
		yoastSEO: { enable: true, optimizeYoastPayload: true },
	},
};
```

- On the App Router, `i18n` lives in **headstartwp.config.js**, not in `next.config.js`. Putting it in
  `next.config.js` is a Pages Router pattern and breaks App Router builds.
- Optional `localeDetection: false` in `i18n` disables `Accept-Language` negotiation.

`next.config.js`: foundation §4.2 with `logging.fetches.fullUrl` on (useful to confirm `lang=` is sent).
The legacy `conditionNames: ['import']` webpack override was an unexplained workaround — omit unless a
build proves it necessary (see multisite PRD §4).

Middleware: foundation §4.3 unchanged.

## 5. URL behavior (implemented by `AppMiddleware`)

| Request | Result |
| --- | --- |
| `/about` | internally rewritten to `/en/about` (default locale, no prefix in the URL) |
| `/en/about` | **redirected** to `/about` (default locale is never shown) |
| `/pt/sobre` | served from `[lang]=pt` |
| `/about` with `Accept-Language: pt` and detection on | redirected to `/pt/about` |

## 6. File structure and requirements

```
src/app/
├── layout.tsx            # <html><body> shell only
├── not-found.tsx
├── api/preview/route.ts
├── api/revalidate/route.ts
└── [lang]/
    ├── layout.tsx
    ├── page.tsx
    ├── not-found.tsx
    ├── (single)/[...path]/page.tsx
    ├── blog/[[...path]]/page.tsx
    ├── category/[...path]/page.tsx
    ├── tag/[...path]/page.tsx
    ├── author/[...path]/page.tsx
    └── search/[[...path]]/page.tsx
```

### 6.1 `[lang]/layout.tsx`

- `generateStaticParams` returns one entry per locale to pre-render (legacy: `en`, `es`). Derive it from
  the config's `i18n.locales` rather than hard-coding.
- `queryAppSettings({ menu: 'primary', routeParams: await params })` — menus and settings are per language.
- Legacy wrapped children in `ThemeSettingsProvider` + `SettingsProvider` from `@headstartwp/core/react`
  directly. Prefer `HeadstartWPApp` (as in the starter) with `linkComponent: Link`, plus
  `<BlockLibraryStyles />` and `<PreviewIndicator />`.
- The root `app/layout.tsx` hard-codes `<html lang="en">`. Set `lang` from the active locale instead —
  move `<html>` into `[lang]/layout.tsx` or read the `x-headstartwp-locale` header.

### 6.2 Home (`[lang]/page.tsx`)

Resolve the per-language front page: `queryAppSettings({ routeParams })` → `data.home.slug`, fallback
`'front-page'`, then `queryPost({ params: { slug, postType: 'page' } })`. Polylang has a different front
page per language, which is why the slug must be looked up rather than hard-coded.

### 6.3 Single (`[lang]/(single)/[...path]/page.tsx`)

As the starter, including `generateStaticParams` via `loadHeadstartWPConfig(params)` (the comment in
legacy code: "loads the right config based on route params — needed over getHeadstartWPConfig()").
Use `throwIfNotFound: false` on the `queryPosts` inside `generateStaticParams` so a language with no posts
doesn't fail the build. Blocks component renders at least `<LinkBlock />` with `settings` passed explicitly.

### 6.4 Language switcher (new requirement)

The docs promised a language switcher that the legacy project never had. Implement one: for the current
post, read Polylang translations (exposed on the post REST response by Polylang) and link to each
translation's `link`; on archives, link to each locale's home.

### 6.5 Other routes

Blog, category, tag, author, search: same as the starter, all with `routeParams: await params`. Add
`generateMetadata` + `JSONLD` (legacy skipped them in this project).

## 7. Acceptance criteria

Foundation §7, plus:

- [ ] `/`, `/pt`, `/es` render each language's front page.
- [ ] `/en/<slug>` redirects to `/<slug>`.
- [ ] A post's Portuguese translation renders at its Polylang permalink under `/pt/...`.
- [ ] Dev-server fetch logs show `lang=pt` on REST calls for `/pt/...` pages.
- [ ] The primary menu changes per language.
- [ ] `<html lang>` matches the active locale.
- [ ] The language switcher links to the translated URL of the current post.
- [ ] Previewing a draft translation lands on the right language path.

## 8. Pitfalls

- Locale mismatch between Polylang and `i18n.locales` produces silent 404s.
- Enabling both `polylang` and a `sites` array throws in middleware on the App Router.
- Hard-coding the front-page slug breaks non-default languages.
