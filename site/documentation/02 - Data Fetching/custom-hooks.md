---
slug: /data-fetching/creating-your-own-custom-hooks
sidebar_label: Creating your own custom hooks
---

# Custom hoooks

Sometimes it might be useful to wrap the framework data-fetching hooks into your own hooks.

## Creating a custom hook for a custom post type

Let's say you have a custom-post type and you want to abstract the parameteres needed to get that custom post type. You can create your own hook and pass in the required paramms.

```js title=src/hooks/useBook.js
import { usePost } from '@10up/headless-next';

const defaultParams = {
	postType: 'book',
	_embed: true,
};

export function useBook(params = {}) {
    return usePost({ ...params, ...defaultParams }, options);
}

useBook.fetcher = (sourceUrl?: string) => {
	const fetcher = usePost.fetcher(sourceUrl, defaultParams);
	return fetcher;
};
```

That way, you don't need to keep passing around the `defaultParams` whenever you want to fetch a single book.

By wrapping `useBook.fetcher` we can also pass a set of default params to the default `usePost` fetcher function. This ensure that when you use `fetchHookData` on the server, the data is fetched using the default params.

```js
// no need to manually pass `{ params: { postType: 'book' } }
const bookData = await fetchHookData(useBook.fetcher(), context);
```

This is also useful if you're using TypeScript and your custom post type have additional meta fields.

```js title=src/hooks/useBook.ts
import { usePost } from '@10up/headless-next';
import { PostEntity, PostParams } from '@10up/headless-core';

const defaultParams: PostParams = {
	postType: 'book',
	_embed: true,
};

interface Book extends PostEntity {
    isbn: string;
}

export function useBook(params: PostParams | {} = {}) {
    return usePost<Book>({ ...params, ...defaultParams }, options);
}

useBook.fetcher = (sourceUrl?: string) => {
	const fetcher = usePost.fetcher<Book>(sourceUrl, defaultParams);
	return fetcher;
};
```

Then when using the custom hook `isbn` will show up as an property of the returned post objects.

## Creating your own AppSettings hook

If you're using TypeScript and you are extending the framework's app endpoint and including new fields you can create your own custom hook and specify the additional TypeScript types.

```js title=src/hooks/useMyAppSettings.ts
import { FetchResponse, AppEntity, AppSettingsStrategy } from '@10up/headless-core';
import { FetchHookOptions } from '@10up/headless-core/react';
import { useAppSettings } from '@10up/headless-next';

export interface MyAppSettings extends AppEntity {
    my_custom_setting: string;
}

export function useMyAppSettings(
	options: FetchHookOptions<FetchResponse<MyAppSettings>> = {},
) {
	return useAppSettings<MyAppSettings>({}, options);
}

useMyAppSettings.fetcher = (sourceUrl?: string) =>
	new AppSettingsStrategy<MyAppSettings>(sourceUrl);
```

## Custom Strategies

Depending on what you're doing you might need to create a completely custom Fetch Strategy. A Fetch Stragety must extend [AbstractFetchStrategy](/api/classes/10up_headless_core.AbstractFetchStrategy/) and it must contain all of the logic needed to fetch the data.

If you feel like to need to create a custom strategy check out the [default Fetch Strategies](https://github.com/10up/headless/tree/develop/packages/core/src/data/strategies) as well as the [hooks](https://github.com/10up/headless/tree/develop/packages/core/src/react/hooks) that implements them.

