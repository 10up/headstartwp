---
slug: /data-fetching/prefetching
---
# Prefetching data on the server

To enable prefetching data on the server use the `fetchHookData` function alongside `addHookData`.
We also recommend using the `handleError` function and to wrap the `fetchHookData` call in a try/catch.

```js
//src/pages/[...path].js
import { 
    usePost, 
    fetchHookData, 
    addHookData, 
    handleError
} from '@10up/headless-next';

const params = { postType: ['post', 'page'] };

const SinglePostsPage = () => {
	const { data } = usePost(params);

	// when doing ssr/ssg data will always be avaliable so handling loading/error state is optional

	return (
		<div>
			<h2>{data?.post.title.rendered}</h2>
		</div>
	);
};

export default SinglePostsPage;

// or export async function getServerSideProps(context)
export async function getStaticProps(context) {
	try {
        const usePostHook = await fetchHookData(usePost.fetcher(), context, { params });

		return addHookData([usePostHook], { myCustomProp: 'value' });
	} catch (e) {
		return handleError(e, context);
	}
}
```

- The [fetchHookData](/api/modules/10up_headless_next#fetchhookdata) function receives a [strategy](/docs/data-fetching/strategies), the Next.js context object and a object containing the params. The `params` must match the params passed to the hook, hence why it's been moved into a variable outside of the `SinglePostsPage` component.
- The [addHookData](/api/modules/10up_headless_next#addhookdata) receives an array of responses returned by `fetchHookData` and prepares that data to be returned to the page as props. If you need to pass additional props just pass them in the second argument.
- The [handleError](/api/modules/10up_headless_next#ahandleError) function handles errors such as 404, redirects (when redirects are set to 404) among other things.

We recommend reviewing the [starter project](https://github.com/10up/headless/tree/develop/projects/wp-nextjs) for more examples of prefetching data on the server.