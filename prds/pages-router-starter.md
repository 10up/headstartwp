# PRD — Pages Router Starter (legacy)

> Legacy source: [`projects/wp-nextjs`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3/projects/wp-nextjs)
> Requires: [00-foundation.md](./00-foundation.md)
> Status: **maintenance reference.** New projects should use [app-router-starter.md](./app-router-starter.md).

## 1. Summary

The original HeadstartWP starter, built on the Next.js **Pages Router** with HeadstartWP's SWR-based
hooks (`usePost`, `usePosts`, `usePostOrPosts`, `useSearchNative`, `useAuthorArchive`, `useTerms`,
`useMenu`, `useAppSettings`). Data is fetched on the server with `fetchHookData(hook.fetcher(), context,
{ params })`, handed to the page through `addHookData`, and read back in components through the same hook
with the same params — so the client never refetches what the server already loaded.

It includes a site shell (header with logo, primary menu and search box; footer), pagination on
archives, custom post type/taxonomy config, NProgress route-change bar, Yoast head output, and a split
client/server HeadstartWP config.

## 2. When to use

- You maintain a Pages Router site and need a reference for how it's supposed to be wired.
- You're migrating Pages → App Router and want the "before" picture.

## 3. Config

### 3.1 Split config

- `headstartwp.config.client.js` — everything safe for the browser: `sourceUrl`, `hostUrl`,
  `customPostTypes`, `customTaxonomies`, `redirectStrategy: '404'`, `useWordPressPlugin: true`,
  `integrations` (Yoast with `optimizeYoastPayload`, Polylang toggled by
  `NEXT_PUBLIC_ENABLE_POLYLANG_INTEGRATION`), `debug` flags from `ENABLE_REQUEST_DEBUG`,
  `ENABLE_REDIRECT_DEBUG`, `ENABLE_DEV_MODE`, and `preview.usePostLinkForRedirect: true`.
- `headstartwp.config.server.js` — spreads the client config and adds server-only options
  (legacy: `cache: { enabled: false }`).
- `withHeadstartWPConfig` picks the right file for each bundle.

Example CPT/taxonomy config (shown for shape — remove if unused):

```js
customPostTypes: [
	// single/archive must match your file-system routes: pages/book/[...path].tsx and pages/books/...
	{ slug: 'book', endpoint: '/wp-json/wp/v2/book', single: '/book', archive: '/books' },
],
customTaxonomies: (defaults) => [
	...defaults.map((t) => ({ ...t, matchArchivePath: true })),
	{ slug: 'genre', endpoint: '/wp-json/wp/v2/genre' },
],
```

The legacy config declared `book` and `genre` but shipped no routes for them — if you declare a CPT,
create its routes.

### 3.2 `next.config.js`

`withHeadstartWPConfig(nextConfig)`, optionally wrapped by `@next/bundle-analyzer`
(`ANALYZE=true next build`). When Polylang is on, Pages Router **does** use Next's `i18n`
(`locales: ['en', 'pt'], defaultLocale: 'en'`) in `next.config.js`. Optional Redis cache handler per
foundation §5 (without `cacheMaxMemorySize`).

### 3.3 Env files

`.env` (production-ish defaults) and `.env.development`:
`NEXT_PUBLIC_HEADLESS_WP_URL=http://localhost:8888`, `NEXT_PUBLIC_HOST_URL=http://localhost:3000`,
`ENABLE_POLYLANG_INTEGRATION=false`, `ENABLE_REQUEST_DEBUG=true`, `ENABLE_REDIRECT_DEBUG=true`,
`ENABLE_DEV_MODE=true`. Note the legacy mismatch: the config reads
`NEXT_PUBLIC_ENABLE_POLYLANG_INTEGRATION` but `.env.development` set `ENABLE_POLYLANG_INTEGRATION` —
use one name.

Middleware: foundation §4.3 **without** `{ appRouter: true }`.

## 4. Shared params (`src/params.ts`)

Params objects are defined once and imported by both `getStaticProps/getServerSideProps` and the hook
call in the component. **They must be identical** or the client cache key misses and refetches.

```ts
export const singleParams: PostParams = { postType: ['page', 'post'] };
export const indexParams: PostParams = { postType: ['page'] };
export const searchParams: PostsArchiveParams = { type: 'post', subtype: 'page, post' };
export const blogParams: PostOrPostsParams = {
	single: { postType: 'post' },
	archive: { postType: 'post', _fields: ['id', 'title', 'link'] },
	priority: 'single',
	routeMatchStrategy: 'single',
};
export const indexTermsParams: TaxonomyArchiveParams = { order: 'asc', orderby: 'count' };
```

## 5. `resolveBatch` helper (`src/utils/promises.ts`)

Runs several `fetchHookData` promises with `Promise.allSettled`, rethrows any rejection whose entry
didn't set `throw: false`, and returns fulfilled values. Used so a failing non-critical fetch (app
settings) doesn't 500 the page, while a failing main query still goes to `handleError` (→ 404/redirect).

## 6. Pages

