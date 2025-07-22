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
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { seo } = await queryPost({
		routeParams: await params,
		params: {
			postType: ['post', 'page'],
		},
	});

	return seo.metadata;
}

export default async function PostPage({ params }: HeadstartWPRoute) {
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
			<SafeHtml html={data.post.content.rendered} />
		</article>
	);
}
```

## Query Functions Type Safety

All HeadstartWP query functions are fully typed:

```tsx title="src/app/blog/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { PostEntity } from '@headstartwp/core';
import { SafeHtml } from '@headstartwp/core/react';

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
					<SafeHtml html={post.excerpt.rendered} />
				</article>
			))}
		</main>
	);
}
```

## Custom Post Types

When working with custom post types, you can extend the base types for better type safety. HeadstartWP query functions are generic, so you can pass your custom types directly:

```tsx title="src/types/wordpress.ts"
import type { PostEntity, PostsSearchParams } from '@headstartwp/core';

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

// Extend the search params to include custom fields
export interface ProductSearchParams extends PostsSearchParams {

	// Add custom taxonomy support
	product_category?: string | string[];
	price_range?: {
		min: number;
		max: number;
	};
}

export interface EventSearchParams extends PostsSearchParams {
	event_date_after?: string;
	event_date_before?: string;
	location?: string;
}
```

Then use these types with the generic query functions:

```tsx title="src/app/products/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import type { ProductPost } from '../../../types/wordpress';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

export default async function ProductPage({ params }: HeadstartWPRoute) {
	// Use the generic function with your custom type
	const { data } = await queryPost<ProductPost>({
		routeParams: await params,
		params: {
			postType: 'product',
		},
	});

	// TypeScript now knows data.post is ProductPost
	const product = data.post;

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

For listing pages with custom search params:

```tsx title="src/app/products/page.tsx"
import { queryPosts } from '@headstartwp/next/app';
import type { ProductPost, ProductSearchParams } from '../../types/wordpress';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

interface ProductsPageProps extends HeadstartWPRoute {
	searchParams: Promise<ProductSearchParams>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
	const params = await searchParams;
	
	// Use the generic function with both custom post type and search params
	const { data } = await queryPosts<ProductPost>({
		routeParams: {},
		params: {
			postType: 'product',
			perPage: 12,
			...params,
			// TypeScript validates these custom params
			meta_query: params.price_range ? [
				{
					key: 'price',
					value: params.price_range.min,
					compare: '>=',
				},
				{
					key: 'price',
					value: params.price_range.max,
					compare: '<=',
				},
			] : undefined,
		},
	});

	// TypeScript knows data.posts is ProductPost[]
	return (
		<div>
			<h1>Products</h1>
			<div className="products-grid">
				{data.posts.map((product) => (
					<article key={product.id}>
						<h2>{product.title.rendered}</h2>
						<p>Price: ${product.acf.price}</p>
						<p>SKU: {product.acf.sku}</p>
						<SafeHtml html={product.excerpt.rendered} />
					</article>
				))}
			</div>
		</div>
	);
}
```

## Layout Types

For layout components, HeadstartWP provides the `HeadstartWPLayout` type:

```tsx title="src/app/layout.tsx"
import { HeadstartWPApp } from '@headstartwp/next/app';
import type { HeadstartWPLayout } from '@headstartwp/next/app';
import { loadHeadstartWPConfig } from '@headstartwp/next/app';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
	title: 'My HeadstartWP App',
	description: 'Built with HeadstartWP and Next.js App Router',
};

export default async function RootLayout({ children, params }: Readonly<HeadstartWPLayout>) {
	const { menu, data, config } = await queryAppSettings({
		menu: 'primary',
		routeParams: await params,
	});

	return (
		<html lang="en">
			<body>
				<BlockLibraryStyles params={await params} />
				<HeadstartWPApp settings={config} themeJSON={data['theme.json']}>
					{menu ? <Menu items={menu} /> : null}
					{children}
					<PreviewIndicator className="form-container" />
				</HeadstartWPApp>
			</body>
		</html>
	);
}
```

For custom layout props, extend the `HeadstartWPLayout` type:

```tsx title="src/app/blog/layout.tsx"
import type { HeadstartWPLayout } from '@headstartwp/next/app';
import { queryPosts } from '@headstartwp/next/app';
import { Sidebar } from '../../components/Sidebar';

interface BlogLayoutProps extends HeadstartWPLayout {
	// Add any additional props if needed
}

export default async function BlogLayout({ children, params }: BlogLayoutProps) {
	// Fetch data for the sidebar
	const { data } = await queryPosts({
		routeParams: await params,
		params: {
			postType: 'post',
			perPage: 5,
		},
	});

	return (
		<div className="blog-layout">
			<main>{children}</main>
			<Sidebar recentPosts={data.posts} />
		</div>
	);
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
import { SafeHtml } from '@headstartwp/core/react';

declare global {
	interface Window {
		gtag?: (...args: any[]) => void;
		dataLayer?: any[];
	}
}
export {};
```

Make sure that `src/types/global.d.ts` is included in your `tsconfig.json`.


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