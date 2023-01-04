---
slug: /data-fetching/useposts
sidebar_position: 2
---
# The usePosts hook


> The [usePosts](/api/modules/10up_headless_next#useposts) hook is the Next.js binding for the [useFetchPosts](/api/namespaces/10up_headless_core.react#usefetchposts).

The `usePosts` hook fetches a collection of WordPress posts from a registered post type. It's basic usage is very simple.

## Basic Usage

Assuming a `src/pages/blog/[[...path]].js` route with the following content.

:::info
This example is using the optional catch-all route `[[..path]].js` because we want the `/blog` route to be handled by the same file.
:::info

```js title="src/pages/blog/[[...path]].js"
import { usePost } from '@10up/headless-next';

const ArchivePage = () => {
	const { loading, error, data } = usePosts({ per_page: 10 });

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

The route will automatically render the latest 10 posts and you get pagination, category, tags and custom taxonomies filtering for free as the following paths will automatically map URL segements into REST API requests:

- /blog/page/2
- /blog/category/category-name
- /blog/tag/tag-name
- /blog/category/category-name/page/2

## Queried Object

The `usePosts` hook exposes a `queriedObject`. It's similar to WordPress [get_queried_object()](https://developer.wordpress.org/reference/functions/get_queried_object/) function.

It essentially returned the what's being queried for, e.g: author or category. If the current page is querying posts within a certain author, then that author object will be populated in `data.queriedObject.author`. Similarly, if the current page is quering posts from a given category `data.queriedObject.term` will be populated with that category.

Example: 
```javascript
// category-name can either come from the URL or be manually specified.
const { data } = usePosts({ taxonomy: 'category', category: 'cat-name' });

return (
	<h1>Category Page: {data.queriedObject.term.name}</h1>
);
```

## Category Archive

You can use the `usePosts` hook to create a category archive route (`src/pages/category/[...path].js`).

:::info
We use `[...path].js` here because **we do not want** the `/category` route to render anything.
:::info

```js title="src/pages/category/[...path].js"
import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
} from '@10up/headless-next';

const CategoryPage = () => {
	const { data } = usePosts({ taxonomy: 'category' });

	return (
		<>
			<h1>Category Page: {data.queriedObject.term.name}</h1>
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
## Known limitations

- It is not possible to fetch posts from more than one post type.
