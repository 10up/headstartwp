# PRD — App Router + ElasticPress.io Search

> Legacy source: [`test-projects/wp-nextjs-epio`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3/test-projects/wp-nextjs-epio)
> Requires: [00-foundation.md](./00-foundation.md). Builds on [app-router-starter.md](./app-router-starter.md).
> Package: [`@headstartwp/epio-search`](../packages/epio-search/README.md)

## 1. Summary

The App Router starter plus **instant, client-side search** powered by ElasticPress.io using
`@headstartwp/epio-search`. The browser queries the ElasticPress.io endpoint directly (not WordPress), so
autosuggest is fast and doesn't load the WordPress origin. The native `/search/<term>` route (WordPress
search via `querySearch`) stays as the no-JS / deep-link fallback.

The legacy project was a test harness for the package; this PRD turns it into a usable feature spec.

## 2. When to use

- The WordPress site already runs ElasticPress backed by ElasticPress.io.
- You need autosuggest, as-you-type results, or faceted/sorted search beyond WP's native search.

## 3. Prerequisites

- ElasticPress plugin connected to an ElasticPress.io instance, content synced.
- The ElasticPress.io **node URL** and **index name** for the posts index (e.g. `<prefix>-post-1`).
- If using search templates (`template_name`), the template must be saved in ElasticPress.io.

## 4. Additional dependency and env

```bash
npm install @headstartwp/epio-search
```

Peer deps: `react`/`react-dom` ≥ 18. The package ships CSS Modules for its components — no extra CSS
import is required.

```
NEXT_PUBLIC_EP_NODE=https://<instance>.clients.hosted-elasticpress.io
NEXT_PUBLIC_EP_INDEX=<prefix>-post-1
```

These are public by design (the browser calls them). Never expose an ElasticPress admin/write credential.
The legacy project hard-coded a staging node and index in a component — don't.

## 5. Requirements

### 5.1 Everything from the starter

All routes, layout, blocks, SEO, preview and revalidate from [app-router-starter.md](./app-router-starter.md).

### 5.2 Provider placement

`ElasticPressProvider` and every epio component are **client components** (the package marks them
`'use client'`). Server components can render them as children but cannot pass function props
(`onNavigation`, `onSearch`, `onSSR`) across the boundary. So:

- Create `components/SearchProvider.tsx` with `'use client'` that renders
  `<ElasticPressProvider node={...} indexName={...} loadInitialData={false} onNavigation={...}>`
  and accepts `children`.
- `onNavigation(result)` fires when a user picks a suggestion — use `useRouter().push()` to the result's
  front-end path (run the result URL through `removeSourceUrl`). The legacy project only `console.log`ged it.
- Mount the provider where search should be available. Legacy mounted it on the home page only; a real
  site usually mounts it in the root layout around the header so search is global.

### 5.3 Header search

`components/SearchHeader.tsx` (client) renders `<AutosuggestField />` inside the provider. Pressing Enter
with no suggestion selected should navigate to `/search/<term>` so the server-rendered fallback page is used.

### 5.4 Full results page (optional)

A client section using `<SearchField />` + `<Posts />`, or the `useSearch()` hook for custom UI.
`useSearch()` returns `{ refine, search, results, loadMore, setOrderBy, setOrder, setPerPage, setTemplateName }`.
`refine(term)` ignores terms shorter than 3 characters by default (`minSearchCharacters`).

### 5.5 Legacy-only bits to drop

- A `<script src="//unpkg.com/react-scan/...">` tag in the root layout (a render-profiling tool used while
  developing the package). Never ship it.
- `PreviewIndicator` commented out in the layout — keep it enabled as in the starter.
- A `SearchIt` component that called `setTemplateName('testing-postman')` **during render**. Setting search
  state during render causes re-render loops; call it in an effect or event handler.
- Home page queried `slug: 'home'`; resolve the front page from app settings as in the starter.
- `package.json` referenced the package as `"file:../epio-search"` (monorepo-relative). Use the npm version.

## 6. Acceptance criteria

Foundation §7 and starter §7, plus:

- [ ] Typing ≥ 3 characters in the header shows suggestions within ~300 ms, fetched from the ElasticPress.io
      node (visible in the browser network tab), not from WordPress.
- [ ] Selecting a suggestion navigates client-side to the post's front-end URL.
- [ ] Enter without a selection navigates to `/search/<term>`, which renders server-side WordPress results.
- [ ] The build succeeds with no function props passed from a Server Component to an epio component.
- [ ] Node URL and index come from env vars; nothing ElasticPress-specific is hard-coded.
- [ ] Missing env vars fail loudly (the provider throws "You must specify an ElasticSearch node" /
      "…an indexName") rather than rendering a broken field silently — surface this in dev with a clear message.
