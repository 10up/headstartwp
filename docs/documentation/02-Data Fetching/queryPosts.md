---
sidebar_position: 5
sidebar_label: queryPosts
---

# queryPosts

The `queryPosts` function is used to fetch multiple posts, pages, or custom post types in Next.js App Router Server Components. It's the async/await equivalent of the `usePosts` hook used in Pages Router.

## Usage

### Basic Example

```tsx title="app/blog/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import Link from 'next/link';

async function query({ params, searchParams }: { 
  params: Promise<any>, 
  searchParams: Promise<{ page?: string }> 
}) {
  const resolvedSearchParams = await searchParams;
  
  return queryPosts({
    routeParams: await params,
    params: {
      postType: 'post',
      per_page: 10,
      page: parseInt(resolvedSearchParams.page || '1'),
    },
    options: {
      next: {
        revalidate: 300, // Revalidate every 5 minutes
      },
    },
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog Posts',
    description: 'Latest blog posts from our website',
  };
}

export default async function BlogPage({ params, searchParams }) {
  const { data, pageInfo } = await query({ params, searchParams });
  
  return (
    <main>
      <h1>Blog Posts</h1>
      
      <div className="posts-grid">
        {data.posts.map(post => (
          <article key={post.id}>
            <h2>
              <Link href={post.link}>
                {post.title.rendered}
              </Link>
            </h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </article>
        ))}
      </div>
      
      {/* Pagination */}
      <div className="pagination">
        {pageInfo.hasPreviousPage && (
          <Link href={`?page=${pageInfo.page - 1}`}>
            Previous
          </Link>
        )}
        {pageInfo.hasNextPage && (
          <Link href={`?page=${pageInfo.page + 1}`}>
            Next
          </Link>
        )}
      </div>
    </main>
  );
}
```

### Category Archive

```tsx title="app/category/[slug]/page.tsx"
import { queryPosts } from '@headstartwp/next/app';

export default async function CategoryPage({ params }) {
  const { data } = await queryPosts({
    routeParams: await params,
    params: {
      postType: 'post',
      category: (await params).slug,
      per_page: 12,
    },
  });
  
  return (
    <main>
      <h1>Category: {data.queriedObject?.name}</h1>
      
      {data.posts.map(post => (
        <article key={post.id}>
          <h2>{post.title.rendered}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </article>
      ))}
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
    queriedObject?: TermEntity | AuthorEntity,
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

Array of post objects, each containing:

- `id` - Post ID
- `title.rendered` - Post title
- `content.rendered` - Post content
- `excerpt.rendered` - Post excerpt
- `date` - Publication date
- `slug` - Post slug
- `link` - Post permalink
- `terms` - Associated taxonomies
- `author` - Author information
- `featured_media` - Featured image

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

### Search Results

```tsx title="app/search/page.tsx"
import { queryPosts } from '@headstartwp/next/app';

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q;
  
  if (!query) {
    return <div>Please enter a search term</div>;
  }
  
  const { data } = await queryPosts({
    routeParams: {},
    params: {
      postType: ['post', 'page'],
      search: query,
      per_page: 20,
    },
  });
  
  return (
    <main>
      <h1>Search Results for "{query}"</h1>
      
      {data.posts.length === 0 ? (
        <p>No results found</p>
      ) : (
        data.posts.map(post => (
          <article key={post.id}>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </article>
        ))
      )}
    </main>
  );
}
```

### Custom Post Type Archive

```tsx title="app/products/page.tsx"
import { queryPosts } from '@headstartwp/next/app';

export default async function ProductsPage({ params }) {
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
            <div dangerouslySetInnerHTML={{ __html: product.excerpt.rendered }} />
          </div>
        ))}
      </div>
    </main>
  );
}
```

## Static Generation

### Generate Static Params for Pagination

```tsx title="app/blog/page/[page]/page.tsx"
import { queryPosts } from '@headstartwp/next/app';

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

export default async function BlogPaginationPage({ params }) {
  const resolvedParams = await params;
  const page = parseInt(resolvedParams.page);
  
  const { data } = await queryPosts({
    routeParams: await params,
    params: {
      postType: 'post',
      per_page: 10,
      page,
    },
  });
  
  return (
    <main>
      <h1>Blog Posts - Page {page}</h1>
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