| File | Data function | Fetches |
| --- | --- | --- |
| `pages/index.tsx` | `getStaticProps`, `revalidate: 300` | app settings → front-page slug (fallback `'front-page'` on `EndpointError`), `usePost` with `indexParams + slug`, `useTerms({ taxonomy: 'category' })`; passes `homePageSlug` prop. Client-only: 5 recent posts via `usePosts({ per_page: 5, _fields: ['title','id'] }, { swr: { revalidateOnMount: true } })` |
| `pages/[...path].tsx` | `getStaticPaths` (first 50 posts + 50 pages, excluding `/` and the front page, `fallback: 'blocking'`) + `getStaticProps` `revalidate: 300` | `usePost(singleParams)`, app settings (`throw: false`) |
| `pages/blog/[[...path]].tsx` | `getServerSideProps` | `usePostOrPosts(blogParams)`; archive via `usePosts(blogParams.archive)`, single via `PageContent` |
| `pages/category/[...path].tsx` | `getServerSideProps` | `usePosts({ taxonomy: 'category' })` + `Pagination` |
| `pages/tag/[...path].tsx` | `getServerSideProps` | `usePosts({ taxonomy: 'post_tag' })` + `Pagination` |
| `pages/author/[...path].tsx` | `getServerSideProps` | `useAuthorArchive()` + `Pagination` |
| `pages/search/[[...path]].tsx` | `getServerSideProps` | `useSearchNative(searchParams)` |
| `pages/404.tsx`, `pages/500.tsx` | `getStaticProps`, `revalidate: 60` | app settings for `<title>`/description |
| `pages/api/preview.ts`, `revalidate.ts` | — | foundation §4.4 (Pages variants) |
| `pages/api/cache-healthcheck.ts` | — | returns `200 Ok` |

Every data function follows the same shape:

```ts
export const getServerSideProps = (async (context) => {
	try {
		const settled = await resolveBatch([
			{ func: fetchHookData(usePosts.fetcher(), context, { params: { taxonomy: 'category' } }) },
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);
		return addHookData(settled, {});
	} catch (e) {
		return handleError(e, context);
	}
}) satisfies HeadlessGetServerSideProps;
```

`queriedObject` (term/author) is available server-side on the settled result if a page needs conditional
fetching.

## 7. App shell

- `_app.tsx`: `HeadlessApp` with `pageProps`, `settings={{ linkComponent: Link }}`, `useYoastHtml`
  (renders Yoast's head HTML), and `swrConfig` with `revalidateOnFocus`, `revalidateOnReconnect`,
  `revalidateOnMount` all **false** (server data is authoritative; client-only queries opt back in per
  call). Strip `fallback` and `themeJson` from `pageProps` before spreading into the page. Wire NProgress to
  `Router.events` (`routeChangeStart/Complete/Error`).
- `_document.tsx`: loads a Google font (legacy: Roboto, `display=optional`).
- `Layout` = `Header` (`Nav` via `useMenu('primary')` + `<Menu>`, `Logo` showing `settings.site_name`,
  `Search` input that `router.push('/search/<term>')` on Enter/click) + `MainContent` + `Footer`
  (privacy policy link from `settings.privacy_policy_url`, copyright).
- `Link`: `removeSourceUrl` + `next/link` (foundation §4.6).
- `PageContent`: reads `usePost(params)` from cache (no prop drilling), renders `HtmlDecoder` title and a
  dynamically imported `Blocks`. Documented caveat: this creates an implicit dependency on the parent
  having fetched the same params — use only for route-bound components.
- `Blocks`: `BlocksRenderer` with `ImageBlock component={ImageComponent}`, `LinkBlock`, `TwitterBlock`
  (from `@headstartwp/next`), and `YoutubeLiteBlock` (from `@headstartwp/core/react`).
- `Pagination`: builds `/page/N` links from `pageInfo` and `router.asPath`; hidden when `totalPages === 1`.
- CSS: WordPress block-library CSS copied into `src/css/block-library.css`, plus small component and
  NProgress stylesheets imported by `src/styles.css`. Prefer importing `@wordpress/block-library` styles
  from the package over vendoring 3,000 lines of CSS.

## 8. Acceptance criteria

Foundation §7, plus:

- [ ] Viewing page source for a post shows server-rendered content and Yoast head tags.
- [ ] Navigating between posts client-side does not refetch data already in `pageProps` (check network).
- [ ] The home page's "Recent Posts" list loads client-side after hydration.
- [ ] Category/tag/author archives paginate via `/page/2`.
- [ ] Header search navigates to `/search/<term>` and shows results.
- [ ] `/500` and `/404` render with the site name in `<title>`.
- [ ] `npm run build:analyze` produces a bundle report.

## 9. Pitfalls

- Params used in `fetchHookData` and the hook must be deep-equal.
- Disabling `revalidateOnMount` globally means any client-only `usePosts` must pass
  `{ swr: { revalidateOnMount: true } }` or it never fires. (The multisite legacy projects passed
  `{ revalidateOnMount: true }` without the `swr` key — that is a deprecated form that still works but
  logs a warning; always namespace under `swr`.)
- `getStaticPaths` catches "no posts" errors and continues — keep that, or empty sites fail to build.
