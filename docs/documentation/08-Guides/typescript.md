---
sidebar_label: TypeScript
---

# TypeScript

HeadstartWP offers first-class support for TypeScript. In this guide we document how to leverage TypeScript with HeadstartWP and the Next.js App Router. We also recommend reviewing the official Next.js [docs for TypeScript](https://nextjs.org/docs/app/building-your-application/configuring/typescript) as well as using the default [HeadstartWP App Router project](https://github.com/10up/headstartwp/tree/develop/projects/wp-nextjs-app) as a reference for building with TypeScript.

## Server Components and Data Fetching

With App Router, data fetching happens directly in Server Components using async/await. HeadstartWP provides TypeScript-first query functions that return properly typed data.

```tsx title="src/app/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface PageProps {
	params: Promise<{ path?: string[] }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	try {
		const { seo } = await queryPost({
			routeParams: await params,
			params: {
				postType: ['post', 'page'],
			},
		});

		return seo.metadata;
	} catch {
		return {
			title: 'Page Not Found',
			description: 'The requested page could not be found.',
		};
	}
}

export default async function PostPage({ params }: PageProps) {
	try {
		const { data } = await queryPost({
			routeParams: await params,
			params: {
				postType: ['post', 'page'],
			},
		});

		// TypeScript knows the exact shape of data.post
		return (
			<article>
				<h1>{data.post.title.rendered}</h1>
				<div dangerouslySetInnerHTML={{ __html: data.post.content.rendered }} />
			</article>
		);
	} catch (error: any) {
		if (error?.status === 404) {
			notFound();
		}
		throw error;
	}
}
```

## Query Functions Type Safety

All HeadstartWP query functions are fully typed:

```tsx title="src/app/blog/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { PostEntity } from '@headstartwp/core';

export default async function BlogPage() {
	const { data } = await queryPosts({
		routeParams: {},
		params: {
			postType: 'post',
			perPage: 10,
		},
	});

	// TypeScript knows data.posts is PostEntity[]
	return (
		<main>
			<h1>Blog</h1>
			{data.posts.map((post: PostEntity) => (
				<article key={post.id}>
					<h2>{post.title.rendered}</h2>
					<div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
				</article>
			))}
		</main>
	);
}
```

## Custom Post Types

When working with custom post types, you can extend the base types for better type safety:

```tsx title="src/types/wordpress.ts"
import type { PostEntity } from '@headstartwp/core';

export interface ProductPost extends PostEntity {
	acf: {
		price: number;
		sku: string;
		gallery: Array<{
			url: string;
			alt: string;
		}>;
	};
}

export interface EventPost extends PostEntity {
	acf: {
		event_date: string;
		location: string;
		capacity: number;
	};
}
```

Then use these types in your components:

```tsx title="src/app/products/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import type { ProductPost } from '../../../types/wordpress';

interface ProductPageProps {
	params: Promise<{ path?: string[] }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
	const { data } = await queryPost({
		routeParams: await params,
		params: {
			postType: 'product',
		},
	});

	// Cast to your custom type
	const product = data.post as ProductPost;

	return (
		<div>
			<h1>{product.title.rendered}</h1>
			<p>Price: ${product.acf.price}</p>
			<p>SKU: {product.acf.sku}</p>
			<div className="gallery">
				{product.acf.gallery?.map((image, index) => (
					<img key={index} src={image.url} alt={image.alt} />
				))}
			</div>
		</div>
	);
}
```

## generateStaticParams Typing

For static generation, properly type your `generateStaticParams` function:

```tsx title="src/app/blog/[slug]/page.tsx"
import { queryPosts, queryPost } from '@headstartwp/next/app';

interface BlogPostParams {
	slug: string;
}

export async function generateStaticParams(): Promise<BlogPostParams[]> {
	try {
		const { data } = await queryPosts({
			routeParams: {},
			params: {
				postType: 'post',
				perPage: 50, // Generate top 50 posts
			},
		});

		return data.posts.map((post) => ({
			slug: post.slug,
		}));
	} catch {
		return [];
	}
}

interface BlogPostPageProps {
	params: Promise<BlogPostParams>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
	const { slug } = await params;
	
	const { data } = await queryPost({
		routeParams: { path: [slug] },
		params: {
			postType: 'post',
			slug,
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

## Client Components with Hooks

When you need client-side features, use the traditional hooks with proper typing:

```tsx title="src/components/InteractivePostList.tsx"
'use client';

import { usePosts } from '@headstartwp/next';
import { useState } from 'react';
import type { PostEntity, PostsSearchParams } from '@headstartwp/core';

interface InteractivePostListProps {
	initialPosts: PostEntity[];
	initialParams: PostsSearchParams;
}

export function InteractivePostList({ 
	initialPosts, 
	initialParams 
}: InteractivePostListProps) {
	const [searchTerm, setSearchTerm] = useState('');
	
	const { data, loading, error } = usePosts({
		...initialParams,
		search: searchTerm,
	}, {
		initialData: { posts: initialPosts },
	});

	if (error) {
		return <div>Error loading posts: {error.message}</div>;
	}

	return (
		<div>
			<input
				type="text"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				placeholder="Search posts..."
			/>
			
			{loading && <div>Loading...</div>}
			
			<div>
				{data?.posts.map((post: PostEntity) => (
					<article key={post.id}>
						<h3>{post.title.rendered}</h3>
						<div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
					</article>
				))}
			</div>
		</div>
	);
}
```

## Query Options Typing

HeadstartWP query functions accept strongly typed options:

```tsx title="src/app/posts/[slug]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import type { QueryPostOptions } from '@headstartwp/core';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;

	const options: QueryPostOptions = {
		next: {
			revalidate: 3600, // Revalidate every hour
			tags: [`post-${slug}`],
		},
		cache: 'force-cache',
	};

	const { data } = await queryPost({
		routeParams: { path: [slug] },
		params: {
			postType: 'post',
			slug,
		},
		options,
	});

	return (
		<article>
			<h1>{data.post.title.rendered}</h1>
			<div dangerouslySetInnerHTML={{ __html: data.post.content.rendered }} />
		</article>
	);
}
```

## Error Handling with Types

Properly type error handling scenarios:

```tsx title="src/app/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import { notFound } from 'next/navigation';

