---
sidebar_position: 8
sidebar_label: querySearch
---

# querySearch

The `querySearch` function (using `queryPosts` with search parameters) is used to implement search functionality in Next.js App Router Server Components. This replaces the `useSearch` and `useSearchNative` hooks used in Pages Router.

## Usage

### Basic Search Page

```tsx title="app/search/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import Link from 'next/link';

interface SearchParams {
  q?: string;
  page?: string;
  type?: string;
}

async function query({ searchParams }: { 
  searchParams: Promise<SearchParams> 
}) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.q;
  
  if (!searchQuery) {
    return null;
  }
  
  return queryPosts({
    routeParams: {},
    params: {
      search: searchQuery,
      postType: resolvedSearchParams.type || ['post', 'page'],
      per_page: 10,
      page: parseInt(resolvedSearchParams.page || '1'),
    },
    options: {
      next: {
        revalidate: 300, // 5 minutes
        tags: ['search'],
      },
    },
  });
}

export async function generateMetadata({ searchParams }): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.q;
  
  return {
    title: searchQuery ? `Search results for "${searchQuery}"` : 'Search',
    description: searchQuery 
      ? `Search results for "${searchQuery}"` 
      : 'Search our content',
  };
}

export default async function SearchPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.q;
  
  if (!searchQuery) {
    return (
      <main>
        <h1>Search</h1>
        <SearchForm />
        <p>Enter a search term to find content.</p>
      </main>
    );
  }
  
  const result = await query({ searchParams });
  
  if (!result) {
    return (
      <main>
        <h1>Search</h1>
        <SearchForm defaultValue={searchQuery} />
        <p>Please enter a search term.</p>
      </main>
    );
  }
  
  const { data, pageInfo } = result;
  
  return (
    <main>
      <h1>Search Results for "{searchQuery}"</h1>
      <SearchForm defaultValue={searchQuery} />
      
      <div className="search-meta">
        <p>
          Found {pageInfo.totalItems} result{pageInfo.totalItems !== 1 ? 's' : ''}
          {pageInfo.totalPages > 1 && ` (page ${pageInfo.page} of ${pageInfo.totalPages})`}
        </p>
      </div>
      
      {data.posts.length === 0 ? (
        <div className="no-results">
          <p>No results found for "{searchQuery}".</p>
          <p>Try:</p>
          <ul>
            <li>Checking your spelling</li>
            <li>Using different keywords</li>
            <li>Using more general terms</li>
          </ul>
        </div>
      ) : (
        <>
          <div className="search-results">
            {data.posts.map(post => (
              <article key={post.id} className="search-result">
                <h2>
                  <Link href={post.link}>
                    {post.title.rendered}
                  </Link>
                </h2>
                
                <div className="search-meta">
                  <span className="post-type">{post.type}</span>
                  <time>{new Date(post.date).toLocaleDateString()}</time>
                </div>
                
                <div 
                  className="search-excerpt"
                  dangerouslySetInnerHTML={{ 
                    __html: post.excerpt.rendered 
                  }} 
                />
              </article>
            ))}
          </div>
          
          {/* Pagination */}
          {pageInfo.totalPages > 1 && (
            <div className="pagination">
              {pageInfo.hasPreviousPage && (
                <Link 
                  href={`/search?q=${encodeURIComponent(searchQuery)}&page=${pageInfo.page - 1}`}
                >
                  Previous
                </Link>
              )}
              
              {pageInfo.hasNextPage && (
                <Link 
                  href={`/search?q=${encodeURIComponent(searchQuery)}&page=${pageInfo.page + 1}`}
                >
                  Next
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </main>
  );
}

// Search form component
function SearchForm({ defaultValue = '' }: { defaultValue?: string }) {
  return (
    <form action="/search" method="GET" className="search-form">
      <input
        type="search"
        name="q"
        placeholder="Search..."
        defaultValue={defaultValue}
        required
      />
      <button type="submit">Search</button>
    </form>
  );
}
```

### Advanced Search with Filters

```tsx title="app/search/page.tsx"
import { queryPosts } from '@headstartwp/next/app';

interface AdvancedSearchParams {
  q?: string;
  type?: string;
  category?: string;
  author?: string;
  date_from?: string;
  date_to?: string;
  page?: string;
}

async function advancedQuery({ searchParams }: { 
  searchParams: Promise<AdvancedSearchParams> 
}) {
  const params = await searchParams;
  
  if (!params.q) return null;
  
  const queryParams: any = {
    search: params.q,
    postType: params.type || ['post', 'page'],
    per_page: 10,
    page: parseInt(params.page || '1'),
  };
  
  // Add filters
  if (params.category) {
    queryParams.category = params.category;
  }
  
  if (params.author) {
    queryParams.author = params.author;
  }
  
  if (params.date_from || params.date_to) {
    queryParams.after = params.date_from;
    queryParams.before = params.date_to;
  }
  
  return queryPosts({
    routeParams: {},
    params: queryParams,
  });
}

export default async function AdvancedSearchPage({ searchParams }) {
  const result = await advancedQuery({ searchParams });
  const params = await searchParams;
  
  return (
    <main>
      <h1>Advanced Search</h1>
      
      <AdvancedSearchForm defaultValues={params} />
      
      {result && (
        <SearchResults 
          results={result.data.posts}
          pageInfo={result.pageInfo}
          searchQuery={params.q}
        />
      )}
    </main>
  );
}

function AdvancedSearchForm({ defaultValues }: { defaultValues: any }) {
  return (
    <form action="/search" method="GET" className="advanced-search-form">
      <div className="search-field">
        <label htmlFor="q">Search terms:</label>
        <input
          type="search"
          name="q"
          id="q"
          defaultValue={defaultValues.q || ''}
          required
        />
      </div>
      
      <div className="search-field">
        <label htmlFor="type">Content type:</label>
        <select name="type" id="type" defaultValue={defaultValues.type || ''}>
          <option value="">All types</option>
          <option value="post">Posts</option>
          <option value="page">Pages</option>
        </select>
      </div>
      
      <div className="search-field">
        <label htmlFor="date_from">Date from:</label>
        <input
          type="date"
          name="date_from"
          id="date_from"
          defaultValue={defaultValues.date_from || ''}
        />
      </div>
      
      <div className="search-field">
        <label htmlFor="date_to">Date to:</label>
        <input
          type="date"
          name="date_to"
          id="date_to"
          defaultValue={defaultValues.date_to || ''}
        />
      </div>
      
      <button type="submit">Search</button>
    </form>
  );
}
```

