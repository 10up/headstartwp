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

### Demo Project

For a complete example of Polylang integration with HeadstartWP, check out our [demo project](https://github.com/10up/headstartwp/tree/develop/projects/wp-polylang-nextjs-app). The demo includes:

- Full App Router setup with language routing
- Language switcher component implementation
- WordPress configuration examples
- Proper handling of translations and locale detection


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