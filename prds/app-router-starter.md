# PRD — App Router Starter (single site)

> Legacy source: [`projects/wp-nextjs-app`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3/projects/wp-nextjs-app)
> Requires: [00-foundation.md](./00-foundation.md)
> Status: **recommended default for new projects**

## 1. Summary

A single-site Next.js 15 App Router front end for one WordPress install. It renders the home page,
posts and pages at their WordPress permalinks, a blog index, category/tag/author archives, and search.
It supports Yoast SEO metadata + JSON-LD, Gutenberg block rendering with framework block components,
draft previews, on-demand revalidation, static generation of posts at build time, and optional Redis ISR.

This was the project behind `npx create-next-app -e .../projects/wp-nextjs-app` in the Quick Setup docs.

## 2. When to use

- You're starting a new headless WordPress site with one WordPress backend.
- You want the smallest correct App Router project to extend.

Use a different PRD for multiple WordPress sites (multisite), multiple languages (Polylang), or
ElasticPress-powered search.

## 3. Scope

**In scope:** routes in §4, root layout with primary menu, block renderer, SEO, preview, revalidate,
middleware, optional Redis cache.

**Out of scope:** visual design (the legacy project had near-zero styling — only Next's default
`globals.css` and the Inter font), pagination UI for App Router archives, comments, forms, auth.

## 4. Routes

| Route (file) | Purpose | Data | Caching |
| --- | --- | --- | --- |
| `app/page.tsx` | Home | `queryPost({ params: { slug: <front page slug>, postType: 'page' } })` | `next: { revalidate: 60, tags: ['home'] }` |
| `app/(single)/[...path]/page.tsx` | Any post or page by permalink | `queryPost({ params: { postType: ['post', 'page'] } })` | `cache: 'force-cache'` + `generateStaticParams` |
| `app/blog/[[...path]]/page.tsx` | `/blog` archive **and** `/blog/<post>` single | `queryPostOrPosts` (see §5.3) | default |
| `app/category/[...path]/page.tsx` | Category archive | `queryPosts({ params: { taxonomy: 'category' } })` | default |
| `app/tag/[...path]/page.tsx` | Tag archive | `queryPosts({ params: { taxonomy: 'post_tag' } })` | default |
| `app/author/[...path]/page.tsx` | Author archive | `queryAuthorArchive()` | default |
| `app/search/[[...path]]/page.tsx` | `/search/<term>` results | `querySearch()` | default |
| `app/not-found.tsx` | 404 | — | — |
| `app/api/preview/route.ts` | Preview handler | foundation §4.4 | dynamic |
| `app/api/revalidate/route.ts` | Revalidate handler | foundation §4.4 | dynamic |

Why `(single)` is a route group: the catch-all `[...path]` must sit at the root to match any permalink,
but a route group keeps it from colliding visually/organizationally with `blog/`, `category/`, etc.
Specific segments (`blog`, `category`, …) always win over the catch-all in Next.js routing.

Every archive/single page must export `generateMetadata` using the same local `query()` helper as the
page (foundation §6).

## 5. Requirements

### 5.1 Config

`headstartwp.config.js`: foundation §4.1 as written (`sourceUrl`, `useWordPressPlugin: true`,
`preview.usePostLinkForRedirect: true`, Yoast enabled with `optimizeYoastPayload`).

`next.config.js`: foundation §4.2 plus the optional Redis block from foundation §5, with
`cacheMaxMemorySize = 0` when Redis is on.

### 5.2 Root layout (`app/layout.tsx`)

- `async` Server Component.
- `const { menu, data, config } = await queryAppSettings({ menu: 'primary' })`.
- Build `settings = { ...config, linkComponent: Link }` where `Link` comes from `@headstartwp/next/app`.
- Render inside `<html><body>`:
  - `<BlockLibraryStyles />` (WordPress core block CSS),
  - `<HeadstartWPApp settings={settings} themeJSON={data['theme.json']}>` wrapping
    `{menu ? <Menu items={menu} /> : null}` (from `@headstartwp/core/react`), `{children}`, and
    `<PreviewIndicator />` (shows an "exit preview" control while in draft mode).
- Font: `next/font/google` Inter in the legacy project — replace with the project's own font.

### 5.3 Blog route: `queryPostOrPosts`

`/blog` must list posts, and `/blog/<slug>` must render the single post. Use:

```ts
queryPostOrPosts({
	routeParams: await params,
	params: {
		single: { postType: 'post' },
		archive: { postType: 'post' },
		priority: 'single',
		routeMatchStrategy: 'single',
	},
});
```

Branch on the result: `isArchive && data.posts` → archive list; `isSingle && data.post` → article;
otherwise `notFound()`. In `generateMetadata`, return `seo.metadata` only when `isMainQuery` is true;
otherwise return a static `{ title: 'Blog', description: ... }` because the bare archive has no WP
metadata.

