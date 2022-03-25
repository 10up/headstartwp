# Data Fetching Hooks

**Important**: The `useFetch` hook and the other data fetching hooks documented in the following sections (`use*Impl`) are foundational hooks and you most likely should be using the data fetching hooks provided by the framework specific package like `@10up/headless-next`.

## useFetch

The `useFetch` hook is the foundational custom hook for implemented client-side data fetching. It requires passing a [fetch strategy](./data.md). It is implemented on top of [useSwr](https://swr.vercel.app/docs/options)

This hook is useful if you are creating additional hooks and strategies for data fetching.

### Definition
```typescript
function useFetch<E extends Entity, Params extends EndpointParams>(
	params: Params,
	fetchStrategy: AbstractFetchStrategy<E, Params>,
	options: SWRConfiguration<FetchResponse<E>> = {},
	path = '',
)
```

Parameters:
- `params`: It's an object containing parameters to be passed to the fetcher function. It overrides any parameters extracted from the `path` argument.
- `fetchStrategy`: Must be an instance of `AbstractFetchStrategy`.
- `options`: The optional [swr options](https://swr.vercel.app/docs/options).
- `path`: The URL path to the current route. Use this if you want to automatically extract params from the URL.

### Usage

An example of its usage can be see in the `usePostImpl` hook.

```typescript
export function usePostImpl(
	params: PostParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
	path = '',
): usePostResponse {
	const { data, error } = useFetch<PostEntity, PostParams>(
		{ _embed: true, ...params },
		usePostImpl.fetcher(),
		options,
		path,
	);

	if (error) {
		return { error, loading: false };
	}

	if (!data) {
		return { loading: true };
	}

    // process data response
	const post = date;

	return { data: { post }, loading: false };
}

usePostImpl.fetcher = () => new SinglePostFetchStrategy(getWPUrl());
```

`usePostImpl.fetcher` is defined for convinence for quickly referencing the fetch strategy used by a data fetching hook.

For instance, if you simply want to fetch some data server-side programatically you could do this:

```javascript
import { usePostsImpl } from '@10up/headless-core';

const post = await usePostImpl.fetcher().get({ postType: 'page', slug: 'page-name' });
```

## usePostImpl

The `usePostImpl` hook fetches a single post client-side.

### Definition

```typescript
function usePostImpl(
	params: PostParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
	path = '',
)
```

### Usage

```javascript
import { usePostImpl } from '@10up/headless-core';

const params = { postType: ['page', 'post'] };

const PageContent = ({ params }) => {
    // this won't fetch the same data twice
	const { data } = usePostImpl(params);

	return (
		<>
			<h1>{data.post.title.rendered}</h1>
			<Blocks html={data.post.content.rendered} />
		</>
	);
};

const SinglePostsPage = () => {
	const { loading, error } = usePostImpl(params});

	if (loading) {
		return 'Loading...';
	}

	if (error) {
		return 'error...';
	}

	return (
		<div>
			<PageContent params={params} />
		</div>
	);
};
```

If you are storing store state in the URL you can pass the URL path to the hook and have it automatically stract the params from the URL.

Examples:

```javascript
usePostImpl({ postType: ['post']}, {}, '/2022/20/post-name')
// issues the following request: /wp-json/wp/v2/posts?slug=post-name
usePostImpl({ postType: ['page']}, {}, '/2022/20/post-name')
// issues the following request: /wp-json/wp/v2/pages?slug=post-name
```

When using the `usePost` hook from the `@10up/headless-next` package, you do not need to pass the URL path as that's handled automatically for you.

## usePostsImpl

The `usePostsImpl` hook fetches an archive of posts client-side.

### Definition

```typescript
function usePostsImpl(
	params: PostsArchiveParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
	path = '',
)
```

### Usage

```javascript
import { usePostsImpl } from '@10up/headless-core';

const BlogPage = () => {
	const { loading, error, data } = usePostsImpl();

	if (error) {
		return 'error';
	}

	if (loading) {
		return 'Loading...';
	}

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
```

If you are storing store state in the URL you can pass the URL path to the hook and have it automatically stract the params from the URL.

Examples:

```javascript
usePostsImpl({ postType: ['post']}, {}, '/category/cat-name')
// issues the following requests: 
// 1 - /wp-json/wp/v2/categories?slug=cat-name 
// 2 - /wp-json/wp/v2/posts?slug=post-name&category=<ID>
usePostsImpl({ postType: ['post']}, {}, '/page/2')
// issues the following request: /wp-json/wp/v2/posts?page=2
usePostsImpl({ postType: ['post']}, {}, '/category/cat-name/page/2')
// issues the following requests: 
// 1 - /wp-json/wp/v2/categories?slug=cat-name 
// 2 - /wp-json/wp/v2/posts?slug=post-name&category=<ID>&page=2
```
**Important**: If you enable the 10up Headless WordPress plugin, the framework won't make an additional request for fetching the category id and will just pass the category slug to the posts endpoint.

When using the `usePosts` hook from the `@10up/headless-next` package, you do not need to pass the URL path as that's handled automatically for you.

## useSearchImpl
The `useSearchImpl` hook fetches an search results.

### Definition
```typescript
function useSearchImpl(
	params: PostsArchiveParams,
	options: SWRConfiguration<FetchResponse<PostEntity>> = {},
	path = '',
)
```

### Usage

```javascript
const SearchPage = () => {
	const { error, loading, data } = useSearchImpl({ postType: 'post', search: 'search-term'});
    // or
    const { error, loading, data } = useSearchImpl({ postType: 'post' }, {}, '/search-term');

	if (error) {
		return 'Error';
	}

	if (loading) {
		return 'Loading...';
	}

	if (data.pageInfo.totalItems === 0) {
		return 'Nothing found';
	}

	return (
		<>
			<h1>Search Results</h1>
			<ul>
				{data.posts.map((item) => (
					<li key={item.id}>
						<Link href={item.link}>
							{item.id} - {item.title.rendered}
						</Link>
					</li>
				))}
			</ul>
		</>
	);
};
```
