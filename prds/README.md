# HeadstartWP Project PRDs

HeadstartWP no longer ships runnable example or starter projects. Starting with **1.8.0**, every project
that used to live under `projects/` and `test-projects/` is captured here as a **Product Requirements
Document (PRD)** written for an LLM coding agent (Claude, Cursor, Copilot, etc.) to stand up a new
project in the same fashion.

Why the change:

- Example projects drifted from the packages, needed their own dependency upgrades, and slowed CI —
  without adding anything to the published libraries.
- Teams starting a new project copy a starter and then spend days deleting what they don't need. A PRD
  describes *what* a project must do and *how HeadstartWP expects it to be wired*, so an agent can
  generate exactly the project you asked for, against the versions you're actually installing.
- The knowledge that lived in those projects (the patterns, the gotchas, the reasons behind odd-looking
  code) is preserved here in prose, where it is easier to read than in a diff.

## How to use these PRDs

1. Create an empty directory for your project (or an empty Next.js app).
2. Give your agent **two files**: [`00-foundation.md`](./00-foundation.md) (the rules every HeadstartWP
   project follows) and the one PRD below that best matches what you're building.
3. Tell the agent what's different about *your* project — your WordPress URL, custom post types, which
   routes you don't need, your styling approach. PRDs are a starting point, not a contract.
4. Ask the agent to work through the PRD's **Acceptance criteria** as its definition of done.

A prompt that works well:

```text
Read prds/00-foundation.md and prds/app-router-starter.md from the HeadstartWP repository
(https://github.com/10up/headstartwp/tree/develop/prds). Stand up a new project in this directory
that satisfies that PRD. My WordPress backend is https://cms.example.com. We have a custom post
type "event" served at /events/[slug]. We use Tailwind. Skip the related-posts demo components.
Verify each acceptance criterion before you finish and tell me which ones you could not verify.
```

If you're working inside a clone of this repo, point the agent at the local `prds/` directory instead.

## Index

| PRD | Router | What it demonstrates | Legacy source |
| --- | --- | --- | --- |
| [00-foundation.md](./00-foundation.md) | both | Shared requirements: config, middleware, preview/revalidate, env, WordPress plugin | — |
| [app-router-starter.md](./app-router-starter.md) | App | **Recommended default.** Single-site blog/pages, SEO, block rendering, streaming, ISR | `projects/wp-nextjs-app` |
| [app-router-multisite.md](./app-router-multisite.md) | App | One Next.js app serving several WordPress sites by hostname | `projects/wp-multisite-nextjs-app` |
| [app-router-polylang.md](./app-router-polylang.md) | App | Multilingual site with the Polylang integration and `[lang]` routes | `projects/wp-polylang-nextjs-app` |
| [app-router-elasticpress-search.md](./app-router-elasticpress-search.md) | App | Client-side search via `@headstartwp/epio-search` and ElasticPress.io | `test-projects/wp-nextjs-epio` |
| [universal-blocks.md](./universal-blocks.md) | App | Shared React components rendered both in Gutenberg and on the front end via `@headstartwp/block-primitives` | `test-projects/wp-nextjs-universal-blocks` + `test-projects/component-library` |
| [pages-router-starter.md](./pages-router-starter.md) | Pages | Legacy Pages Router site with hooks, SSR/SSG data fetching, Yoast, custom post types | `projects/wp-nextjs` |
| [pages-router-multisite.md](./pages-router-multisite.md) | Pages | Legacy Pages Router multisite via `_sites/[site]` rewrites | `projects/wp-multisite-nextjs` |
| [pages-router-multisite-i18n.md](./pages-router-multisite-i18n.md) | Pages | Legacy Pages Router multisite + Next.js i18n (locale per site) | `projects/wp-multisite-i18n-nextjs` |
| [vite-react-spa.md](./vite-react-spa.md) | none | Using `@headstartwp/core` outside Next.js (Vite + React SPA, ESM consumer) | `test-projects/vite-react` |

**New projects should use the App Router PRDs.** The Pages Router PRDs are kept so that teams
maintaining (or migrating off) Pages Router sites still have a reference.

## Legacy source code

The original projects were removed in 1.8.0. The last commit that contains all of them is
[`1c5d2be`](https://github.com/10up/headstartwp/tree/1c5d2be873f0b3bbab8fb99b7d7b5d07d759dbd3). Each PRD links
to its project at that commit. Agents may read that code for reference, but **the PRD is the source of
truth** — the legacy code contains demo-only shortcuts that the PRDs call out and tell you not to copy.

## Writing or updating a PRD

- Keep the same section layout (Summary → When to use → Prerequisites → Scope → Requirements →
  Acceptance criteria → Pitfalls) so agents can navigate any PRD the same way.
- Describe behavior and intent first; include code only where the exact HeadstartWP API shape matters.
- Pin to the release line, not exact versions: "latest 1.x of `@headstartwp/core` and
  `@headstartwp/next`", Next.js 15, React 18. Agents should resolve current versions at install time.
- Record the "why" behind non-obvious code. That is the knowledge that was hardest to recover from the
  old example projects.
