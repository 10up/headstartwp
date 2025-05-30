---
slug: /wordpress-integration/polylang
---

# Polylang Integration

:::caution
Polylang Pro is required since only Polylang Pro offers the [REST API integration](https://polylang.pro/doc/rest-api/).
:::

It is possible to integrate with Polylang by enabling the integration in `headstartwp.config.js` and setting up the appropriate App Router structure for internationalization.

## Configuration

### HeadstartWP Configuration

```javascript title="headstartwp.config.js"
module.exports = {
	// other settings
	sourceUrl: process.env.NEXT_PUBLIC_HEADLESS_WP_URL,
	hostUrl: process.env.NEXT_PUBLIC_HOST_URL,
	
	// Configure i18n in HeadstartWP config
	i18n: {
		locales: ['en', 'pt', 'es'],
		defaultLocale: 'en',
	},
	
	integrations: {
		yoastSEO: {
			enable: true,
		},
		polylang: {
			enable: true,
		},
	},
};
```

### Next.js Configuration

Unlike Pages Router, App Router doesn't use the `i18n` configuration in `next.config.js`. The internationalization is handled through the App Router structure and HeadstartWP's middleware.

```javascript title="next.config.js"
const { withHeadstartWPConfig } = require('@headstartwp/next/config');

/** @type {import('next').NextConfig} */
const nextConfig = {
	// Your Next.js config without i18n
	// The i18n config is now handled by HeadstartWP
};

module.exports = withHeadstartWPConfig(nextConfig);
```

### Middleware Setup

Create a middleware that uses HeadstartWP's `AppMiddleware` with App Router support:

```typescript title="src/middleware.ts"
import { AppMiddleware } from '@headstartwp/next/middlewares';
import { NextRequest } from 'next/server';

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api routes
		 * 2. /_next (Next.js internals)
		 * 3. /fonts (inside /public)
		 * 4. all root files inside /public (e.g. /favicon.ico)
		 */
		'/((?!api|cache-healthcheck|_next|fonts[\\w-]+\\.\\w+).*)',
	],
};

export async function middleware(req: NextRequest) {
	return AppMiddleware(req, { appRouter: true });
}
```

:::info
You need to make sure that the locales set in Polylang matches the locales set in HeadstartWP's `i18n.locales` config.
:::

## App Router Structure

### Directory Structure

Set up your App Router with a `[lang]` dynamic segment to handle different locales:

```
src/app/
├── layout.tsx                 # Root layout
├── not-found.tsx             # Root not found page
├── api/                      # API routes
│   ├── preview/
│   └── revalidate/
└── [lang]/                   # Locale-specific routes
    ├── layout.tsx            # Locale layout
    ├── page.tsx              # Home page
    ├── not-found.tsx         # Locale not found page
    ├── blog/
    │   └── [[...path]]/
    │       └── page.tsx      # Blog posts and archives
    ├── category/
    │   └── [[...path]]/
    │       └── page.tsx      # Category archives
    └── [...path]/
        └── page.tsx          # Pages and single posts
```

### Root Layout

```tsx title="src/app/layout.tsx"
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'My Multilingual Site',
	description: 'Powered by HeadstartWP and Polylang',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
		</html>
	);
}
```

### Locale Layout

```tsx title="src/app/[lang]/layout.tsx"
import { HeadstartWPLayout, PreviewIndicator, queryAppSettings } from '@headstartwp/next/app';
import { Menu, SettingsProvider, ThemeSettingsProvider } from '@headstartwp/core/react';

export async function generateStaticParams() {
	// Pre-render all supported locales
	return [
		{ lang: 'en' },
		{ lang: 'pt' },
		{ lang: 'es' },
	];
}

export default async function LocaleLayout({ 
	children, 
	params 
}: Readonly<HeadstartWPLayout>) {
	const { menu, data, config } = await queryAppSettings({
		menu: 'primary',
		routeParams: await params,
	});

	return (
		<ThemeSettingsProvider data={data['theme.json']}>
			<SettingsProvider settings={config}>
				{menu ? <Menu items={menu} /> : null}
				{children}
				<PreviewIndicator className="form-container" />
			</SettingsProvider>
		</ThemeSettingsProvider>
	);
}
```

### Home Page

```tsx title="src/app/[lang]/page.tsx"
import { BlocksRenderer } from '@headstartwp/core/react';
import { HeadstartWPRoute, queryAppSettings, queryPost } from '@headstartwp/next/app';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const {
		data: { home },
	} = await queryAppSettings({
		routeParams: await params,
	});

	const { seo } = await queryPost({
		routeParams: await params,
		params: {
			slug: home.slug ?? 'front-page',
			postType: 'page',
		},
	});

	return seo.metadata;
}

export default async function Home({ params }: HeadstartWPRoute) {
	const {
		data: { home },
	} = await queryAppSettings({
		routeParams: await params,
	});

	const { data } = await queryPost({
		routeParams: await params,
		params: {
			slug: home.slug ?? 'front-page',
			postType: 'page',
		},
	});

	return (
		<main>
			<div>
				<BlocksRenderer html={data.post.content.rendered ?? ''} />
			</div>
		</main>
	);
}
```

### Blog Posts and Archives

```tsx title="src/app/[lang]/blog/[[...path]]/page.tsx"
import { PostEntity, QueriedObject } from '@headstartwp/core';
import { HeadstartWPRoute, queryPostOrPosts } from '@headstartwp/next/app';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type ArchiveProps = {
	posts: PostEntity[];
	queriedObject: QueriedObject;
};

const Archive = ({ posts, queriedObject }: ArchiveProps) => {
	return (
		<main>
			<h1>{queriedObject.term?.name || 'Blog'}</h1>
			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link href={post.link}>{post.title.rendered}</Link>
					</li>
				))}
			</ul>
		</main>
	);
};

const Single = ({ post }: { post: PostEntity }) => {
	return (
		<article>
			<h1>{post.title.rendered}</h1>
			<div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
		</article>
	);
};

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { isArchive, isSingle, seo } = await queryPostOrPosts({
		routeParams: await params,
		params: {
			single: {
				postType: 'post',
			},
			archive: {
				postType: 'post',
			},
			priority: 'single',
			routeMatchStrategy: 'single',
		},
	});

	return seo.metadata;
}

export default async function BlogPage({ params }: HeadstartWPRoute) {
	const { isArchive, isSingle, data } = await queryPostOrPosts({
		routeParams: await params,
		params: {
			single: {
				postType: 'post',
			},
			archive: {
				postType: 'post',
				_fields: ['id', 'title', 'link'],
			},
			priority: 'single',
			routeMatchStrategy: 'single',
		},
	});

	if (isArchive && typeof data.posts !== 'undefined') {
		return <Archive posts={data.posts} queriedObject={data.queriedObject} />;
	}

	if (isSingle && typeof data.post !== 'undefined') {
		return <Single post={data.post} />;
	}

	return notFound();
}
```

## How it Works

Enabling this integration will automatically add the `lang` attribute to all REST API calls made to WordPress (when using the data-fetching layer provided by the framework). The `lang` attribute will be set based on the current locale from the `[lang]` route parameter.

### Language Detection

1. **Route Parameter**: The locale is extracted from the `[lang]` dynamic segment in the URL
2. **Middleware**: HeadstartWP's middleware handles locale detection and routing
3. **API Calls**: All data fetching functions automatically include the current locale in WordPress API requests
4. **Fallback**: If no locale is specified, the `defaultLocale` from the configuration is used

### URL Structure

With this setup, your URLs will follow this pattern:

```
https://mysite.com/en/              # English home page
https://mysite.com/pt/              # Portuguese home page
https://mysite.com/es/              # Spanish home page
https://mysite.com/en/blog/         # English blog archive
https://mysite.com/pt/blog/meu-post # Portuguese blog post
https://mysite.com/es/acerca-de/    # Spanish about page
```

## Language Switching Component

Create a language switcher component to allow users to switch between locales:

```tsx title="src/components/LanguageSwitcher.tsx"
'use client';

import { useParams, usePathname } from 'next/navigation';
import Link from 'next/link';

const languages = [
	{ code: 'en', name: 'English' },
	{ code: 'pt', name: 'Português' },
	{ code: 'es', name: 'Español' },
];

export function LanguageSwitcher() {
	const params = useParams();
	const pathname = usePathname();
	
	const currentLang = params?.lang as string;
	
	// Remove current language from pathname to get the base path
	const basePath = pathname.replace(`/${currentLang}`, '') || '/';
	
	return (
		<nav className="language-switcher">
			<ul>
				{languages.map((language) => (
					<li key={language.code}>
						<Link
							href={`/${language.code}${basePath}`}
							className={currentLang === language.code ? 'active' : ''}
						>
							{language.name}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
```

## Static Generation

For static generation, make sure to include `generateStaticParams` in your pages:

```tsx title="src/app/[lang]/[...path]/page.tsx"
import { HeadstartWPRoute } from '@headstartwp/next/app';

export async function generateStaticParams() {
	// Generate static params for all locales and popular paths
	const locales = ['en', 'pt', 'es'];
	const paths = ['about', 'contact', 'services']; // Add your static pages
	
	const params = [];
	
	for (const lang of locales) {
		// Home page
		params.push({ lang, path: [] });
		
		// Static pages
		for (const pathSegment of paths) {
			params.push({ lang, path: [pathSegment] });
		}
	}
	
	return params;
}

// Your page component...
```

## SEO and Metadata

The framework automatically handles SEO metadata for different locales:

```tsx
export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { seo } = await queryPost({
		routeParams: await params,
		params: {
			// Your query params
		},
	});

	return {
		...seo.metadata,
		// The locale is automatically included in API calls
		// and the returned metadata will be in the correct language
	};
}
```

## Best Practices

### 1. Consistent Locale Configuration

Ensure your locale configuration is consistent across:
- WordPress Polylang settings
- HeadstartWP config (`i18n.locales`)
- Your `generateStaticParams` functions

### 2. Fallback Handling

Always provide a fallback for missing translations:

```tsx
const { data } = await queryPost({
	routeParams: await params,
	params: {
		slug: 'my-page',
		postType: 'page',
	},
	// If content is not available in the current locale,
	// HeadstartWP will automatically fall back to the default locale
});
```

### 3. Custom Post Types

For custom post types, ensure they're configured for translation in both Polylang and HeadstartWP:

```javascript title="headstartwp.config.js"
module.exports = {
	customPostTypes: [
		{
			slug: 'product',
			endpoint: '/wp-json/wp/v2/product',
			single: 'product',
			archive: 'products',
			// This post type will automatically support Polylang translations
		},
	],
	// ... rest of config
};
```

### 4. Performance Optimization

Use appropriate caching strategies for multilingual content:

```tsx
const { data } = await queryPost({
	routeParams: await params,
	params: {
		slug: 'my-page',
		postType: 'page',
	},
	options: {
		// Cache translated content appropriately
		next: {
			revalidate: 3600, // 1 hour
			tags: [`page-${slug}-${lang}`],
		},
	},
});
```