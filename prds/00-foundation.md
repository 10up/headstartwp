# PRD 00 — HeadstartWP Project Foundation

> **Audience:** an LLM coding agent standing up a new HeadstartWP project.
> **Read this first**, then the project-specific PRD. Project PRDs assume every requirement here and only
> describe what is different.

## 1. Summary

A HeadstartWP project is a Next.js front end that renders content from a WordPress back end over the
WordPress REST API. HeadstartWP provides:

| Package | Role |
| --- | --- |
| `@headstartwp/core` | Framework-agnostic data fetching, config, URL utilities, block rendering (`BlocksRenderer`), React providers/hooks |
| `@headstartwp/next` | Next.js integration: `@headstartwp/next/app` (App Router query functions, route handlers, block components), `@headstartwp/next/middlewares` (`AppMiddleware`), `@headstartwp/next/config` (`withHeadstartWPConfig`), and Pages Router hooks from `@headstartwp/next` |
| `@10up/next-redis-cache-provider` | Optional Redis-backed Next.js cache handler for self-hosted ISR |
| `@headstartwp/epio-search` | Optional ElasticPress.io search UI/hooks |
| `@headstartwp/block-primitives` | Optional primitives for components shared between Gutenberg and the front end |
| `headstartwp/headstartwp` (WordPress plugin) | REST API extensions, previews, on-demand revalidation, redirects, Yoast payloads |

## 2. Target stack (1.x line)

- **Node.js** ≥ 24 and **npm** ≥ 11. The published packages declare `engines.node >= 24`.
- **Next.js 15** (App Router preferred) and **React 18**. The 1.x line of HeadstartWP targets Next 15 /
  React 18; do not install Next 16 or React 19 against 1.x packages.
- **TypeScript** 5 is recommended. JavaScript works; the Pages Router PRDs were originally written in JS.
- Latest **1.x** of `@headstartwp/core` and `@headstartwp/next`. Keep their minor versions in step —
  `@headstartwp/next` depends on a matching `@headstartwp/core`.
- **WordPress** with the HeadstartWP plugin active and pretty permalinks enabled (`/%postname%/` or
  similar). Plain `?p=123` permalinks break path matching.

Install with:

```bash
npm install next@^15 react@^18 react-dom@^18 @headstartwp/core@^1 @headstartwp/next@^1
npm install -D typescript @types/node @types/react@^18 @types/react-dom@^18
```

## 3. WordPress prerequisites

1. Install the HeadstartWP plugin (`composer require headstartwp/headstartwp`, or the zip from
   `10up/headstartwp-plugin`) and activate it.
2. **Settings → General → Headless Frontend URL**: set to the Next.js site's public URL (for local work,
   `http://localhost:3000`). Previews and revalidation redirect here.
3. Optional: enable **On-demand ISR revalidation** in the same settings screen.
4. Optional integrations used by some PRDs: Yoast SEO, Polylang, ElasticPress, WordPress multisite.

If no WordPress is available, `https://js1.10up.com` is a public demo backend the legacy projects used.
It is fine for smoke-testing but must never ship as a default in a real project.

## 4. Required files

Every project has these. Paths assume a `src/` directory.

### 4.1 `headstartwp.config.js` (project root)

The framework config. `withHeadstartWPConfig` loads it automatically — do not import it into pages.

```js
/** @type {import('@headstartwp/core').HeadlessConfig} */
module.exports = {
	sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
	hostUrl: process.env.NEXT_PUBLIC_HOST_URL,
	useWordPressPlugin: true,
	redirectStrategy: '404',
	preview: {
		// Redirect previews using post.link so previews land on the same route real visitors use.
		usePostLinkForRedirect: true,
	},
	integrations: {
		yoastSEO: { enable: true, optimizeYoastPayload: true },
	},
};
```

Notes:
- `customPostTypes` and `customTaxonomies` must be declared for anything beyond `post`/`page`/
  `category`/`post_tag`, with `single`/`archive` paths that **match your file-system routes**.
- `customTaxonomies` can be a function receiving the defaults, e.g. to set `matchArchivePath: true` on
  built-in taxonomies.
- Multisite projects replace top-level `sourceUrl`/`hostUrl` with a `sites: []` array (see the multisite PRDs).
- Optional `debug: { requests, redirects, devMode }` flags are useful locally; drive them from env vars.

### 4.2 `next.config.js`

```js
const { withHeadstartWPConfig } = require('@headstartwp/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
	logging: { fetches: { fullUrl: true } }, // shows every WP REST call in dev logs
};

module.exports = withHeadstartWPConfig(nextConfig);
```

- `withHeadstartWPConfig` is the current name; `withHeadlessConfig` is a legacy alias — don't use it in
  new code.
- HeadstartWP does **not** prescribe a styling solution. The built-in linaria loader is deprecated; use
  plain CSS, CSS Modules, Tailwind, or anything else.

### 4.3 `src/middleware.ts`

```ts
import { AppMiddleware } from '@headstartwp/next/middlewares';
import type { NextRequest } from 'next/server';

export const config = {
	matcher: [
		// Everything except API routes, Next internals, /fonts and root static files.
		'/((?!api|cache-healthcheck|_next|fonts[\\w-]+\\.\\w+).*)',
	],
};

export async function middleware(req: NextRequest) {
	return AppMiddleware(req, { appRouter: true }); // omit { appRouter: true } on the Pages Router
}
```

