---
slug: /data-fetching
sidebar_label: Introduction
sidebar_position: 0
---

# Introduction

HeadstartWP provides seamless data-fetching for Next.js App Router using modern async/await patterns. Unlike the Pages Router which uses React hooks, the App Router leverages Server Components for efficient server-side data fetching.

The data-fetching logic is powered by [strategies](/api/classes/headstartwp_core.AbstractFetchStrategy/) and provides first-class support for Next.js App Router features like:

- **Server Components** - Fetch data directly on the server
- **Streaming** - Progressive loading with Suspense boundaries  
- **Revalidation** - Built-in ISR and on-demand revalidation
- **Caching** - Automatic request deduplication and caching

## App Router Data Fetching

The `@headstartwp/next/app` package provides async functions specifically designed for Next.js App Router:

- `queryPost()` - Fetch a single post or page
- `queryPosts()` - Fetch multiple posts with pagination
- `queryTerms()` - Fetch categories, tags, or custom taxonomies
- `queryAuthor()` - Fetch author information and posts

These functions automatically:
- Extract URL segments from route parameters
- Handle WordPress pretty permalinks
- Provide TypeScript support
- Integrate with Next.js caching and revalidation

## Basic Example

Here's how to fetch a page in an App Router Server Component:

```tsx title="app/about/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import type { Metadata } from 'next';

async function query({ params }) {
  return queryPost({
    routeParams: await params,
    params: {
      slug: 'about',
      postType: 'page',
    },
    options: {
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    },
  });
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { seo } = await query({ params });
  return seo.metadata;
}

export default async function AboutPage({ params }) {
  const { data, seo } = await query({ params });
  
  return (
    <main>
      <h1>{data.post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.post.content.rendered }} />
    </main>
  );
}
```

## Dynamic Routes

For dynamic routes like `[...path]`, HeadstartWP automatically extracts URL segments:

```tsx title="app/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';

export default async function DynamicPage({ params }) {
  // URL segments are automatically parsed from params
  const { data } = await queryPost({
    routeParams: await params,
    params: {
      postType: ['post', 'page'],
    },
  });
  
  return (
    <article>
      <h1>{data.post.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: data.post.content.rendered }} />
    </article>
  );
}
```

## Client Components

For Client Components that need reactive data or user interactions, you can still use the React hooks from `@headstartwp/core/react`:

```tsx title="components/InteractivePost.tsx"
'use client';

import { useFetchPost } from '@headstartwp/core/react';

export function InteractivePost({ slug }: { slug: string }) {
  const { data, loading, error } = useFetchPost({ 
    slug, 
    postType: 'post' 
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading post</div>;

  return (
    <article>
      <h1>{data.post.title.rendered}</h1>
      {/* Interactive features here */}
    </article>
  );
}
```

## What's Different from Pages Router?

| Pages Router | App Router |
|--------------|------------|
| `usePost()` hook | `queryPost()` async function |
| Client-side rendering by default | Server-side rendering by default |
| `getStaticProps`/`getServerSideProps` | Direct async/await in components |
| Manual ISR configuration | Built-in `revalidate` options |
| `useSWR` for client-side caching | Automatic request deduplication |

> The remaining sections in this documentation will focus on the App Router async functions. For React hooks usage in Client Components, refer to the [core documentation](/api/modules/headstartwp_core_react/).