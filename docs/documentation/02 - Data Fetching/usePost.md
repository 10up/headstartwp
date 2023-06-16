---
slug: /data-fetching/usepost
sidebar_position: 1
---

# The usePost hook

> The [usePost](/api/modules/headstartwp_next#usepost) hook is the Next.js binding for the [useFetchPost](/api/namespaces/headstartwp_core.react#usefetchpost).

The `usePost` hook fetches a single WordPress post from a registered post type. Its basic usage is very simple.

## Basic Usage

The basic usage is pretty simple and it assumes a route named `src/pages/[...path].js` where the `slug` is extracted from the URL.

```js title=src/pages/[...path].js
import { usePost } from '@headstartwp/next';

const PostPage = () => {
	const { loading, error, data } = usePost();

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<h2>{data?.post.title.rendered}</h2>
		</div>
	);
};
```

#### Post path matching

:::caution
The behavior described here was implemented in version **0.5.x** of the framework and can be disabled by passing `matchCurrentPath: false` to `usePost` (and `fetchHookData` for server-side data fetching).
:::caution

The `usePost` hook will by default match the current path captured by `[...path].js` with the post's link property. This ensures the right post is loaded and that 404 are issued to unsupported permalinks. 

:::caution
The framework requires that the permalink structure set on the backend matches the URL structure being used on the front-end. 

This means that if you include the date in your permalinks the URLs to a post without the date will 404 in the framework.

This is also true for custom post types, if the WordPress backend expects a custom post type to be at `/book/book-name` the front-end must also follow the same URL structure. If you wish to change the permalink structure for custom post types make sure to make the changes both in WordPress and in your front-end code.
:::caution

Example where path matches:

- User visits URL `/post-name`
- The post with the `post-name` slug contains a `http://backend.com/post-name` link.
- Since the URL and the path of `post.link` matches the page/post is rendered.

Example where path does not match:

- User visits URL `/parent-page/post-name`
- The post with the `post-name` slug contains a `http://backend.com/different-parent/post-name` url
- Since the URL (`/parent-page/post-name`) and the path of `post.link` (`different-parent/post-name`) **do not** match a 404 page is issued.

Example where path does not match but is redirected to the right one:
- User visits URL `/post-name`
- The post with the `post-name` slug contains a `http://backend.com/2022/10/30/post-name` url
- Since the URL and the path of `post.link` do not match, a NotFound error is thrown
- If prefetching is setup following [pre-fetching](/learn/data-fetching/prefetching) and `redirectStrategy` is set to "404" or "always" in `headless.config.js`, `handleError` will then look if there's a redirect available and since WordPress redirects `/post-name` to `/2022/10/30/post-name`, the framework will also perform the redirect.


### Fetching from multiple post types

When specifying an array of post type, the slug will be searched in both endpoint and the first one to return a valid post object will be used.

:::caution
This might result in URL conflicts, i.e a post or page using the same slug. The first post type specified will take precedence. In such cases, consider using a different URL structure for each for instance (e.g: using `src/pages/article/[...path].js` for posts).
:::caution


```js title="src/pages/[...path].js"
import { usePost } from '@headstartwp/next';

const PostOrPage = () => {
	const { loading, error, data } = usePost({ postType: ['page', 'post'] });

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<h2>{data?.post.title.rendered}</h2>
		</div>
	);
};
```

## Fetching from a custom post type

To fetch a single from a custom post type, first declare the custom post type in `headless.config.js` as explained in the [headless.config.js](/learn/getting-started/headless-config#custom-post-types) section.

```js title="src/pages/book/[...path].js"
import { usePost } from '@headstartwp/next';

const PostPage = () => {
	const { loading, error, data } = usePost({ postType: 'book' });

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<h2>{data?.post.title.rendered}</h2>
		</div>
	);
};
```