interface HeadstartWPError extends Error {
	status?: number;
	data?: any;
}

export default async function DynamicPage({ params }: { params: Promise<{ path?: string[] }> }) {
	try {
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
	} catch (error) {
		const headstartError = error as HeadstartWPError;
		
		if (headstartError.status === 404) {
			notFound();
		}

		// Log other errors
		console.error('Failed to fetch post:', headstartError);
		throw error;
	}
}
```

## Recommended TS Config

This is the recommended TS Config for working with HeadstartWP and TypeScript in App Router:

```json title="tsconfig.json"
{
	"compilerOptions": {
		"lib": ["dom", "dom.iterable", "esnext"],
		"allowJs": true,
		"skipLibCheck": true,
		"strict": true,
		"noEmit": true,
		"esModuleInterop": true,
		"module": "esnext",
		"moduleResolution": "bundler",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"jsx": "preserve",
		"incremental": true,
		"plugins": [
			{
				"name": "next"
			}
		],
		"baseUrl": ".",
		"paths": {
			"@/*": ["./src/*"]
		}
	},
	"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
	"exclude": ["node_modules"]
}
```

## Global Types

We recommend using a `src/types/global.d.ts` file when you need to add/extend types to the global scope:

```ts title="src/types/global.d.ts"
import type { PostEntity, TermEntity } from '@headstartwp/core';

declare global {
	interface Window {
		gtag?: (...args: any[]) => void;
		dataLayer?: any[];
	}
}

// Extend HeadstartWP types if needed
declare module '@headstartwp/core' {
	interface PostEntity {
		// Add custom fields that are always present
		featured_image_url?: string;
	}
}

export {};
```

Make sure that `src/types/global.d.ts` is included in your `tsconfig.json`.

## Utility Types for WordPress Data

Create utility types for common WordPress patterns:

```ts title="src/types/utils.ts"
import type { PostEntity, TermEntity } from '@headstartwp/core';

export type PostWithACF<T = Record<string, any>> = PostEntity & {
	acf: T;
};

export type PostPreview = Pick<PostEntity, 'id' | 'title' | 'excerpt' | 'link' | 'date'>;

export type CategoryWithPosts = TermEntity & {
	posts: PostEntity[];
};

// Helper type for paginated responses
export type PaginatedResponse<T> = {
	items: T[];
	totalPages: number;
	currentPage: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
};
```

## Running the typecheck

By default Next.js will run `tsc` to validate your types. If type checking fails your build will fail. Therefore we recommend running `tsc --noEmit` before committing and/or on your CI prior to merging PRs.

You can also add type checking scripts to your `package.json`:

```json title="package.json"
{
	"scripts": {
		"type-check": "tsc --noEmit",
		"type-check:watch": "tsc --noEmit --watch",
		"lint": "next lint && npm run type-check"
	}
}
```

This App Router TypeScript setup provides full type safety while maintaining the flexibility and power of HeadstartWP's data fetching capabilities.