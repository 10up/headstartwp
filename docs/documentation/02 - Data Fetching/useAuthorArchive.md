---
slug: /data-fetching/useauthorarchive
sidebar_position: 3
---
# The useAuthorArchive Hook

> The [useAuthorArchive](/api/modules/headstartwp_next#useauthorarchive) hook is the Next.js binding for the [useFetchAuthorArchive](/api/namespaces/headstartwp_core.react#usefetchauthorarchive).

The `useAuthorArchive` hook fetches a collection of WordPress posts from a registered post type filtered by an author.

## Basic Usage (Author Archive)

Assuming a `src/pages/author/[...path].js` route with the following content.

:::info
This example is using the catch-all route `[..path].js` because **we do not want** the `/author` path to be handled by this route.
:::info

```js title="src/pages/author/[...path].js"
import { useAuthorArchive } from '@headstartwp/next';

const ArchivePage = () => {
	const { loading, error, data } = useAuthorArchive({ per_page: 10 });

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
            {data?.posts?.map((post) => (
                <h2 key={post.id}>{post.title.rendered}</h2>
            ))}
		</div>
	);
};
```

The route will automatically render the latest 10 posts from the current author. The following paths will automatically be handled by the hook.

- /author/author-name
- /author/author-name/page/2


## Author Archive for Custom Post Type

In order to fetch posts from a custom post type, first declare the custom post type in `headstartwp.config.js` as explained in the [headstartwp.config.js](/learn/getting-started/headless-config#custom-post-types) section. 
```js title="src/pages/author/[...path].js"
import { useAuthorArchive } from '@headstartwp/next';

const ArchivePage = () => {
    // book must be declared in headstartwp.config.js
	const { loading, error, data } = useAuthorArchive({ postType: ['book'] });

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
            {data?.posts?.map((post) => (
                <h2 key={post.id}>{post.title.rendered}</h2>
            ))}
		</div>
	);
};
```