`AppMiddleware` handles redirects (`redirectStrategy`), multisite host → site rewrites, and locale
handling. Anything custom you add must run **before** returning `AppMiddleware(...)` or wrap its response.

### 4.4 Preview and revalidate endpoints

WordPress redirects to `/api/preview` and calls `/api/revalidate`. Both paths are fixed unless you also
filter them on the WordPress side.

App Router:

```ts
// src/app/api/preview/route.ts
import { previewRouteHandler } from '@headstartwp/next/app';
import type { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
	return previewRouteHandler(request);
}

// src/app/api/revalidate/route.ts
import { revalidateRouteHandler } from '@headstartwp/next/app';
import type { NextRequest } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(request: NextRequest) {
	return revalidateRouteHandler(request);
}
```

Pages Router: `src/pages/api/preview.ts` → `previewHandler(req, res)` and
`src/pages/api/revalidate.ts` → `revalidateHandler(req, res)`, both from `@headstartwp/next`.

Previews use a short-lived JWT generated by the plugin; no shared secret is needed.

### 4.5 Environment variables

`.env` (committed, safe defaults) and `.env.local` (developer overrides, git-ignored):

```
NEXT_PUBLIC_HEADLESS_WP_URL=https://cms.example.com
NEXT_PUBLIC_HOST_URL=http://localhost:3000
```

- Local WordPress over HTTPS with self-signed certs needs `NODE_TLS_REJECT_UNAUTHORIZED=0` **in
  `.env.local` only**.
- Redis ISR (optional): `NEXT_REDIS_URL` or `VIP_REDIS_PRIMARY` (see §5).

### 4.6 Link handling

Links in WordPress content and menus point at the WordPress domain. HeadstartWP rewrites them:

- App Router: pass `Link` from `@headstartwp/next/app` as `linkComponent` in the settings given to
  `HeadstartWPApp`, and render `<LinkBlock />` inside `BlocksRenderer`.
- Pages Router: a small `Link` component that calls `removeSourceUrl({ link, backendUrl: settings.sourceUrl })`
  and renders `next/link`, passed as `settings.linkComponent` to `HeadlessApp`.
- In your own code, use `post.link` (already a WP URL) through the same `Link` / `removeSourceUrl`.

## 5. Optional: Redis cache handler (self-hosted ISR)

Only needed when hosting somewhere without native Next.js ISR storage (e.g. WordPress VIP, multi-instance
containers). Add `@10up/next-redis-cache-provider` and in `next.config.js`:

```js
if (process.env.NEXT_REDIS_URL || process.env.VIP_REDIS_PRIMARY) {
	const { initRedisClient } = require('@10up/next-redis-cache-provider');
	initRedisClient();
	nextConfig.cacheHandler = require.resolve('@10up/next-redis-cache-provider');
	nextConfig.cacheMaxMemorySize = 0; // App Router: disable the in-memory layer so instances share Redis
}
```

A `cache-healthcheck` API route returning `200 Ok` was included in the Pages Router starters because
some hosts require a health-check URL; the middleware matcher above already excludes it.

## 6. Conventions the agent should follow

- Fetch data in Server Components with the `query*` functions from `@headstartwp/next/app`
  (`queryPost`, `queryPosts`, `queryPostOrPosts`, `querySearch`, `queryAuthorArchive`, `queryTerms`,
  `queryAppSettings`). Always pass `routeParams: await params` so path matching, multisite and i18n work.
- Wrap each route's query in a local `async function query({ params })` and call it from both
  `generateMetadata` and the page component. Next.js dedupes the fetch, and the two can never disagree.
- Use `seo.metadata` from query results in `generateMetadata`, and render `<JSONLD schema={seo.schema} />`
  when Yoast is enabled.
- Render post titles through `HtmlDecoder` (WordPress returns HTML entities) and content through
  `BlocksRenderer` (never `dangerouslySetInnerHTML` directly — it skips sanitization and block components).
- Secondary queries that may legitimately return nothing (related posts, sidebars) must pass
  `options: { throwIfNotFound: false }`; otherwise an empty result 404s the whole page.
- Don't hard-code `js1.10up.com`, placeholder copyright text, or demo-only components into a real project.

## 7. Baseline acceptance criteria (all projects)

- [ ] `npm run build` succeeds against the configured WordPress.
- [ ] `npm run dev` serves the home page and at least one post and one page with real content.
- [ ] A WordPress URL pasted into content renders as a front-end-relative link.
- [ ] Unknown paths render the project's not-found page with a 404 status.
- [ ] Clicking **Preview** on a draft in WordPress lands on the front end showing draft content (requires
      the Headless Frontend URL setting).
- [ ] If revalidation is enabled, updating a post in WordPress refreshes that page without a redeploy.
- [ ] `tsc --noEmit` passes (TypeScript projects).
- [ ] No secrets or local-only env values are committed.

## 8. Further reading

HeadstartWP docs: https://headstartwp.fueled.com/docs — especially *Headless Config*, *Data Fetching*,
*Rendering Blocks*, *Previews*, *Revalidate*, *Multisite*, and *Polylang*.
