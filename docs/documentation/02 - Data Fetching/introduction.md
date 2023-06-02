---
slug: /data-fetching
sidebar_label: Introduction
sidebar_position: 0
---

# Introduction

The Headless Framework exposes several customs react hooks that provide a seamless data-fetching experience with WordPress. Those hooks are built to be "isomorphic" i.e can be executed either on the browser or on the server (e.g: Node.js).

The data-fetching logic itself is abstracted by [strategies](/api/classes/headstartwp_core.AbstractFetchStrategy/). The custom React hooks are powered by [useSwr](https://swr.vercel.app/).

> With Next.js `app` directory support added in Next.js 13, we will be providing special hooks that will work well with Suspense and Streaming. At the moment, we do not recommend using the existing custom hooks in the `app` directory.

## React Custom hooks

The `@headstartwp/core/react` package export exposes the react hooks implementation on top of the `useSwr` library. Those hooks are called `useFetch*` e.g: `useFetchPost`, `useFetchPosts` and so on. They can be used outside of Next.js (i.e create-react-app, React Native etc.).

## Next.js "bindings" 

Next.js is the main meta-framework supported by 10up's Headless Framework, therefore we provide special bindings that make using the framework a breeze.

The Next.js bindings are exposed by the `@headstartwp/next` package.

The main difference is that the Next.js binding will automatically extract URL segments into request params (i.e extracting post name from the URL automatically) when used in conjunction with the "path" catch-all pattern like `src/page/[...path.js]`.

The following example uses the `useFetchPost` to manually fetch a page with the `about` slug.

```js
import { useFetchPost } from '@headstartwp/core/react';

const Page = () => {
    const  { data: { post }, loading } = useFetchPost({ slug: 'about', post_type: 'page' } );

    if (loading) {
        return 'Loading...';
    }

    return (<h1>{post.title.rendered}</h1>);
};
```

You could omit the `slug` param by specifying the current path of the page and it will parse the path and extract matched params following the WordPress pretty permalinks convention.

```js
usePost({ post_type: 'page' }, {}, '/about' );
```

By using the Next.js bindings and following the path catch-all route convention, the URL extraction is automatic.

```js title="src/pages/[...path].js"
import { usePost } from '@headstartwp/next';

const Page = () => {
    // slug is automatically injected from the next.js router
    // if you pass a slug it will override what's coming from the URL
	const { loading, error, data } = usePost( { post_type: 'page' });

	if (loading) {
		return 'Loading...';
	}


	return (<h1>{post.title.rendered}</h1>);
};
```

Then visiting a URL like `/about` or `/privacy-policy` will render the contents of the about and privacy policy pages respectively.

> The remaining of this section will assume the Next.js versions of the hooks are used. It will also assume the "path" catch-all route conventions are being used.