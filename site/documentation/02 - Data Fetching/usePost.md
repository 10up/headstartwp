---
slug: /data-fetching/usepost
sidebar_position: 1
---

# The usePost hook

> The [usePost](/api/modules/10up_headless_next#usepost) hook is the Next.js binding for the [useFetchPost](/api/namespaces/10up_headless_core.react#usefetchpost).

The `usePost` hook fetches a single WordPress post from a registered post type. It's basic usage is very simple.

## Basic Usage

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