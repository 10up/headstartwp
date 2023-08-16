---
slug: /data-fetching/use-post-or-posts
sidebar_position: 4
---

# The usePostOrPosts hook

:::info
This hook was introduced in `@headstartwp/core@1.1.0` and `@headstartwp/next@1.1.0`
:::info

> The [usePostOrPosts](/api/modules/headstartwp_next#usepostorposts) hook is the Next.js binding for the [useFetchPostOrPosts](/api/namespaces/headstartwp_core.react#usefetchpostorposts).

The `usePostOrPosts` fetch either a single post or a collection of posts based on the current path. It is useful when you want to prefix the archive and the single posts with the same prefix. E.g: /blog/post-name and /blog/news

## Basic Usage

```javascript
// src/pages/blog/[...path].js

const blogParams = {
	single: {
		postType: 'post',
	},
	archive: {
		postType: 'post',
		taxonomy: 'category',
	},
	priority: 'single',
	routeMatchStrategy: 'single',
};

const Archive = () => {
	const { data } = usePosts(blogParams.archive);

	return (
		<>
			<h1>Blog Page</h1>
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>
						<Link href={post.link}>{post.title.rendered}</Link>
					</li>
				))}
			</ul>
		</>
	);
};

const PageContent = ({ params }) => {
	const { data } = usePost(params);

	return (
		<>
			<h1>
				<HtmlDecoder html={data.post.title.rendered} />
			</h1>
			<Blocks html={data.post.content.rendered} />
		</>
	);
};


const BlogPage = () => {
	const { isArchive } = usePostOrPosts(blogParams);

	if (isArchive) {
		return <Archive />;
	}

	return <PageContent params={blogParams.single} />;
};

export async function getServerSideProps(context) {
	try {
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(usePostOrPosts.fetcher(), context, { params: blogParams }),
			},
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}
```

The above route will match the following URLs:
- /blog/[category]
- /blog/[category]/page/[page]
- /blog/[category]/[post-name] (this route will only work if the `post.link` property matches this structure in WP)
- /blog/[post-name] (this route will only work if the `post.link` property matches this structure in WP)

### Return values

This hook returns the following things:
- **isArchive**: true if the resulting data is for an archive
- **isSingle**:  true if the resulting data is for a single post
- **post**: if isSingle is true, will hold the data for a single post
- **posts**: if isArchive is true, will hold the data for an archive

When using the `usePostOrPosts` hook you can also use `usePost` and `usePosts` without needing to make additional fetch calls. The `usePostOrPosts` hook will populate the cache for `usePost` and `usePosts`. That is why in the example on the page, the actual data is pulled from `usePost` and `usePosts`.

### single and archive params

The route above is going to try to fetch either a single post or a post archive based on the current URL. The parameters passed to `single` are the `usePost` parameters and the `archive` params are the `usePosts` params.

### priority

The possible values for `priority` are `single` or `archive`. This setting exists to prioritize one strategy over the other when there are URL collisions. In the example on this page, there could be a slug collision where a post exists with the slug of a category. In that case, the `priority` setting will dictate which one is going to be used.

### routeMatchStrategy

This setting controls whether `[...path].js` should match the fetch strategy. The possible values are `none` (default), `single`, `archive` and `both`.

- `single`: Will only fetch a single post if `[...path].js` matches the structure of a single.
- `archive`: Will only fetch an archive if `[...path].js` matches the structure of an archive.
- `both`: Will only fetch a single and an archive if they both match the expected url structure.
- `none`: Does not perform any checks against `[...path].js`.

As an example, if you are trying to have `/blog` fetch the latest posts and `/blog/post-name` fetch a single post and set `routeMatchStrategy` to `archive`, the `/blog` route will never work.