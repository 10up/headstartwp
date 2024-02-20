---
slug: /data-fetching/usesnative-earch
sidebar_position: 5
---

# The useSearchNative hook

> The [useSearchNative](/api/modules/headstartwp_next#usesearchnative) hook is the Next.js binding for the [useFetchSearchNative](/api/namespaces/headstartwp_core.react#usefetchsearchnative).

The `useSearchNative` hook is the implementation of core [Search Results](https://developer.wordpress.org/rest-api/reference/search-results/) endpoint.

:::caution
This hook was introduced in `@headstartwp/core@1.3.0`, `@headstartwp/next@1.3.0` and requires the the HeadstartWP WordPress plugin >= 1.1.0
:::caution

The headstartwp WordPress plugin does additional customizations to ensure the Search Results endpoints return all the embeddable data associated with search results.

## Basic Usage

Assuming a `src/pages/search/[[...path]].js` route with the following content.

:::info
This example is using the optional catch-all route `[[..path]].js` because we want the `/search` route to be handled by the same file and fetch the latest posts.
:::info

```js title="src/pages/search/[[...path]].js"
import { useSearchNative } from '@headstartwp/next';

const ArchivePage = () => {
	const { loading, error, data } = useSearchNative({ per_page: 10 });

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	if (data.pageInfo.totalItems === 0) {
		return 'Nothing found';
	}

	return (
		<>
			<h1>Search Results</h1>
			<ul>
				{data.searchResults.map((item) => (
					<li key={item.id}>
						<Link href={item.url}>
							{item.id} - {item.title}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};
```

The route will automatically render the latest 10 results if no search term is provided. The following paths are automatically handled:

- /search/search-term
- /search/search-term/page/2
- /search

## Searching from multiple post types

You can specify any of the supported parameters described in the [Search Results](https://developer.wordpress.org/rest-api/reference/search-results/#arguments) endpoint documentation.

```js title="src/pages/search/[[...path]].js"
import { useSearchNative } from '@headstartwp/next';

const ArchivePage = () => {
	const { loading, error, data } = useSearchNative({ 
		per_page: 10, 
		type: 'post', 
		subtype: ['post', 'page'] 
	});

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	if (data.pageInfo.totalItems === 0) {
		return 'Nothing found';
	}

	return (
		<>
			<h1>Search Results</h1>
			<ul>
				{data.searchResults.map((item) => (
					<li key={item.id}>
						<Link href={item.url}>
							{item.id} - {item.title}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};
```

## Searching for terms

You can also search for terms:

```js title="src/pages/terms/search/[[...path]].js"
import { useSearch } from '@headstartwp/next';

const ArchivePage = () => {
	const { loading, error, data } = useSearchNative({ 
		per_page: 10, 
		type: 'term',
		subtype: ['category', 'category'] 
	});

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	if (data.pageInfo.totalItems === 0) {
		return 'Nothing found';
	}

	return (
		<>
			<h1>Search Results</h1>
			<ul>
				{data.searchResults.map((item) => (
					<li key={item.id}>
						<Link href={item.url}>
							{item.id} - {item.title}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};
```

## Accessing embeddable data
By default, the Search Results endpoints only return the object of the associated search results but do not return embeddable data of the search results entities themselves. For instance, when searching for posts, even if you pass the `_embed` parameter, WordPress won't return the associated term objects, author objects etc.

HeadstartWP plugin extends the core endpoint so that it returns these embedded objects to avoid the need for additional queries. Check the [PostSearchEntity](/api/interfaces/headstartwp_core.PostSearchEntity/) and [TermSearcheEntity](api/interfaces/headstartwp_core.TermSearchEntity/).

## QueriedObject

The `useNativeSearch` hook also exposes a `queriedObject`.

The queried object for this hook is an object of type [SearchEntity](/api/interfaces/headstartwp_core.SearchEntity/).

