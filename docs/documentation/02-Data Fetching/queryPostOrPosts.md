---
sidebar_position: 3
sidebar_label: queryPostOrPosts
slug: /data-fetching/query-post-or-posts
---

# queryPostOrPosts

The `queryPostOrPosts` function allows you to handle both single posts and archive pages in a single query. This is useful for catch-all routes that need to dynamically handle different content types. The function automatically determines whether the current route should return a single post or an archive of posts.

## Basic Usage

### Dynamic Route Handler

```tsx title="app/[...path]/page.tsx"
import { queryPostOrPosts } from '@headstartwp/next/app';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

interface PageProps {
	params: Promise<{ path?: string[] }>;
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { seo } = await queryPostOrPosts({
		routeParams: await params,
		params: {
			single: {
				postType: ['post', 'page'],
			},
			archive: {
				postType: 'post',
			},
		},
	});

	return seo.metadata;
}

export default async function DynamicPage({ params }: HeadstartWPRoute) {
	const { isSingle, isArchive, data } = await queryPostOrPosts({
		routeParams: await params,
		params: {
			single: {
				postType: ['post', 'page'],
			},
			archive: {
				postType: 'post',
			},
		},
	});

	if (isSingle && data.post) {
		return (
			<article>
				<h1>{data.post.title.rendered}</h1>
				<SafeHtml html={data.post.content.rendered} />
			</article>
		);
	}

	if (isArchive && data.posts) {
		return (
			<div className="posts-grid">
				<h1>Blog Posts</h1>
				{data.posts.map((post) => (
					<article key={post.id}>
						<h2>
							<Link href={post.link}>{post.title.rendered}</Link>
						</h2>
						<SafeHtml html={post.excerpt.rendered} />
					</article>
				))}
			</div>
		);
	}

	// This shouldn't happen, but handle gracefully
	notFound();
}
```

## Parameters

The `queryPostOrPosts` function accepts the following parameters:

### Function Signature

```typescript
queryPostOrPosts<T extends PostEntity = PostEntity, P extends PostOrPostsParams = PostOrPostsParams>(
	q: PostOrPostsQueryProps<T, P> = {},
	_config?: HeadlessConfig
): Promise<QueryResult>
```

### Query Parameters

```typescript
interface PostOrPostsQueryProps {
	routeParams: RouteParams;
	params: {
		single: PostParams;     // Parameters for single post queries
		archive: PostsParams;   // Parameters for archive queries
		priority?: 'single' | 'archive';           // Which to try first
		routeMatchStrategy?: 'single' | 'archive'; // Route matching strategy
	};
	options?: {
		next?: NextFetchRequestConfig;
		cache?: RequestCache;
	};
	fetchStrategy?: PostOrPostsFetchStrategy;
}
```

### Parameters Details

| Parameter | Type | Description |
|-----------|------|-------------|
| `params.single` | `PostParams` | Parameters used when querying for a single post |
| `params.archive` | `PostsParams` | Parameters used when querying for posts archive |
| `params.priority` | `'single' \| 'archive'` | Which query type to try first (default: 'single') |
| `params.routeMatchStrategy` | `'single' \| 'archive'` | Strategy for route matching |
| `options` | `QueryOptions` | Next.js caching and fetch options |

## Return Value

The function returns a promise that resolves to:

```typescript
interface QueryResult {
	isSingle: boolean;          // True if result is a single post
	isArchive: boolean;         // True if result is an archive
	data: {
		post?: PostEntity;      // Available when isSingle is true
		posts?: PostEntity[];   // Available when isArchive is true
		queriedObject?: any;    // Archive metadata (category, author, etc.)
		pageInfo?: PageInfo;    // Pagination info for archives
	};
	seo: {
		metadata: Metadata;     // Next.js metadata object
		schema?: any;           // JSON-LD schema data
	};
	config: HeadlessConfig;     // Framework configuration
}
```

## Advanced Usage

### Custom Post Types

```tsx title="app/products/[[...path]]/page.tsx"
import { queryPostOrPosts } from '@headstartwp/next/app';
import type { HeadstartWPRoute } from '@headstartwp/next/app';

export default async function ProductsPage({ params }: HeadstartWPRoute) {
	const { isSingle, isArchive, data } = await queryPostOrPosts({
		routeParams: await params,
		params: {
			single: {
				postType: 'product',
			},
			archive: {
				postType: 'product',
				perPage: 12,
				// Only show published products in archive
				_fields: ['id', 'title', 'excerpt', 'link', 'featured_media'],
			},
		},
	});

	if (isSingle && data.post) {
		// Single product page
		return (
			<div className="product-details">
				<h1>{data.post.title.rendered}</h1>
				<SafeHtml html={data.post.content.rendered} />
				
				{/* Product-specific content */}
				{data.post.acf && (
					<div className="product-meta">
						<p>Price: ${data.post.acf.price}</p>
						<p>SKU: {data.post.acf.sku}</p>
					</div>
				)}
			</div>
		);
	}

	if (isArchive && data.posts) {
		// Products archive
		return (
			<div className="products-grid">
				<h1>Our Products</h1>
				<div className="grid grid-cols-3 gap-6">
					{data.posts.map(product => (
						<div key={product.id} className="product-card">
							<h3>
								<Link href={product.link}>
									{product.title.rendered}
								</Link>
							</h3>
							<SafeHtml html={product.excerpt.rendered} />
						</div>
					))}
				</div>
			</div>
		);
	}
}
```

### Priority and Route Matching

