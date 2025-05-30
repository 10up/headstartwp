---
sidebar_position: 6
sidebar_label: queryAuthor
---

# queryAuthor

The `queryAuthor` function (or `queryPosts` with author parameters) is used to fetch author information and their posts in Next.js App Router Server Components. This replaces the `useAuthorArchive` hook used in Pages Router.

## Usage

### Basic Author Archive

```tsx title="app/author/[slug]/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import Link from 'next/link';

async function query({ params }: { params: Promise<{ slug: string }> }) {
  return queryPosts({
    routeParams: await params,
    params: {
      postType: 'post',
      author: (await params).slug,
      per_page: 12,
    },
    options: {
      next: {
        revalidate: 600, // Revalidate every 10 minutes
      },
    },
  });
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const { data } = await query({ params });
  const author = data.queriedObject?.author;
  
  return {
    title: `Posts by ${author?.name}`,
    description: `All posts written by ${author?.name}`,
  };
}

export default async function AuthorPage({ params }) {
  const { data, pageInfo } = await query({ params });
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
            <p className="author-bio">{author.description}</p>
          )}
          <p>Total posts: {pageInfo.totalItems}</p>
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
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
            <time>{new Date(post.date).toLocaleDateString()}</time>
          </article>
        ))}
      </div>
      
      {/* Pagination */}
      {pageInfo.totalPages > 1 && (
        <div className="pagination">
          {/* Add pagination controls */}
        </div>
      )}
    </main>
  );
}
```

### Author with Pagination

```tsx title="app/author/[slug]/page/[page]/page.tsx"
import { queryPosts } from '@headstartwp/next/app';

export async function generateStaticParams({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  // Get total posts for this author to calculate pages
  const { data } = await queryPosts({
    routeParams: {},
    params: {
      postType: 'post',
      author: resolvedParams.slug,
      per_page: 1,
    },
  });
  
  const totalPages = data.pageInfo.totalPages;
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function AuthorPaginationPage({ params }) {
  const resolvedParams = await params;
  const page = parseInt(resolvedParams.page);
  
  const { data } = await queryPosts({
    routeParams: await params,
    params: {
      postType: 'post',
      author: resolvedParams.slug,
      per_page: 12,
      page,
    },
  });
  
  const author = data.queriedObject?.author;
  
  return (
    <main>
      <h1>Posts by {author?.name} - Page {page}</h1>
      
      <div className="posts-grid">
        {data.posts.map(post => (
          <article key={post.id}>
            <h2>{post.title.rendered}</h2>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </article>
        ))}
      </div>
    </main>
  );
}
```

## Parameters

When using `queryPosts` for author archives:

| Parameter | Type | Description |
|-----------|------|-------------|
| `author` | `string \| number` | Author slug or ID |
| `postType` | `string` | Post type to fetch (usually 'post') |
| `per_page` | `number` | Posts per page |
| `page` | `number` | Page number for pagination |
| `orderby` | `string` | Order posts by (date, title, etc.) |
| `order` | `'asc' \| 'desc'` | Sort order |

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

## Advanced Examples

### Author with Different Post Types

```tsx title="app/author/[slug]/page.tsx"
import { queryPosts } from '@headstartwp/next/app';

export default async function AuthorPage({ params }) {
  // Fetch both posts and pages by this author
  const [postsResult, pagesResult] = await Promise.all([
    queryPosts({
      routeParams: await params,
      params: {
        postType: 'post',
        author: (await params).slug,
        per_page: 5,
      },
    }),
    queryPosts({
      routeParams: await params,
      params: {
        postType: 'page',
        author: (await params).slug,
        per_page: 5,
      },
    }),
  ]);
  
  const author = postsResult.data.queriedObject?.author;
  
  return (
    <main>
      <h1>{author?.name}</h1>
      
      <section>
        <h2>Recent Posts</h2>
        {postsResult.data.posts.map(post => (
          <article key={post.id}>
            <h3>{post.title.rendered}</h3>
          </article>
        ))}
      </section>
      
      <section>
        <h2>Pages</h2>
        {pagesResult.data.posts.map(page => (
          <article key={page.id}>
            <h3>{page.title.rendered}</h3>
          </article>
        ))}
      </section>
    </main>
  );
}
```

### Author List Page

```tsx title="app/authors/page.tsx"
import { queryUsers } from '@headstartwp/next/app';
import Link from 'next/link';

export default async function AuthorsPage() {
  // Note: This assumes there's a queryUsers function
  // If not available, you might need to fetch from API directly
  const authors = await fetch(`${process.env.NEXT_PUBLIC_HEADLESS_WP_URL}/wp-json/wp/v2/users`)
    .then(res => res.json());
  
  return (
    <main>
      <h1>All Authors</h1>
      
      <div className="authors-grid">
        {authors.map(author => (
          <div key={author.id} className="author-card">
            {author.avatar_urls?.[96] && (
              <img src={author.avatar_urls[96]} alt={author.name} />
            )}
            <h3>
              <Link href={`/author/${author.slug}`}>
                {author.name}
              </Link>
            </h3>
            {author.description && <p>{author.description}</p>}
          </div>
        ))}
      </div>
    </main>
  );
}
```

## Static Generation

### Generate Static Params for All Authors

```tsx title="app/author/[slug]/page.tsx"
export async function generateStaticParams() {
  // Fetch all authors
  const authors = await fetch(`${process.env.NEXT_PUBLIC_HEADLESS_WP_URL}/wp-json/wp/v2/users`)
    .then(res => res.json());
  
  return authors.map(author => ({
    slug: author.slug,
  }));
}
```

## Caching and Performance

### Cache Author Pages

```tsx
const { data } = await queryPosts({
  routeParams: await params,
  params: {
    postType: 'post',
    author: (await params).slug,
  },
  options: {
    next: {
      revalidate: 3600, // Revalidate every hour
      tags: ['authors', `author-${(await params).slug}`],
    },
  },
});
```

### Streaming Author Content

```tsx title="app/author/[slug]/page.tsx"
import { Suspense } from 'react';

async function AuthorPosts({ authorSlug }: { authorSlug: string }) {
  const { data } = await queryPosts({
    routeParams: {},
    params: {
      postType: 'post',
      author: authorSlug,
    },
  });
  
  return (
    <div>
      {data.posts.map(post => (
        <article key={post.id}>
          <h3>{post.title.rendered}</h3>
        </article>
      ))}
    </div>
  );
}

export default async function AuthorPage({ params }) {
  const resolvedParams = await params;
  
  return (
    <main>
      <h1>Author: {resolvedParams.slug}</h1>
      
      <Suspense fallback={<div>Loading posts...</div>}>
        <AuthorPosts authorSlug={resolvedParams.slug} />
      </Suspense>
    </main>
  );
}
``` 