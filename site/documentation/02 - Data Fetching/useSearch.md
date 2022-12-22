---
slug: /data-fetching/usesearch
sidebar_position: 5
---

# The useSearch hook

> The [useSearch](/api/modules/10up_headless_next#usesearch) hook is the Next.js binding for the [useFetchSearch](/api/namespaces/10up_headless_core.react#usefetchsearch).

The `useSearch` hook returns a collection of WordPress posts from one of the registered post type based on a search term. It's basic usage is very simple.

## Basic Usage

Assuming a `src/pages/search/[[...path]].js` route with the following content.

> This example is using the optional catch-all route `[[..path]].js` because we want the `/search` route to be handled by the same file.

```js
//src/pages/search/[[...path]].js
import { useSearch } from '@10up/headless-next';

const SearchPage = () => {
	const { loading, error, data } = useSearch({ per_page: 10 });

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

The route will automatically render the latest 10 posts for any given search term and also supports pagination. Example of the supported paths

- /search/search-term
- /search/search-term/page/2

## Known limitations

- It is not possible to search posts from more than one post type.
