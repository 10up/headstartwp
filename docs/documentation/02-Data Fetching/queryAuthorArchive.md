---
sidebar_position: 6
sidebar_label: queryAuthorArchive
slug: /data-fetching/query-author-archive
---

# queryAuthorArchive

The `queryAuthorArchive` function is used to fetch author information and their posts in Next.js App Router Server Components. This replaces the `useAuthorArchive` hook used in Pages Router.

## Usage

### Basic Author Archive

```tsx title="app/author/[...path]/page.tsx"
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { JSONLD, queryAuthorArchive } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import Link from 'next/link';
import { SafeHtml } from '@headstartwp/core/react';

async function query({ params }: HeadstartWPRoute) {
  return queryAuthorArchive({
    routeParams: await params,
    options: {
      next: {
        revalidate: 600, // Revalidate every 10 minutes
      },
    },
  });
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
  const {
    seo: { metadata },
  } = await query({ params });

  return metadata;
}

export default async function AuthorPage({ params }: HeadstartWPRoute) {
  const { data, seo } = await query({ params });
  const author = data.queriedObject?.author;
  
  if (!author) {
    return <div>Author not found</div>;
  }
  
  return (
    <main>
      <div className="author-header">
        {author.avatar_urls?.[96] && (
          <img 
            src={author.avatar_urls[96]} 
            alt={author.name}
            className="author-avatar"
          />
        )}
        <div>
          <h1>Posts by {author.name}</h1>
          {author.description && (
            <div className="author-bio">
              <SafeHtml html={author.description} />
            </div>
          )}
          <p>Total posts: {data.pageInfo.totalItems}</p>
        </div>
      </div>
      
      <div className="posts-grid">
        {data.posts.map(post => (
          <article key={post.id}>
            <h2>
              <Link href={post.link}>
                {post.title.rendered}
              </Link>
            </h2>
            <SafeHtml html={post.excerpt.rendered} />
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </article>
        ))}
      </div>
      
      {seo?.schema && <JSONLD schema={seo.schema} />}
    </main>
  );
}
```

The `[...path]` catch-all route automatically handles pagination. When users navigate to `/author/john-doe/page/2`, the routing system will include the pagination information in the route parameters.

## Parameters

When using `queryAuthorArchive` with catch-all routes (`[...path]`), the routing information is automatically extracted from the route parameters. You can still override specific parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `routeParams` | `Promise<{path: string[]}>` | Route parameters (automatically handled) |
| `per_page` | `number` | Posts per page |
| `page` | `number` | Page number for pagination |
| `orderby` | `string` | Order posts by (date, title, etc.) |
| `order` | `'asc' \| 'desc'` | Sort order |
| `fetchStrategy` | `AuthorArchiveFetchStrategy` | Optional custom fetch strategy |

## Return Value

### data.posts

Array of posts by the author.

### data.queriedObject.author

Author information including:

- `id` - Author ID
- `name` - Author display name
- `slug` - Author slug
- `description` - Author bio/description
- `avatar_urls` - Avatar images in different sizes
- `link` - Author archive URL
- `url` - Author website URL

### data.pageInfo

Pagination information for the author's posts.

### seo

SEO metadata for the author archive page.

### config

The HeadlessConfig used for the query.