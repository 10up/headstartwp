---
sidebar_position: 0
slug: /wordpress-integration/previews
---

# Previews

The preview feature requires the HeadstartWP plugin installed. The preview functionality is built on top of [Next.js Draft Mode](https://nextjs.org/docs/app/building-your-application/configuring/draft-mode) (formerly Preview Mode). It uses a short-lived JWT token generated on the WordPress side that can only be used for previewing, this means it is not necessary to set up a hardcoded secret between WP and Next.js.

For previews to work, make sure the frontend URL is entered in WP settings as per instructions in [Installing WordPress Plugin](/learn/getting-started/installing-wordpress-plugin).

The logic for generating the JWT token and redirecting it to the preview endpoint can be seen [here](https://github.com/10up/headstartwp/blob/develop/wp/headless-wp/includes/classes/Preview/preview.php).

```php
$token = PreviewToken::generate(
	[
		'type'      => 'preview',
		'post_type' => $post_type,
		'post_id'   => $post_id,
	]
);

$preview_url = sprintf(
	'%sapi/preview?post_id=%d&post_type=%s&is_revision=%s&token=%s',
	trailingslashit( Plugin::get_react_url() ),
	$post_id,
	$post_type,
	$is_revision ? '1' : '0',
	$token
);

wp_redirect( $preview_url );
die();
```

Below is a summary of the preview workflow.

- First a token of type `preview` is generated
- The token encodes the post type and post id.
- A preview URL is generated assuming the preview endpoint lives at `/api/preview`
- WordPress redirects to the preview endpoint
- The token is sent alongside the post_type, post_id and a boolean indicating whether the post being previewed is a revision or not. 
- The token is verified against the parameters and the token is used to fetch the post's draft/revision content.

## Usage

The Next.js App Router project **must** expose an `app/api/preview/route.ts` endpoint that uses the [previewRouteHandler](/api/modules/headstartwp_next/#previewroutehandler).

```typescript title="app/api/preview/route.ts"
import { previewRouteHandler } from '@headstartwp/next/app';
import type { NextRequest } from 'next/server';

/**
 * The Preview endpoint handles preview requests for WordPress draft content
 */
export async function GET(request: NextRequest) {
	return previewRouteHandler(request);
}
```

That's all that is needed to enable WordPress preview.

While previewing, the URL will not reflect the actual URL of the post, but instead, it will contain the post id and a `-preview` suffix (unless using `usePostLinkForRedirect`).

### `previewRouteHandler` options

#### `preparePreviewData`

This allows you to alter the preview data object before it is stored by Next.js (i.e before calling `draftMode().enable()`). You can use this if you need to add additional fields to the preview data object.

```typescript title="app/api/preview/route.ts"
import { previewRouteHandler } from '@headstartwp/next/app';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	return previewRouteHandler(request, {
		preparePreviewData({ req, post, postTypeDef, previewData }) {
			return { 
				...previewData, 
				customField: post.acf?.customField,
				postTitle: post.title.rendered 
			};
		},
	});
}
```

The custom fields would now be available in the preview cookie data.

#### `getRedirectPath`

:::tip
A better alternative is using `preview.usePostLinkForRedirect`. With this setting, you can set up previews so that it uses the `post.link` property of the post for redirecting to the appropriate path/route. This requires that your WordPress permalink matches the Next.js route structure. Check out the docs for [preview.usePostLinkForRedirect](/learn/wordpress-integration/previews#the-usepostlinkforredirect-setting).
:::

The `getRedirectPath` option allows you to customize the redirected URL that should handle the preview request. This can be useful if you have implemented a non-standard URL structure. For instance, if the permalink for your posts is `/%category%/%postname%/` you could create a `/app/[category]/[...path]/page.tsx` route to handle single post.

```typescript title="app/api/preview/route.ts"
import { getPostTerms } from '@headstartwp/core';
import { previewRouteHandler } from '@headstartwp/next/app';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	return previewRouteHandler(request, {
		getRedirectPath({ req, defaultRedirectPath, post, postTypeDef, previewData }) {
			const { type, id, slug } = post;

			if (type === 'post') {
				const terms = getPostTerms(post);
				
				if (Array.isArray(terms?.category) && terms.category.length > 0) {
					const [category] = terms.category;
					return `/${category.slug}/${slug || id}`;
				}
			}

			return defaultRedirectPath;
		},
	});
}
```

#### `onRedirect`

:::tip
Instead of implementing `onRedirect` we recommend implementing `getRedirectPath` instead as that provides better integration with Next.js Draft Mode.
:::

The `onRedirect` gives you full access to the request object and allows custom redirect handling. When using this option, you must handle the redirect yourself.

:::caution
When handling redirects yourself, make sure to always append `-preview=true` to the end of the redirected URL.
:::

```typescript title="app/api/preview/route.ts"
import { previewRouteHandler } from '@headstartwp/next/app';
import type { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
	return previewRouteHandler(request, {
		onRedirect({ req, redirectPath, previewData, postTypeDef, post }) {
			// Custom redirect logic
			const customPath = `/custom/${post.type}/${post.id}-preview=true`;
			redirect(customPath);
		},
	});
}
```

## Using Draft Mode in App Router Components

In App Router components, you can check if you're in draft mode and access the preview data:

```tsx title="app/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import { draftMode, cookies } from 'next/headers';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

export default async function PostPage({ params }: HeadstartWPRoute) {
	const { isEnabled } = draftMode();
	
	// Access preview data from cookie if in draft mode
	let previewData = null;
	if (isEnabled) {
		const cookiesStore = await cookies();
		const previewCookie = cookiesStore.get('headstartwp_preview');
		if (previewCookie) {
			try {
				previewData = JSON.parse(previewCookie.value);
			} catch (e) {
				// Handle parsing error
			}
		}
	}
	
	const { data } = await queryPost({
		routeParams: await params,
		params: {
			postType: ['post', 'page'],
			// Use preview data if available
			...(previewData && {
				id: previewData.id,
				revision: previewData.revision,
				authToken: previewData.authToken,
			}),
		},
		options: {
			// Use different fetch strategy for preview
			cache: isEnabled ? 'no-store' : 'force-cache',
		},
	});
	
	return (
		<article>
			{isEnabled && (
				<div className="preview-banner">
					<p>⚠️ This is a preview</p>
					<a href="/api/preview/exit">Exit Preview</a>
				</div>
			)}
			
			<h1>{data.post.title.rendered}</h1>
			<SafeHtml html={data.post.content.rendered} />
		</article>
	);
}
```

### Preview Banner Component

You can create a reusable preview banner component:

```tsx title="components/PreviewBanner.tsx"
import { draftMode } from 'next/headers';
import Link from 'next/link';

export async function PreviewBanner() {
	const { isEnabled } = draftMode();
	
	if (!isEnabled) {
		return null;
	}
	
	return (
		<div className="preview-banner" style={{
			background: '#f59e0b',
			color: 'white',
			padding: '12px',
			textAlign: 'center',
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			zIndex: 9999,
		}}>
			<div className="container">
				<p>
					⚠️ This page is showing preview content.{' '}
					<Link 
						href="/api/preview/exit" 
						style={{ 
							color: 'white', 
							textDecoration: 'underline',
							fontWeight: 'bold'
						}}
					>
						Exit Preview
					</Link>
				</p>
			</div>
		</div>
	);
}
```

### Exit Preview Endpoint

Create an endpoint to exit preview mode:

```typescript title="app/api/preview/exit/route.ts"
import { draftMode, cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const redirectPath = searchParams.get('redirect') || '/';
	
	// Disable draft mode
	const { disable } = await draftMode();
	await disable();
	
	// Clear the preview cookie
	const cookiesStore = await cookies();
	cookiesStore.delete('headstartwp_preview');
	
	redirect(redirectPath);
}
```

## Advanced Examples

### Custom Post Type Previews

```tsx title="app/products/[...path]/page.tsx"
import { queryPost } from '@headstartwp/next/app';
import { draftMode, cookies } from 'next/headers';
import type { Metadata } from 'next';
import { PreviewBanner } from '../../../components/PreviewBanner';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { SafeHtml } from '@headstartwp/core/react';

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { isEnabled } = draftMode();
	
	// Get preview data if in draft mode
	let queryParams: any = { postType: 'product' };
	if (isEnabled) {
		const cookiesStore = await cookies();
		const previewCookie = cookiesStore.get('headstartwp_preview');
		if (previewCookie) {
			try {
				const previewData = JSON.parse(previewCookie.value);
				queryParams = {
					...queryParams,
					id: previewData.id,
					revision: previewData.revision,
					authToken: previewData.authToken,
				};
			} catch (e) {
				// Handle parsing error
			}
		}
	}
	
	const { seo } = await queryPost({
		routeParams: await params,
		params: queryParams,
		options: {
			cache: isEnabled ? 'no-store' : 'force-cache',
		},
	});
	
	return {
		...seo.metadata,
		robots: isEnabled ? 'noindex,nofollow' : seo.metadata.robots,
	};
}

export default async function ProductPage({ params }: HeadstartWPRoute) {
	const { isEnabled } = draftMode();
	
	// Get preview data if in draft mode
	let queryParams: any = { postType: 'product' };
	if (isEnabled) {
		const cookiesStore = await cookies();
		const previewCookie = cookiesStore.get('headstartwp_preview');
		if (previewCookie) {
			try {
				const previewData = JSON.parse(previewCookie.value);
				queryParams = {
					...queryParams,
					id: previewData.id,
					revision: previewData.revision,
					authToken: previewData.authToken,
				};
			} catch (e) {
				// Handle parsing error
			}
		}
	}
	
	const { data } = await queryPost({
		routeParams: await params,
		params: queryParams,
		options: {
			cache: isEnabled ? 'no-store' : 'force-cache',
		},
	});
	
	return (
		<article>
			<PreviewBanner />
			
			<h1>{data.post.title.rendered}</h1>
			<SafeHtml html={data.post.content.rendered} />
			
			{/* Product-specific content */}
			<div className="product-details">
				<p>Price: {data.post.acf?.price}</p>
				<p>SKU: {data.post.acf?.sku}</p>
			</div>
		</article>
	);
}
```

### Layout with Preview Banner

```tsx title="app/layout.tsx"
import { PreviewBanner } from '../components/PreviewBanner';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<PreviewBanner />
				
				<main style={{ paddingTop: '60px' }}>
					{children}
				</main>
			</body>
		</html>
	);
}
```

## The `usePostLinkForRedirect` setting

The `preview.usePostLinkForRedirect` setting tells the preview handler to use the actual post permalink to figure out where it should redirect to. With this setting, previewing a post will automatically redirect to a route in Next.js based on the permalink structure set in WordPress.

As an example, let's say you have a custom post type called `news` and its permalink structure is `/news/news-name`. If your Next.js URL structure strictly follows that pattern you would have a route at `app/news/[...path]/page.tsx`. Therefore HeadstartWP can infer the proper path to a preview request for a post of type `news`.

This becomes even more useful when you have a more complicated permalink structure, let's say your `news` post type adds the category name to the url such as `/news/political/news-name`. If both your Next.js project and WordPress are following the same permalink structure, no additional logic is required to get previews to work.

Configure this in your `headstartwp.config.js`:

```javascript title="headstartwp.config.js"
module.exports = {
	// other configs...
	preview: {
		usePostLinkForRedirect: true,
	},
};
```

Note that by default, `draft` posts will not have a pretty permalink, instead, they have something like `domain.com/?p=id` so HeadstartWP adds a new rest field for all public post types called: `_headless_wp_preview_link` which will return a pretty permalink even for draft posts. This field will be used by the previewRouteHandler for draft posts.

If you are overriding permalink in WordPress via filter you must ensure that draft posts have a fallback post name:

```php
// adds category to the news permalink and prefix it with "newsroom"
add_filter(
	'post_type_link',
	function ( $post_link, $post ) {
		if ( 'news' !== $post->post_type ) {
			return $post_link;
		}

		// draft posts won't have `$post->post_name` set.
		$post_name = empty( $post->post_name ) ? sanitize_title( $post->post_title ) : $post->post_name;
		$post_name = empty( $post_name ) ? $post->ID : $post_name;

		$fallback = esc_url( home_url( sprintf( 'newsroom/%s', $post_name ) ) );

		$news_types = wp_get_post_terms( $post->ID, 'category', [ 'fields' => 'slugs' ] );

		if (
		is_wp_error( $news_types ) ||
		! is_array( $news_types ) ||
		! count( $news_types ) > 0
		) {
			return $fallback;
		}

		return esc_url( home_url( sprintf( 'newsroom/%s/%s', $news_types[0], $post_name ) ) );
	},
	10,
	2
);
```

You can also use a placeholder instead of manually handling post_name yourself:

```php
$post_name = empty( $post->post_name ) ? '%postname%' : $post->post_name;
```

When building the permalink for draft posts the framework will automatically replace `%postname` or `%pagename%` with the post_name (based on the title) or a fallback to post id.

## FAQ

**After a while, the preview URL stops working**

The JWT token expires after 5 min by default, after this period, open another preview window from WordPress to preview the post. The Next.js draft mode cookie also lasts for only 5 minutes by default (as set by the `maxAge: 5 * 60` in the previewRouteHandler).

**I'm unable to preview a custom post type**

Make sure you defined the right `single` property when registering the custom post type. See [headless config docs](/learn/getting-started/headless-config/#customposttypes). The `single` property must match the route prefix for the custom post type.

**I have a custom authentication using the Authorization header, how can I use the preview functionality?**

Make sure you have HeadstartWP plugin >= 1.0.1, `@headstartwp/core` >= 1.3.1 and `@headstartwp/next`>= 1.3.1. Then in your `headstartwp.config.js` add the following config:

```javascript
module.exports = {
	// other configs.
	// ...

	preview: {
		alternativeAuthorizationHeader: true
	}
}
```

This will tell HeadstartWP to use an alternative header (`X-HeadstartWP-Authorization`) instead of the default `Authorization` header.

**How do I handle previews in a multi-site setup?**

For multi-site setups, you may need to handle different preview endpoints per site:

```typescript title="app/api/preview/route.ts"
import { previewRouteHandler } from '@headstartwp/next/app';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const siteId = searchParams.get('site_id');
	
	return previewRouteHandler(request, {
		getRedirectPath({ req, defaultRedirectPath, post, postTypeDef, previewData }) {
			// Add site prefix for multi-site setup
			if (siteId && siteId !== '1') {
				return `/site-${siteId}${defaultRedirectPath}`;
			}
			return defaultRedirectPath;
		},
	});
}
```

**How do I access the preview data in my components?**

You can access the preview data from the cookie in your components:

```tsx
import { draftMode, cookies } from 'next/headers';

export default async function MyComponent() {
	const { isEnabled } = draftMode();
	
	if (isEnabled) {
		const cookiesStore = await cookies();
		const previewCookie = cookiesStore.get('headstartwp_preview');
		
		if (previewCookie) {
			const previewData = JSON.parse(previewCookie.value);
			// previewData contains: { id, postType, revision, authToken }
			console.log('Preview data:', previewData);
		}
	}
}
```