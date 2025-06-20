---
sidebar_label: Quick Setup
slug: /getting-started/quick-setup
sidebar_position: 0
---

# Quick Setup

If you're new to Next.js App Router, we recommend reviewing [Next.js App Router docs](https://nextjs.org/docs/app).

## System Requirements

- Node.js 18 or later
- NPM >= 7
- WordPress >= 5.9 (prior versions might work but haven't been tested)
- Next.js 13.4+ (for stable App Router features)

## Installation

The easiest way to get started with HeadstartWP and App Router is by using `create-next-app` with the official App Router starter project.

```bash
npx create-next-app --use-npm -e https://github.com/10up/headstartwp/tree/trunk/projects/wp-nextjs-app
```

Then run `npm run dev` and open http://localhost:3000 in your browser.

### Project Structure

The starter project follows Next.js App Router conventions:

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── not-found.tsx       # 404 page
│   ├── (single)/           # Route group for posts/pages
│   │   └── [...path]/
│   │       └── page.tsx    # Dynamic catch-all route
│   ├── blog/
│   │   └── page.tsx        # Blog archive
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx    # Category archive
│   └── globals.css
├── components/
│   ├── Blocks.tsx          # Gutenberg blocks renderer
│   └── ...
└── middleware.ts           # middleware
```

### Environment Variables

By default, the starter project will point to `js1.10up.com`. Either change the 
`NEXT_PUBLIC_HEADLESS_WP_URL` variable or create a `.env.local` file to override the default env variables.

If you're developing locally and using HTTPS with WordPress and you don't have valid certs, you will need to add `NODE_TLS_REJECT_UNAUTHORIZED=0` as an env variable

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