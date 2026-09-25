# PRD — `@headstartwp/core` in a Vite + React SPA (no Next.js)

> Legacy source: [`test-projects/vite-react`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3/test-projects/vite-react)
> Requires: [00-foundation.md](./00-foundation.md) §2–3 only (the Next.js parts don't apply).

## 1. Summary

A client-rendered React app built with Vite that consumes `@headstartwp/core` directly: it sets the
HeadstartWP config at startup, fetches posts with the React hooks from `@headstartwp/core/react`, and
renders WordPress HTML with `BlocksRenderer`. In the monorepo this existed as a smoke test that the
**ESM build** of the packages works in a non-Next bundler. As a PRD it describes how to use HeadstartWP
in widgets, embeds, admin tools, or other SPAs.

## 2. When to use

- Embedding WordPress content in an existing non-Next React app.
- Prototyping against the REST API with HeadstartWP's data layer and block renderer.
- Not for public, SEO-sensitive sites (no SSR) — use a Next.js PRD.

## 3. Stack

`vite@^5`+, `@vitejs/plugin-react`, `react@^18`, `react-dom@^18`, `@headstartwp/core@^1`, TypeScript.
Do **not** install `@headstartwp/next` (the legacy project listed it but never imported it).
`package.json` has `"type": "module"`; scripts `dev: vite`, `build: tsc -b && vite build`, `preview: vite preview`.

## 4. Requirements

### 4.1 Vite config

```ts
export default defineConfig({
	plugins: [react()],
	define: {
		// @headstartwp/core reads process.env in places; give the browser an empty object.
		'process.env': '{}',
	},
});
```

### 4.2 Bootstrap (`src/main.tsx`)

```tsx
import { setHeadstartWPConfig, type HeadlessConfig } from '@headstartwp/core';
import { SettingsProvider } from '@headstartwp/core/react';

const config: HeadlessConfig = {
	sourceUrl: import.meta.env.VITE_HEADLESS_WP_URL,
	useWordPressPlugin: true,
};

setHeadstartWPConfig(config); // must run before any hook fetches

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<SettingsProvider settings={config}>
			<App />
		</SettingsProvider>
	</StrictMode>,
);
```

Legacy passed `settings={{}}` to `SettingsProvider`; pass the config so components like `LinkBlock` can
rewrite links.

### 4.3 Fetching and rendering

- `useFetchPosts({ per_page: 5 })` → `{ data, loading, error }`; render `data.posts`.
- `useFetchPost({ slug })` for a single item; render `post.content.rendered` via `<BlocksRenderer html={...} />`
  so the HTML is sanitized.
- Links: WordPress URLs in content won't be rewritten unless you provide a link component suited to your
  router (e.g. React Router `Link` + `removeSourceUrl`).

### 4.4 CORS

The browser calls WordPress directly. The WordPress site must send CORS headers allowing the SPA origin
for `/wp-json/*`. This is not needed for Next.js projects (server-side fetching) and is the most common
failure here.

## 5. Acceptance criteria

- [ ] `npm run build` succeeds (proves the ESM entry points resolve in Vite/Rollup).
- [ ] `npm run dev` lists the latest 5 posts from WordPress.
- [ ] A post's content renders through `BlocksRenderer` without `dangerouslySetInnerHTML` in app code.
- [ ] No `process is not defined` errors in the browser console.
- [ ] Network tab shows requests going to `VITE_HEADLESS_WP_URL/wp-json/...`.

## 6. Note for HeadstartWP maintainers

Removing this project removed the monorepo's only non-Next ESM consumer check. If ESM regressions become
a concern, reintroduce an equivalent check as a CI step (e.g. a scripted `vite build` of a generated app
in a temp directory) rather than a committed workspace.
