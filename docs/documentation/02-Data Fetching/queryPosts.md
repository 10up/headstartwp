---
sidebar_position: 2
sidebar_label: queryPosts
slug: /data-fetching/query-posts
---

# queryPosts

The `queryPosts` function is used to fetch multiple posts, pages, or custom post types in Next.js App Router Server Components. It's the async/await equivalent of the `usePosts` hook used in Pages Router.

## Usage

### Basic Example

```tsx title="app/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import Link from 'next/link';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

export default async function HomePage({ params }: HeadstartWPRoute) {
  const { data } = await queryPosts({
    routeParams: await params,
    params: {
      postType: 'post',
      per_page: 4,
    },
  });
  
  return (
    <main>
      <h1>Welcome to Our Site</h1>
      
      <section>
        <h2>Latest Posts</h2>
        <div className="posts-grid">
          {data.posts.map(post => (
            <article key={post.id}>
              <h3>
                <Link href={post.link}>
                  {post.title.rendered}
                </Link>
              </h3>
              <SafeHtml html={post.excerpt.rendered} />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
```

### Dynamic Archive Routes

For catch-all routes like `[...path]`, HeadstartWP automatically extracts the category, page, or other archive parameters from the URL structure and applies the appropriate filters.

```tsx title="app/[...path]/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

export default async function CategoryArchivePage({ params }: HeadstartWPRoute) {
  const { data } = await queryPosts({
    routeParams: await params,
    params: {
      postType: 'post',
      per_page: 12,
    },
  });
  
  return (
    <main>
      <h1>{data.queriedObject?.name || 'Category Archive'}</h1>
      
      {data.posts.map(post => (
        <article key={post.id}>
          <h2>{post.title.rendered}</h2>
          <SafeHtml html={post.excerpt.rendered} />
        </article>
      ))}

        {/* Pagination */}
        <div className="pagination">
          {data.pageInfo.hasPreviousPage && (
            <Link href={`/${data.queriedObject.term.slug}/page=${pageInfo.page - 1}`}>
              Previous
            </Link>
          )}
          {data.pageInfo.hasNextPage && (
            <Link href={`/${data.queriedObject.term.slug}/page=${pageInfo.page + 1}`}>
              Next
            </Link>
          )}
        </div>
    </main>
  );
}
```

## Parameters

### Function Signature

```typescript
queryPosts({
  routeParams,
  params,
  options?
}): Promise<{
  data: { 
    posts: PostEntity[],
    queriedObject?: QueriedObject,
    pageInfo: PageInfo
  },
  config: HeadlessConfig
}>
```

### routeParams

The route parameters from Next.js App Router. Must be awaited since Next.js 15+.

```tsx
const { data } = await queryPosts({
  routeParams: await params, // Always await params
  // ...
});
```

### params

The query parameters for fetching posts:

| Parameter | Type | Description |
|-----------|------|-------------|
| `postType` | `string \| string[]` | Post type(s) to fetch |
| `per_page` | `number` | Number of posts per page (default: 10) |
| `page` | `number` | Page number for pagination |
| `category` | `string \| number` | Category slug or ID |
| `tag` | `string \| number` | Tag slug or ID |
| `author` | `string \| number` | Author slug or ID |
| `search` | `string` | Search term |
| `orderby` | `string` | Order posts by (date, title, etc.) |
| `order` | `'asc' \| 'desc'` | Sort order |
| `meta_query` | `object` | Custom field queries |
| `tax_query` | `object` | Taxonomy queries |

### options

Next.js App Router specific options:

```tsx
const { data } = await queryPosts({
  routeParams: await params,
  params: { postType: 'post' },
  options: {
    next: {
      revalidate: 600, // Revalidate every 10 minutes
      tags: ['posts', 'blog'], // Cache tags
    },
    cache: 'force-cache', // Cache strategy
  },
});
```

## Return Value

### data.posts

Array of post objects. 

### data.queriedObject

When fetching posts by category, tag, or author, contains information about the queried term or author.

### data.pageInfo

Pagination information:

```typescript
interface PageInfo {
  page: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
```

## Advanced Examples

### Custom Post Type Archive

To use custom post types with `queryPosts`, you must first register them in your `headstartwp.config.js` file. See the [custom post types configuration](/learn/app-router/getting-started/headless-config#customposttypes) for detailed setup instructions.

```tsx title="app/products/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

export default async function ProductsPage({ params }: HeadstartWPRoute) {
  const { data } = await queryPosts({
    routeParams: await params,
    params: {
      postType: 'product',
      per_page: 12,
      orderby: 'menu_order',
      order: 'asc',
      meta_query: [
        {
          key: 'featured',
          value: 'yes',
          compare: '=',
        },
      ],
    },
  });
  
  return (
    <main>
      <h1>Featured Products</h1>
      
      <div className="products-grid">
        {data.posts.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.title.rendered}</h3>
            <SafeHtml html={product.excerpt.rendered} />
          </div>
        ))}
      </div>
    </main>
  );
}
```

## Static Generation

### Generate Static Params for Pagination

```tsx title="app/blog/[...path]/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

export async function generateStaticParams() {
  // Get total number of posts to calculate pages
  const { data } = await queryPosts({
    routeParams: {},
    params: {
      postType: 'post',
      per_page: 1, // Just to get total count
    },
  });
  
  const totalPages = data.pageInfo.totalPages;
  const pages = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
  
  return pages;
}

export default async function BlogPaginationPage({ params }: HeadstartWPRoute) {
  const { data } = await queryPosts({
    routeParams: await params,
    params: {
      postType: 'post',
      per_page: 10,
    },
  });
  
  return (
    <main>
      <h1>Blog Posts - Page {data.pageInfo.page}</h1>
      {/* Render posts */}
    </main>
  );
}
```

## Caching and Performance

### Cache Tags for Revalidation

```tsx
const { data } = await queryPosts({
  routeParams: await params,
  params: { postType: 'post' },
  options: {
    next: {
      tags: ['posts', 'blog-archive'],
    },
  },
});

// Revalidate from API route
// app/api/revalidate/route.ts
import { revalidateTag } from 'next/cache';

export async function POST() {
  revalidateTag('posts');
  return Response.json({ revalidated: true });
}
```

### Streaming with Suspense

```tsx title="app/blog/page.tsx"
import { Suspense } from 'react';
import { queryPosts } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

async function PostsList() {
  const { data } = await queryPosts({
    routeParams: {},
    params: { postType: 'post' },
  });
  
  return (
    <div>
      {data.posts.map(post => (
        <article key={post.id}>
          <h2>{post.title.rendered}</h2>
          <SafeHtml html={post.excerpt.rendered} />
        </article>
      ))}
    </div>
  );
}

export default function BlogPage() {
  return (
    <main>
      <h1>Blog</h1>
      <Suspense fallback={<div>Loading posts...</div>}>
        <PostsList />
      </Suspense>
    </main>
  );
}
``` 