### 5.4 Single route extras

- `generateStaticParams`: load the config for the current params with
  `await loadHeadstartWPConfig(params)` (needed instead of a global config so multisite/i18n keep
  working if added later), `queryPosts({ routeParams: params, params: { postType: 'post' } })`, and map
  each `post.link` through `removeSourceUrl({ backendUrl: sourceUrl, link, publicUrl: hostUrl })`,
  strip the leading `/`, split on `/`. The legacy code needed `// @ts-expect-error` because `params`
  is typed as a promise there; keep the comment explaining why if you hit the same typing issue.
- Render title via `HtmlDecoder`, content via the project `Blocks` component (§5.5), and
  `<JSONLD schema={seo.schema} />` when present.
- Legacy demo only (optional): when the post has a category, render related posts twice — once
  client-side (`useFetchPosts` in a `'use client'` component loaded with `next/dynamic`) and once
  streamed from the server inside `<Suspense>` (`queryPosts` with `throwIfNotFound: false`). This existed
  to prove both data paths work. **Real projects should pick one** (server streaming is preferred).

### 5.5 Blocks component (`components/Blocks.tsx`)

An async Server Component taking `{ html, settings, styles }`:

```tsx
const { data } = await queryAppSettings();
return (
	<BlocksRenderer
		forwardBlockAttributes
		html={html}
		settings={settings}             // no React context in RSC — pass settings explicitly
		blockContext={{ themeJSON: data['theme.json'].settings }}
		blockStyles={styles}            // post.content.block_styles from the plugin
	>
		<ImageBlock />
		<PostList test={(node) => isBlockByName(node, 'core/query')} />
		<TwitterBlock />
		<LinkBlock />
	</BlocksRenderer>
);
```

`ImageBlock`, `TwitterBlock`, `LinkBlock` come from `@headstartwp/next/app`; `isBlockByName` from
`@headstartwp/core`. Always pass `styles={data.post.content.block_styles ?? ''}` from the caller.

`PostList` (optional demo) replaces `core/query` blocks with a server-rendered list: read
`block.attributes.query` (`perPage`, `postType`), call `queryPosts({ params: { per_page, postType },
options: { throwIfNotFound: false } })` inside `<Suspense>`. The legacy version printed the raw query as
JSON for debugging and mapped only two query fields (marked `todo`); a real implementation should map
the rest of the Query Loop attributes and drop the debug output.

### 5.6 Home page

Legacy code hard-coded `slug: 'sample-page'`. Correct behavior: read the static front page from
`queryAppSettings()` (`data.home.slug`) and fall back to `'front-page'`, as the Polylang PRD does. Keep
the `tags: ['home']` so a revalidate callback can `revalidateTag('home')`.

## 6. Dependencies

`next@^15`, `react@^18`, `react-dom@^18`, `@headstartwp/core@^1`, `@headstartwp/next@^1`,
optional `@10up/next-redis-cache-provider@^2`. Dev: `typescript@^5`, `@types/node`, `@types/react@^18`,
`@types/react-dom@^18`. `tsconfig.json` should be the Next default with `strict: true`,
`moduleResolution: "bundler"`, and the `next` TS plugin.

Scripts: `dev: next dev`, `build: next build`, `start: next start`.

## 7. Acceptance criteria

Foundation §7, plus:

- [ ] `/` renders the WordPress static front page (not a hard-coded slug).
- [ ] A post permalink and a page permalink both render via `(single)/[...path]`, with Yoast `<title>`
      and meta description, and a JSON-LD script tag.
- [ ] `next build` output lists pre-rendered post paths from `generateStaticParams`.
- [ ] `/blog` lists posts; `/blog/<post-slug>` renders the post; `/blog/nope` 404s.
- [ ] `/category/<slug>`, `/tag/<slug>`, `/author/<slug>` list the right posts with the term/author name as `<h1>`.
- [ ] `/search/<term>` lists results or "Nothing found".
- [ ] The primary menu renders and its links are front-end relative.
- [ ] Embedded images use `next/image` via `ImageBlock`; tweets render via `TwitterBlock`.
- [ ] A page with a Query Loop block renders the post list server-side.

## 8. Pitfalls captured from the legacy project

- The `eslint.ignoreDuringBuilds` flag in the legacy `next.config.js` existed only because the monorepo
  linted centrally. Don't copy it; lint the new project normally.
- `nextBundleAnalysis` in the legacy `package.json` fed a CI bundle-size check for the monorepo. Not needed.
- The legacy README was the stock create-next-app README — write a real one.
- Missing `throwIfNotFound: false` on a related-posts query turns an empty category into a site-wide 404.
