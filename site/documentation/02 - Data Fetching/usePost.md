---
slug: /data-fetching/usepost
sidebar_position: 1
---

# The usePost hook

> The [usePost](/api/modules/10up_headless_next#usepost) hook is the Next.js binding for the [useFetchPost](/api/namespaces/10up_headless_core.react#usefetchpost).

The `usePost` hook fetches a single WordPress post from a registered post type. It's basic usage is very simple.

## Basic Usage

The basic usage is pretty simple and it assumes a route named `src/pages/[...path].js` where the `slug` is extracted from the URL.

```js
//src/pages/[...path].js
import { usePost } from '@10up/headless-next';

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

> The behavior described here was implemented in version **0.5.x** of the framework.

The `usePost` hook will by default match the current path captured by `[...path].js` with the post's link property. This ensures the right post is loaded and that 404 are issued to unsuported permalinks. 

> The scenarios described below assumes [pre-fetching](/docs/data-fetching/prefetching) is being used in Next.js

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
- If prefetching is setup following [pre-fetching](/docs/data-fetching/prefetching) and `redirectStrategy` is set to "404" or "always" in `headless.config.js`, `handleError` will then look if there's a redirect avaliable and since WordPress redirects `/post-name` to `/2022/10/30/post-name`, the framework will also perform the redirect.


### Fetching from multiple post types

When specifying an array of post type, the slug will be searched in both endpoint and the first one to return a valid post object will be used.

> Note: this might result in URL conflicts, i.e a post or page using the same slug. The first post type specified will take precedence. In such cases, consider using a different URL structure for each for instance (e.g: using `src/pages/article/[...path].js` for posts).


```js
//src/pages/[...path].js
import { usePost } from '@10up/headless-next';

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

In order to fetch a single from a custom post type, first declare the custom post type in `headless.config.js` as explained in the [headless.config.js](/docs/getting-started/headless-config#custom-post-types) section.

```js
//src/pages/book/[...path].js
import { usePost } from '@10up/headless-next';

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