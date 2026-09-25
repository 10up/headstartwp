---
sidebar_label: Quick Setup
slug: /getting-started/quick-setup
sidebar_position: 0
---

# Quick Setup

If you're new to Next.js App Router, we recommend reviewing [Next.js App Router docs](https://nextjs.org/docs/app).

## System Requirements

- Node.js 24 or later
- npm 11 or later
- WordPress with the [HeadstartWP plugin](/learn/getting-started/installing-wordpress-plugin) installed
- Next.js 15 and React 18 (HeadstartWP 1.x)

## Installation

HeadstartWP does not ship a starter project. Instead, the repository contains [PRDs](https://github.com/10up/headstartwp/blob/develop/prds/README.md)
(product requirement documents) written for LLM coding agents such as Claude, Cursor or Copilot. Each PRD
describes a complete project — its routes, configuration, and acceptance criteria — and the agent
generates it for you against the package versions you're installing.

1. Create an empty directory for your project.
2. Give your agent [`00-foundation.md`](https://github.com/10up/headstartwp/blob/develop/prds/00-foundation.md) and the PRD that fits what you're building.
   Most new projects should use the [App Router starter PRD](https://github.com/10up/headstartwp/blob/develop/prds/app-router-starter.md).
3. Describe what's specific to your project. For example:

```text
Read prds/00-foundation.md and prds/app-router-starter.md from
https://github.com/10up/headstartwp/tree/develop/prds and stand up a new HeadstartWP project in this
directory. My WordPress backend is https://cms.example.com. We use Tailwind. Verify each acceptance
criterion before you finish and tell me which ones you could not verify.
```

4. Run `npm run dev` and open http://localhost:3000.

Other PRDs cover [multisite](https://github.com/10up/headstartwp/blob/develop/prds/app-router-multisite.md), [Polylang](https://github.com/10up/headstartwp/blob/develop/prds/app-router-polylang.md),
[ElasticPress search](https://github.com/10up/headstartwp/blob/develop/prds/app-router-elasticpress-search.md),
[universal blocks](https://github.com/10up/headstartwp/blob/develop/prds/universal-blocks.md), and legacy Pages Router setups.

If you'd rather wire things up by hand, see [Setting up manually](/learn/getting-started/setting-up-manually).

### Project Structure

A project generated from the App Router starter PRD follows Next.js App Router conventions:

```
src/
├── app/
│   ├── layout.tsx              # Root layout (settings, menu, block styles)
│   ├── page.tsx                # Home page
│   ├── not-found.tsx           # 404 page
│   ├── (single)/[...path]/     # Posts and pages by permalink
│   ├── blog/[[...path]]/       # Blog archive + single posts
│   ├── category/[...path]/     # Category archive
│   ├── tag/[...path]/          # Tag archive
│   ├── author/[...path]/       # Author archive
│   ├── search/[[...path]]/     # Search results
│   └── api/                    # preview + revalidate route handlers
├── components/
│   └── Blocks.tsx              # Gutenberg blocks renderer
└── middleware.ts
```

### Environment Variables

Set `NEXT_PUBLIC_HEADLESS_WP_URL` to your WordPress URL (in `.env`, or `.env.local` for local overrides).

If you're developing locally and using HTTPS with WordPress and you don't have valid certs, you will need to add `NODE_TLS_REJECT_UNAUTHORIZED=0` as an env variable in `.env.local`:

```
NEXT_PUBLIC_HEADLESS_WP_URL=https://wordpress.test
NODE_TLS_REJECT_UNAUTHORIZED=0
```

### Key Differences from Pages Router

- **File-based routing**: Routes are defined in the `app/` directory
- **Server Components**: Components are server-rendered by default
- **Layouts**: Shared UI between routes using `layout.tsx`
- **Loading & Error states**: Special `loading.tsx` and `error.tsx` files
- **Async components**: Direct data fetching in Server Components

## Something Missing?

If something is missing in the documentation or if you found some part confusing, please file an [issue](https://github.com/10up/headstartwp/issues) for the documentation repository with your suggestions for improvement.