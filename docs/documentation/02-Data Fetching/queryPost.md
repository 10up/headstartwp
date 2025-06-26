---
sidebar_position: 1
sidebar_label: queryPost
slug: /data-fetching/query-post
---

# queryPost

The `queryPost` function is used to fetch a single post, page, or custom post type in Next.js App Router Server Components. It's the async/await equivalent of the `usePost` hook used in Pages Router.

## Usage

### Basic Example

```tsx title="app/about/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

async function query({ params }: HeadstartWPRoute) {
  return queryPost({
    routeParams: await params,
    params: {
      slug: 'about',
      postType: 'page',
    },
  });
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
  const { seo } = await query({ params });
  return seo.metadata;
}

export default async function AboutPage({ params }: HeadstartWPRoute) {
  const { data, seo } = await query({ params });
  
  return (
    <main>
      <h1>{data.post.title.rendered}</h1>
      <SafeHtml html={data.post.content.rendered} />
    </main>
  );
}
```

### Dynamic Routes

For catch-all routes like `[...path]`, HeadstartWP automatically extracts the slug from the URL:

```tsx title="app/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

export default async function DynamicPage({ params }: HeadstartWPRoute) {
  const { data } = await queryPost({
    routeParams: await params,
    params: {
      postType: ['post', 'page'], // Try both post types
    },
  });
  
  return (
    <article>
      <h1>{data.post.title.rendered}</h1>
      <SafeHtml html={data.post.content.rendered} />
    </article>
  );
}
```

## Parameters

### Function Signature

```typescript
queryPost({
  routeParams,
  params,
  options?
}): Promise<{
  data: { post: PostEntity },
  seo: { metadata: Metadata, schema?: any },
  config: HeadlessConfig
}>
```

### routeParams

The route parameters from Next.js App Router. Must be awaited since Next.js 15+.

```tsx
const { data } = await queryPost({
  routeParams: await params, // Always await params
  // ...
});
```

### params

The query parameters for fetching the post:

| Parameter | Type | Description |
|-----------|------|-------------|
| `slug` | `string` | Post slug (auto-extracted if not provided) |
| `postType` | `string \| string[]` | Post type(s) to search |
| `id` | `number` | Post ID (alternative to slug) |
| `author` | `string` | Author slug or ID |
| `search` | `string` | Search term |

### options

Next.js App Router specific options:

```tsx
const { data } = await queryPost({
  routeParams: await params,
  params: { slug: 'about', postType: 'page' },
  options: {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['posts', 'about'], // Cache tags for on-demand revalidation
    },
    cache: 'force-cache', // Cache strategy
  },
});
```

## Return Value

### data.post

The post object.

### seo

SEO data compatible with Next.js metadata:

```tsx
export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
  const { seo } = await queryPost({
    routeParams: await params,
    params: { postType: 'page' },
  });
  
  return seo.metadata; // Contains title, description, openGraph, etc.
}
```

## Caching and Revalidation

### Static Generation

```tsx
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const { data } = await queryPosts({
    routeParams: {},
    params: { postType: 'post' },
  });
  
  return data.posts.map(post => ({
    slug: post.slug,
  }));
}
```

### Incremental Static Regeneration

```tsx
const { data } = await queryPost({
  routeParams: await params,
  params: { postType: 'post' },
  options: {
    next: {
      revalidate: 60, // Revalidate every minute
    },
  },
});
```

### On-Demand Revalidation

```tsx
// Tag your queries
const { data } = await queryPost({
  routeParams: await params,
  params: { id: 123 },
  options: {
    next: {
      tags: ['post-123'],
    },
  },
});

// Then revalidate from API route
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  revalidateTag('post-123');
  return Response.json({ revalidated: true });
}
```