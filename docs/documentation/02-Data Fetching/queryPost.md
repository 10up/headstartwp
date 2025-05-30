---
sidebar_position: 4
sidebar_label: queryPost
---

# queryPost

The `queryPost` function is used to fetch a single post, page, or custom post type in Next.js App Router Server Components. It's the async/await equivalent of the `usePost` hook used in Pages Router.

## Usage

### Basic Example

```tsx title="app/about/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import type { Metadata } from 'next';

async function query({ params }: { params: Promise<{ slug?: string }> }) {
  return queryPost({
    routeParams: await params,
    params: {
      slug: 'about',
      postType: 'page',
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

### Dynamic Routes

For catch-all routes like `[...path]`, HeadstartWP automatically extracts the slug from the URL:

```tsx title="app/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';

export default async function DynamicPage({ params }) {
  const { data } = await queryPost({
    routeParams: await params,
    params: {
      postType: ['post', 'page'], // Try both post types
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

The post object containing:

- `title.rendered` - Post title
- `content.rendered` - Post content 
- `excerpt.rendered` - Post excerpt
- `date` - Publication date
- `modified` - Last modified date
- `slug` - Post slug
- `link` - Post permalink
- `terms` - Associated taxonomies
- `author` - Author information
- `featured_media` - Featured image

### seo

SEO data compatible with Next.js metadata:

```tsx
export async function generateMetadata({ params }): Promise<Metadata> {
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

## Error Handling

```tsx
import { notFound } from 'next/navigation';

export default async function PostPage({ params }) {
  try {
    const { data } = await queryPost({
      routeParams: await params,
      params: { postType: 'post' },
    });
    
    return (
      <article>
        <h1>{data.post.title.rendered}</h1>
        {/* ... */}
      </article>
    );
  } catch (error) {
    // Handle 404s gracefully
    if (error.status === 404) {
      notFound();
    }
    throw error;
  }
}
```

## TypeScript Support

```tsx
import type { PostEntity } from '@headstartwp/core';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { data }: { data: { post: PostEntity } } = await queryPost({
    routeParams: await params,
    params: { postType: 'post' },
  });
  
  // TypeScript knows the shape of data.post
  return <h1>{data.post.title.rendered}</h1>;
}
``` 