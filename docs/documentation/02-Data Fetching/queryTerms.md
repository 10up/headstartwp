---
sidebar_position: 5
sidebar_label: queryTerms
slug: /data-fetching/query-terms
---

# queryTerms

The `queryTerms` function is used to fetch taxonomy terms (categories, tags, custom taxonomies) in Next.js App Router Server Components. This replaces the `useTerms` hook used in Pages Router.

## Usage

### Basic Categories List

```tsx title="app/categories/page.tsx"
import { queryTerms } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { HeadstartWPRoute } from '@headstartwp/next/app';

async function query() {
  return queryTerms({
    routeParams: {},
    params: {
      taxonomy: 'category',
      per_page: 50,
      orderby: 'count',
      order: 'desc',
    },
    options: {
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    },
  });
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Categories',
    description: 'Browse all post categories',
  };
}

export default async function CategoriesPage({ params }: HeadstartWPRoute) {
  const { data } = await query();
  
  return (
    <main>
      <h1>Categories</h1>
      
      <div className="categories-grid">
        {data.terms.map(category => (
          <div key={category.id} className="category-card">
            <h3>
              <Link href={`/category/${category.slug}`}>
                {category.name}
              </Link>
            </h3>
            
            {category.description && (
              <p>{category.description}</p>
            )}
            
            <div className="category-meta">
              <span>{category.count} posts</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
```

### Tags Cloud

```tsx title="app/tags/page.tsx"
import { queryTerms } from '@headstartwp/next/app';
import type { HeadstartWPRoute } from '@headstartwp/next/app';

export default async function TagsPage({ params }: HeadstartWPRoute) {
  const { data } = await queryTerms({
    routeParams: {},
    params: {
      taxonomy: 'post_tag',
      per_page: 100,
      orderby: 'count',
      order: 'desc',
    },
  });
  
  return (
    <main>
      <h1>Tags</h1>
      
      <div className="tags-cloud">
        {data.terms.map(tag => (
          <Link
            key={tag.id}
            href={`/tag/${tag.slug}`}
            className={`tag tag-size-${Math.min(Math.floor(tag.count / 5) + 1, 5)}`}
            style={{
              fontSize: `${Math.min(tag.count * 0.1 + 1, 2)}rem`,
            }}
          >
            {tag.name} ({tag.count})
          </Link>
        ))}
      </div>
    </main>
  );
}
```

## Parameters

### Function Signature

```typescript
queryTerms({
  routeParams,
  params,
  options?
}): Promise<{
  data: { 
    terms: TermEntity[],
    pageInfo: PageInfo
  },
  config: HeadlessConfig
}>
```

### params

| Parameter | Type | Description |
|-----------|------|-------------|
| `taxonomy` | `string` | Taxonomy name (category, post_tag, custom taxonomy) |
| `per_page` | `number` | Number of terms per page (default: 10) |
| `page` | `number` | Page number for pagination |
| `search` | `string` | Search terms by name |
| `orderby` | `string` | Order by (name, count, slug, etc.) |
| `order` | `'asc' \| 'desc'` | Sort order |
| `hide_empty` | `boolean` | Hide terms with no posts (default: true) |
| `parent` | `number` | Get child terms of specific parent |
| `include` | `number[]` | Include specific term IDs |
| `exclude` | `number[]` | Exclude specific term IDs |

## Return Value

### data.terms

Array of term objects containing:

- `id` - Term ID
- `name` - Term name
- `slug` - Term slug
- `description` - Term description
- `link` - Term archive URL
- `count` - Number of posts in this term
- `parent` - Parent term ID (for hierarchical taxonomies)
- `taxonomy` - Taxonomy name

### data.pageInfo

Pagination information for the terms.

## Advanced Examples

### Hierarchical Categories

```tsx title="app/categories/page.tsx"
import { queryTerms } from '@headstartwp/next/app';
import type { HeadstartWPRoute } from '@headstartwp/next/app';

async function getCategoriesHierarchy() {
  // Get all categories
  const { data } = await queryTerms({
    routeParams: {},
    params: {
      taxonomy: 'category',
      per_page: 100,
      orderby: 'name',
      parent: 0, // Only top-level categories
    },
  });
  
  // Get children for each category
  const categoriesWithChildren = await Promise.all(
    data.terms.map(async (category) => {
      const { data: childrenData } = await queryTerms({
        routeParams: {},
        params: {
          taxonomy: 'category',
          parent: category.id,
          per_page: 50,
        },
      });
      
      return {
        ...category,
        children: childrenData.terms,
      };
    })
  );
  
  return categoriesWithChildren;
}

export default async function HierarchicalCategoriesPage() {
  const categories = await getCategoriesHierarchy();
  
  return (
    <main>
      <h1>Categories</h1>
      
      <div className="categories-hierarchy">
        {categories.map(category => (
          <div key={category.id} className="category-group">
            <h2>
              <Link href={`/category/${category.slug}`}>
                {category.name} ({category.count})
              </Link>
            </h2>
            
            {category.children.length > 0 && (
              <ul className="subcategories">
                {category.children.map(child => (
                  <li key={child.id}>
                    <Link href={`/category/${child.slug}`}>
                      {child.name} ({child.count})
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
```

### Terms with Pagination

```tsx title="app/categories/page/[page]/page.tsx"
import { queryTerms } from '@headstartwp/next/app';

export async function generateStaticParams() {
  // Get total number of categories
  const { data } = await queryTerms({
    routeParams: {},
    params: {
      taxonomy: 'category',
      per_page: 1, // Just to get total count
    },
  });
  
  const totalPages = data.pageInfo.totalPages;
  return Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));
}

export default async function CategoriesPaginationPage({ params }) {
  const resolvedParams = await params;
  const page = parseInt(resolvedParams.page);
  
  const { data, pageInfo } = await queryTerms({
    routeParams: await params,
    params: {
      taxonomy: 'category',
      per_page: 20,
      page,
    },
  });
  
  return (
    <main>
      <h1>Categories - Page {page}</h1>
      
      <div className="categories-grid">
        {data.terms.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
      
      {/* Pagination */}
      <div className="pagination">
        {pageInfo.hasPreviousPage && (
          <Link href={`/categories/page/${page - 1}`}>
            Previous
          </Link>
        )}
        {pageInfo.hasNextPage && (
          <Link href={`/categories/page/${page + 1}`}>
            Next
          </Link>
        )}
      </div>
    </main>
  );
}
```