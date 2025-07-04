---
sidebar_position: 4
sidebar_label: querySearch
slug: /data-fetching/query-search
---

# querySearch

The `querySearch` function is used to implement search functionality in Next.js App Router Server Components. It provides a dedicated search API that can search across posts, pages, and other content types.

## Usage

### Basic Search Implementation

```tsx title="app/search/[[...path]]/page.tsx"
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { querySearch } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import Link from 'next/link';

async function query({ params }: HeadstartWPRoute) {
  return querySearch({
    routeParams: await params,
  });
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
  const {
    seo: { metadata },
    isMainQuery,
  } = await query({ params });

  if (isMainQuery) {
    return metadata;
  }

  // If this is not the main query, nothing is being searched on, so build up the metadata manually
  return {
    ...metadata,
    title: 'Search Page',
  };
}

const Search = async ({ params }: HeadstartWPRoute) => {
  const { data } = await query({ params });

  if (data.pageInfo.totalItems === 0) {
    return 'Nothing found';
  }

  return (
    <>
      <h1>Search Results</h1>
      <ul>
        {data.searchResults.map((item) => (
          <li key={item.id}>
            <Link href={item.url}>
              {item.id} - {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Search;
```

## API Reference

### Parameters

The `querySearch` function accepts the following parameters:

```tsx
type SearchQueryProps<T, P> = NextQueryProps<P> & {
  fetchStrategy?: SearchNativeFetchStrategy<T, P>;
};
```

- **`routeParams`**: Route parameters for the current page
- **`params`**: Search parameters including:
  - `search`: The search query string
  - `postType`: Post types to search (e.g., `['post', 'page']`)
  - `per_page`: Number of results per page
  - `page`: Current page number
  - Additional WordPress REST API parameters
- **`options`**: Next.js specific options for caching and revalidation
- **`fetchStrategy`**: Optional custom fetch strategy for search

### Return Value

```tsx
{
  data: {
    searchResults: SearchResultItem[],
    pageInfo: {
      totalItems: number,
      totalPages: number,
      page: number,
      hasNextPage: boolean,
      hasPreviousPage: boolean,
    },
    // ... other search result data
  },
  config: HeadlessConfig,
  seo: SEOMetadata,
  isMainQuery: boolean,
}
```