## Live Search with Client Components

For interactive search features, you can combine Server Components with Client Components:

```tsx title="app/search/page.tsx"
import { Suspense } from 'react';
import LiveSearch from './LiveSearch';

export default function SearchPage({ searchParams }) {
  return (
    <main>
      <h1>Search</h1>
      
      <Suspense fallback={<div>Loading search...</div>}>
        <LiveSearch />
      </Suspense>
      
      {/* Server-rendered results for SEO */}
      <ServerSearchResults searchParams={searchParams} />
    </main>
  );
}

async function ServerSearchResults({ searchParams }) {
  const params = await searchParams;
  
  if (!params.q) return null;
  
  const result = await queryPosts({
    routeParams: {},
    params: {
      search: params.q,
      postType: ['post', 'page'],
    },
  });
  
  return (
    <div className="server-results">
      <h2>Results for "{params.q}"</h2>
      {result.data.posts.map(post => (
        <article key={post.id}>
          <h3>{post.title.rendered}</h3>
        </article>
      ))}
    </div>
  );
}
```

## Search with Custom Post Types

```tsx title="app/search/page.tsx"
async function searchAllContent({ searchParams }) {
  const params = await searchParams;
  const searchQuery = params.q;
  
  if (!searchQuery) return null;
  
  // Search across different post types in parallel
  const [posts, pages, products] = await Promise.allSettled([
    queryPosts({
      routeParams: {},
      params: {
        search: searchQuery,
        postType: 'post',
        per_page: 5,
      },
    }),
    queryPosts({
      routeParams: {},
      params: {
        search: searchQuery,
        postType: 'page',
        per_page: 5,
      },
    }),
    queryPosts({
      routeParams: {},
      params: {
        search: searchQuery,
        postType: 'product',
        per_page: 5,
      },
    }),
  ]);
  
  return {
    posts: posts.status === 'fulfilled' ? posts.value.data.posts : [],
    pages: pages.status === 'fulfilled' ? pages.value.data.posts : [],
    products: products.status === 'fulfilled' ? products.value.data.posts : [],
  };
}

export default async function UnifiedSearchPage({ searchParams }) {
  const results = await searchAllContent({ searchParams });
  const params = await searchParams;
  
  if (!results) {
    return <SearchForm />;
  }
  
  return (
    <main>
      <h1>Search Results for "{params.q}"</h1>
      
      {results.posts.length > 0 && (
        <section>
          <h2>Blog Posts</h2>
          {results.posts.map(post => (
            <SearchResultItem key={post.id} post={post} />
          ))}
        </section>
      )}
      
      {results.pages.length > 0 && (
        <section>
          <h2>Pages</h2>
          {results.pages.map(page => (
            <SearchResultItem key={page.id} post={page} />
          ))}
        </section>
      )}
      
      {results.products.length > 0 && (
        <section>
          <h2>Products</h2>
          {results.products.map(product => (
            <SearchResultItem key={product.id} post={product} />
          ))}
        </section>
      )}
    </main>
  );
}
```

## Performance Optimization

### Search Result Caching

```tsx
const result = await queryPosts({
  routeParams: {},
  params: {
    search: searchQuery,
    postType: ['post', 'page'],
  },
  options: {
    next: {
      revalidate: 3600, // Cache for 1 hour
      tags: ['search', `search-${searchQuery}`],
    },
  },
});
```

### Streaming Search Results

```tsx title="app/search/page.tsx"
import { Suspense } from 'react';

async function SearchResults({ searchQuery }: { searchQuery: string }) {
  const result = await queryPosts({
    routeParams: {},
    params: {
      search: searchQuery,
      postType: ['post', 'page'],
    },
  });
  
  return (
    <div>
      {result.data.posts.map(post => (
        <article key={post.id}>
          <h3>{post.title.rendered}</h3>
        </article>
      ))}
    </div>
  );
}

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const searchQuery = params.q;
  
  return (
    <main>
      <h1>Search</h1>
      <SearchForm defaultValue={searchQuery} />
      
      {searchQuery && (
        <Suspense fallback={<div>Searching...</div>}>
          <SearchResults searchQuery={searchQuery} />
        </Suspense>
      )}
    </main>
  );
}
``` 