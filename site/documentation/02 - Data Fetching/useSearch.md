---
slug: /data-fetching/usesearch
sidebar_position: 5
---

# The useSearch hook


> The [useSearch](/api/modules/10up_headless_next#usesearch) hook is the Next.js binding for the [useFetchSearch](/api/namespaces/10up_headless_core.react#usefetchsearch).

The `useSearch` hook searches for WordPress posts from a registered post type.

## Basic Usage

Assuming a `src/pages/search/[[...path]].js` route with the following content.

> This example is using the optional catch-all route `[[..path]].js` because we want the `/search` route to be handled by the same file and fetch the latest posts.

```js
//src/pages/search/[[...path]].js
import { useSearch } from '@10up/headless-next';

const ArchivePage = () => {
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

The route will automatically render the latest 10 posts if no search term is provided. The following paths are automatically handled:

- /search/search-term
- /search/search-term/page/2
- /search

## Category Archive

You can use the `usePosts` hook to create a category archive route (`src/pages/category/[...path].js`).

> We use `[...path].js` here because **we do not want** the `/category` route to render anything.

```js
// src/pages/category/[...path].js
import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
} from '@10up/headless-next';

const SearchPage = () => {
	const { data } = usePosts({ taxonomy: 'category' });

	return (
		<>
			<h1>Showing search results for: {data.queriedObject.search.searchedValue}</h1>
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>
						<Link href={post.link}>{post.title.rendered}</Link>
					</li>
				))}
			</ul>
			<Pagination pageInfo={data.pageInfo} />
		</>
	);
};
```

## QueriedObject

The `useSearch` hook also exposes a `queriedObject`. See [usePosts docs](/docs/data-fetching/useposts/#queried-object) for more info.

The queried object for for this hook is an object of type [SearchEnrity](/api/interfaces/10up_headless_core.SearchEntity/).

## Known limitations

- It is not possible to fetch posts from more than one post type.