```tsx title="app/blog/[[...path]]/page.tsx"
import type { HeadstartWPRoute } from '@headstartwp/next/app';

export default async function BlogPage({ params }: HeadstartWPRoute) {
	const { isSingle, isArchive, data } = await queryPostOrPosts({
		routeParams: await params,
		params: {
			single: {
				postType: 'post',
			},
			archive: {
				postType: 'post',
				perPage: 10,
			},
			// Try archive first for this route
			priority: 'archive',
			routeMatchStrategy: 'archive',
		},
	});

	// Component logic...
}
```

### With Taxonomy Filtering

```tsx title="app/category/[[...path]]/page.tsx"
import type { HeadstartWPRoute } from '@headstartwp/next/app';

export default async function CategoryPage({ params }: HeadstartWPRoute) {
	const { isArchive, data } = await queryPostOrPosts({
		routeParams: await params,
		params: {
			single: {
				postType: 'post',
			},
			archive: {
				postType: 'post',
				taxonomy: 'category',
				perPage: 10,
			},
			// For category routes, prioritize archive
			priority: 'archive',
		},
	});

	if (isArchive && data.posts) {
		const category = data.queriedObject?.term;
		
		return (
			<main>
				<h1>Category: {category?.name}</h1>
				{category?.description && (
					<p className="category-description">{category.description}</p>
				)}
				
				<div className="posts">
					{data.posts.map(post => (
						<article key={post.id}>
							<h2>
								<Link href={post.link}>{post.title.rendered}</Link>
							</h2>
							<SafeHtml html={post.excerpt.rendered} />
						</article>
					))}
				</div>
			</main>
		);
	}

	return <div>No posts found in this category.</div>;
}
```

## Error Handling

### Built-in Error Handling

The function includes built-in error handling that automatically calls `handleFetchError` when configured:

```tsx
try {
	const result = await queryPostOrPosts({
		routeParams: await params,
		params: {
			single: { postType: ['post', 'page'] },
			archive: { postType: 'post' },
		},
	});
	
	// Handle result...
} catch (error) {
	// Error is automatically processed by handleFetchError
	// Re-throw or handle as needed
	if (error.status === 404) {
		notFound();
	}
	throw error;
}
```

### Custom Error Handling

```tsx title="app/[...path]/page.tsx"
export default async function DynamicPage({ params }: HeadstartWPRoute) {
	try {
		const result = await queryPostOrPosts({
			routeParams: await params,
			params: {
				single: { postType: ['post', 'page'] },
				archive: { postType: 'post' },
			},
		});

		// Render based on result type
		if (result.isSingle) {
			return <SinglePostView post={result.data.post} seo={result.seo} />;
		} else {
			return <ArchiveView posts={result.data.posts} pageInfo={result.data.pageInfo} />;
		}
	} catch (error: any) {
		// Log error for debugging
		console.error('Query failed:', error);
		
		// Handle specific error types
		if (error.status === 404) {
			notFound();
		}
		
		// For other errors, show a generic error page
		return (
			<div className="error-page">
				<h1>Something went wrong</h1>
				<p>Please try again later.</p>
			</div>
		);
	}
}
```

## Static Generation

### Generate Static Params

```tsx title="app/[...path]/page.tsx"
export async function generateStaticParams() {
	try {
		// Generate paths for both single posts and archives
		const { data } = await queryPostOrPosts({
			routeParams: {},
			params: {
				single: { postType: ['post', 'page'] },
				archive: { postType: 'post', perPage: 100 },
			},
		});

		const paths: Array<{ path: string[] }> = [];

		// Add single post/page paths
		if (data.posts) {
			data.posts.forEach(post => {
				const url = new URL(post.link);
				const pathSegments = url.pathname.split('/').filter(Boolean);
				paths.push({ path: pathSegments });
			});
		}

		return paths;
	} catch (error) {
		console.error('Failed to generate static params:', error);
		return [];
	}
}
```

## Performance Optimization

### Caching Configuration

```tsx
const result = await queryPostOrPosts({
	routeParams: await params,
	params: {
		single: { postType: ['post', 'page'] },
		archive: { postType: 'post' },
	},
	options: {
		next: {
			revalidate: 3600, // Revalidate every hour
			tags: ['posts', 'pages'], // Cache tags for on-demand revalidation
		},
		cache: 'force-cache',
	},
});
```

### Field Selection

```tsx
const result = await queryPostOrPosts({
	routeParams: await params,
	params: {
		single: {
			postType: ['post', 'page'],
			// Full content for single posts
		},
		archive: {
			postType: 'post',
			// Minimal fields for archive performance
			_fields: ['id', 'title', 'excerpt', 'link', 'date'],
		},
	},
});
```

## TypeScript Support

### Generic Types

```tsx
import type { PostEntity } from '@headstartwp/core';

interface CustomPostEntity extends PostEntity {
	acf: {
		price: number;
		sku: string;
	};
}

const result = await queryPostOrPosts<CustomPostEntity>({
	routeParams: await params,
	params: {
		single: { postType: 'product' },
		archive: { postType: 'product' },
	},
});

// TypeScript knows the shape of result.data.post and result.data.posts
if (result.isSingle && result.data.post) {
	console.log(result.data.post.acf.price); // Type-safe access
}
```

### Custom Parameters

```tsx
import type { PostOrPostsParams } from '@headstartwp/core';

interface CustomParams extends PostOrPostsParams {
	customField: string;
}

const result = await queryPostOrPosts<PostEntity, CustomParams>({
	routeParams: await params,
	params: {
		single: { 
			postType: 'post',
			customField: 'value',
		},
		archive: { 
			postType: 'post',
			customField: 'value',
		},
	},
});
```

The `queryPostOrPosts` function provides a powerful, unified approach to handling both single and archive content in your App Router applications, with built-in TypeScript support, error handling, and performance optimizations. 