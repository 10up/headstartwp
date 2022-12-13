---
id: "10up_headless_next"
title: "Module: @10up/headless-next"
sidebar_label: "@10up/headless-next"
sidebar_position: 0
custom_edit_url: null
---

## Namespaces

- [config](../namespaces/10up_headless_next.config.md)
- [middlewares](../namespaces/10up_headless_next.middlewares.md)

## Interfaces

- [FetchHookDataOptions](../interfaces/10up_headless_next.FetchHookDataOptions.md)
- [useAppSettingsResponse](../interfaces/10up_headless_next.useAppSettingsResponse.md)

## API handlers

### previewHandler

▸ **previewHandler**(`req`, `res`, `options?`): `Promise`<`void` \| `NextApiResponse`<`any`\>\>

The PreviewHandler is responsible for handling preview requests.

Handling Previews requires the Headless WordPress Plugin.

**Important**: This function is meant to be used in a api route at `/pages/api/preview`.

### Usage

```ts
// pages/api/preview.js
import { previewHandler } from '@10up/headless-next';

export default async function handler(req, res) {
	return previewHandler(req, res);
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextApiRequest` | The request object, |
| `res` | `NextApiResponse`<`any`\> | The response object. |
| `options` | [`PreviewHandlerOptions`](10up_headless_next.md#previewhandleroptions) | The PreviewHandlerOptions [PreviewHandlerOptions](10up_headless_next.md#previewhandleroptions) |

#### Returns

`Promise`<`void` \| `NextApiResponse`<`any`\>\>

A response object.

#### Defined in

[packages/next/src/handlers/previewHandler.ts:80](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/handlers/previewHandler.ts#L80)

___

### revalidateHandler

▸ **revalidateHandler**(`req`, `res`): `Promise`<`void`\>

The RevalidateHandler is responsible for handling revalidate requests.

Handling revalidate requires the Headless WordPress Plugin.

**Important**: This function is meant to be used in a api route e.g: `/pages/api/revalidate`.

### Usage

```ts
// pages/api/revalidate.js
import { revalidateHandler } from '@10up/headless-next';

export default async function handler(req, res) {
	return revalidateHandler(req, res);
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `req` | `NextApiRequest` | The request object, |
| `res` | `NextApiResponse`<`any`\> | The response object. |

#### Returns

`Promise`<`void`\>

A response object.

#### Defined in

[packages/next/src/handlers/revalidateHandler.ts:30](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/handlers/revalidateHandler.ts#L30)

## Data Fetching Hooks

### useAppSettings

▸ **useAppSettings**(`params?`, `options?`): [`useAppSettingsResponse`](../interfaces/10up_headless_next.useAppSettingsResponse.md)

The useAppSettings hook

## Usage

```tsx
const { data, loading, error } = useAppSettings();

// check loading and error states
```

### Server-Side-Rendering or Static-Site-Generation

```tsx
export async function getServerSideProps(context) {
	const useAppSettingsData = await fetchHookData(useAppSettings.fetcher(), context);
	return addHookData([useAppSettingsData], {});
}
```

**Important**: You most likely want to fetch app settings on every route so
that you can access global settings and menus in your pages & components

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `Object` | The parameters accepted by the hook |
| `options` | `FetchHookOptions`<`FetchResponse`<`AppEntity`\>\> | Options for the SWR configuration |

#### Returns

[`useAppSettingsResponse`](../interfaces/10up_headless_next.useAppSettingsResponse.md)

#### Defined in

[packages/next/src/data/hooks/useAppSettings.ts:36](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/hooks/useAppSettings.ts#L36)

___

### useAuthorArchive

▸ **useAuthorArchive**(`params?`, `options?`): `usePostsResponse`

The useAuthorArchive hook. Returns a collection of post entities queried by author

This hook must be used with a catch-all route `[...path].js` (e.g: `pages/author/[...path].js`)

**Important**: Use a catch-all and not an optional catch-all route (`[[...path]].js`) as the author param in the url is required.

In order to automatically map URL params create a catch-all route named `[...path].js`.
You can create the catch-all at any level e.g: `pages/author/[...path].js`, etc.

The `pages/author/[...path].js` route for instance would yield a URL like this: `/author-name/page/2`, `/author-name/category/category-name/page/3`, etc.

The following URL params are supported:
- Category (/author-name/category/category-name)
- Tag (/author-name/tag/tag-name)
- Author (/author/author-name)
- Pagination (/page/2)
- Custom Taxonomy (/author//taxonomy/term-name)

## Usage

### Fetching an author archive
{@codeblock ~~/examples/next/useAuthorArchive.tsx#list-of-post}

### Fetching an author archive of pages

{@codeblock ~~/examples/next/useAuthorArchive.tsx#list-of-pages}

### Server-Side-Rendering or Static-Site-Generation

{@codeblock ~~/examples/next/useAuthorArchive.tsx#ssr-ssg}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `PostsArchiveParams` | The parameters accepted by the hook |
| `options` | `FetchHookOptions`<`FetchResponse`<`PostEntity`[]\>\> | Options for the SWR configuration |

#### Returns

`usePostsResponse`

#### Defined in

[packages/next/src/data/hooks/useAuthorArchive.ts:43](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/hooks/useAuthorArchive.ts#L43)

___

### useMenu

▸ **useMenu**(`menuLocation`, `options?`): `useMenuResponse`

The useMenu hooks. Returns a Menu object.

**Important**: This hook depends on [useAppSettings](10up_headless_next.md#useappsettings). If you want to enable SSR;SSG for
this hook you will need to fetch app settings on the server side.

## Usage

### Basic usage

```tsx
export const Nav = () => {
	const { data, loading, error } = useMenu('primary-menu');

	// handle loading, error states

	return <Menu items={data} css={navStyles} />;
}
```

### Re-fetching client-side on focus and/or mount
If you are fetching app settings on the server, you can enable re-fetching on focus and/or mount
to ensure menus are always up-to date even when using SSG/ISR.

```tsx
export const Nav = () => {
	const { data, loading, error } = useMenu('primary-menu', {
		revalidateOnFocus: true,
		revalidateOnMount: true,
	});

	// handle loading, error states

	return <Menu items={data} css={navStyles} />;
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `menuLocation` | `string` | The slug of the menu location you want to fetch |
| `options` | `FetchHookOptions`<`FetchResponse`<`AppEntity`\>\> | SWR configuration options |

#### Returns

`useMenuResponse`

#### Defined in

[packages/next/src/data/hooks/useMenu.ts:46](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/hooks/useMenu.ts#L46)

___

### usePost

▸ **usePost**(`params?`, `options?`): `usePostResponse`

The usePost hook. Returns a single post entity

## Usage

### Fetching a post by slug
{@codeblock ~~/examples/next/usePost.tsx#post-by-slug}

### Fetching a page by slug
{@codeblock ~~/examples/next/usePost.tsx#page-by-slug}

### Fetching a post or page by slug
{@codeblock ~~/examples/next/usePost.tsx#post-page-by-slug}

### Custom Post Type
{@codeblock ~~/examples/next/usePost.tsx#cpt}

### Automatically mapping URL params in Next.js
In order to automatically map URL params create a catch-all route named `[...path].js`.
You can create the catch-all at any level e.g: `pages/[...path].js`, `pages/blog/[...path].js`, etc.

The `pages/[...path].js` route for instance would yield a URL like this: `/post-slug`, `/2020/01/01/post-slug`, etc.

{@codeblock ~~/examples/next/usePost.tsx#url-params}

### Server-Side-Rendering or Static-Site-Generation
{@codeblock ~~/examples/next/usePost.tsx#ssr-ssg}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `PostParams` | The parameters accepted by the hook |
| `options` | `FetchHookOptions`<`FetchResponse`<`PostEntity`\>\> | Options for the SWR configuration |

#### Returns

`usePostResponse`

#### Defined in

[packages/next/src/data/hooks/usePost.ts:39](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/hooks/usePost.ts#L39)

___

### usePosts

▸ **usePosts**(`params?`, `options?`): `usePostsResponse`

The usePost hook. Returns a collection of post entities

## Usage

### Fetching a list of posts
{@codeblock ~~/examples/next/usePosts.tsx#list-of-post}

### Fetching a list of pages

{@codeblock ~~/examples/next/usePosts.tsx#list-of-pages}

### Fetching a list of posts from a custom post type

{@codeblock ~~/examples/next/usePosts.tsx#cpt}

### Automatically mapping URL params in Next.js
In order to automatically map URL params create a catch-all route named `[[...path]].js`.
You can create the catch-all at any level e.g: `pages/[[...path]].js`, `pages/blog/[[...path]].js`, etc.

The `pages/blog/[[...path]].js` route for instance would yield a URL like this: `/blog`, `/blog/page/2`, `/blog/category/category-name/page/3`, etc.

The following URL params are supported:
- Category (/category/category-name)
- Tag (/tag/tag-name)
- Author (/author/author-name)
- Pagination (/page/2)
- Date (/YYYY/MM/DD)
- Custom Taxonomy (/taxonomy/term-name)

{@codeblock ~~/examples/next/usePosts.tsx#url-params}

### Handling multiple WordPress routes in a single next.js route

The `usePosts` hook is very flexible and can handle multiple WordPress routes in a single next.js route when using the optional-catch-all route (`[[...path]].js`).
Alongisde with the actual data, `usePosts` also returns information about the current route so you can conditionally load different components.

{@codeblock ~~/examples/next/usePosts.tsx#multiple-wordpress-routes}

### Taxonomy Archive Pages

If you want to create specific routes for taxonomy archive pages,
you can use the `taxonomy` param to specify the taxonomy slug. When doing so, the term slug will be
extracted from the URL.

*Important*: When creating taxonomy archive routes, you should not use the optional catch-all (...path.js) route, instead use the
catch-all ([...path].js) route as the term name in the URL is required for your route.

{@codeblock ~~/examples/next/usePosts.tsx#taxonomy-page}

### Author Archive Pages

IF you want to create specific routes for author archive pages (such as `pages/author/[...path.js]) use the [useAuthorArchive](10up_headless_next.md#useauthorarchive) hook.

If you're you are not using the built-in WordPress authors for your author archives pages check the section "Taxonomy Archive Pages"

### Server-Side-Rendering or Static-Site-Generation

{@codeblock ~~/examples/next/usePosts.tsx#ssr-ssg}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `PostsArchiveParams` | The parameters accepted by the hook |
| `options` | `FetchHookOptions`<`FetchResponse`<`PostEntity`[]\>\> | Options for the SWR configuration |

#### Returns

`usePostsResponse`

#### Defined in

[packages/next/src/data/hooks/usePosts.ts:73](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/hooks/usePosts.ts#L73)

___

### useSearch

▸ **useSearch**(`params?`, `options?`): `useSearchResponse`

The useSearch hook. Returns a collection of search entities

## Usage

### Basic search automatically mapping URL params in Next.js

In order to automatically map URL params create a catch-all route named `[...path].js`.
You can create the catch-all at any level e.g: `pages/search/[[...path]].js`

The `pages/search/[[...path]].js` route for instance would yield a URL like this: `/search/[term]/page/[number]`, `/search/[term]` etc

{@codeblock ~~/examples/next/useSearch.tsx#basic-search}

### Server-Side-Rendering or Static-Site-Generation
{@codeblock ~~/examples/next/useSearch.tsx#ssr-ssg}

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `PostsArchiveParams` | The parameters accepted by the hook |
| `options` | `FetchHookOptions`<`FetchResponse`<`PostEntity`[]\>\> | Options for the SWR configuration |

#### Returns

`useSearchResponse`

#### Defined in

[packages/next/src/data/hooks/useSearch.ts:28](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/hooks/useSearch.ts#L28)

___

### useTerms

▸ **useTerms**(`params?`, `options?`): `useTermsResponse`

The useTerms hook. Returns a collection of term entities

## Usage

```tsx
const { loading, data } = useTerms({ taxonomy: 'category', slug: 'cat-name' });
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `params` | `TaxonomyArchiveParams` | The parameters accepted by the hook |
| `options` | `FetchHookOptions`<`FetchResponse`<`TermEntity`[]\>\> | Options for the SWR configuration |

#### Returns

`useTermsResponse`

#### Defined in

[packages/next/src/data/hooks/useTerms.ts:20](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/hooks/useTerms.ts#L20)

## Next.js Data Fetching Utilities

### addHookData

▸ **addHookData**(`hookStates`, `nextProps`): `any`

The `addHookData` function is responsible for collecting all of the results from the `fetchHookData` function calls
and prepares the shape of the data to match what the frameworks expects (such as setting initial values for SWR and collecting SEO data).

## Usage

```ts
export async function getServerSideProps(context) {
	try {
		const usePostsHook = await fetchHookData(usePosts.fetcher(),context);
		const useAppSettingsHook = await fetchHookData(useAppSettings.fetcher(),context);
		return addHookData([usePostsHook, useAppSettingsHook], {});
	} catch (e) {
		return handleError(e, context);
	}
}
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hookStates` | [`HookState`](10up_headless_next.md#hookstate)[] | An array of resolved promises from [fetchHookData](10up_headless_next.md#fetchhookdata) |
| `nextProps` | `any` | Any additional props to pass to Next.js page routes. |

#### Returns

`any`

#### Defined in

[packages/next/src/data/utils.ts:183](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/utils.ts#L183)

___

### convertToPath

▸ **convertToPath**(`args`): `string`

Creates a path from array of arguments

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `args` | `undefined` \| `string`[] | Array of catch-all arguments |

#### Returns

`string`

#### Defined in

[packages/next/src/data/utils.ts:42](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/utils.ts#L42)

___

### fetchHookData

▸ **fetchHookData**(`fetchStrategy`, `ctx`, `options?`): `Promise`<{ `data`: { `pageInfo`: `PageInfo` ; `queriedObject`: `QueriedObject` ; `result`: `any`  } ; `isMainQuery`: `boolean` ; `key`: `string`  }\>

A function that implementeds data fetching on the server. This should be used in `getServerSideProps`
or `getStaticProps`.

Data fetching will be perfomed by the specified strategy and URL params will be automatically extracted
from `context

## Usage

```ts
export async function getServerSideProps(context) {
	try {
		const usePostsHook = await fetchHookData(usePosts.fetcher(),context);

		return addHookData([usePostsHook], {});
	} catch (e) {
		return handleError(e, context);
	}
}
```

@param fetchStrategy The fetch strategy to use. Typically this is exposed by the hook e.g: `usePosts.fetcher()`
@param ctx The Next.js context, either the one from `getServerSideProps` or `getStaticProps`
@param options See {@link FetchHookDataOptions}

@returns An object with a key of `data` and a value of the fetched data.

#### Parameters

| Name | Type |
| :------ | :------ |
| `fetchStrategy` | `AbstractFetchStrategy`<`any`, `EndpointParams`, `any`\> |
| `ctx` | `GetServerSidePropsContext`<`any`, `PreviewData`\> \| `GetStaticPropsContext`<`any`, `PreviewData`\> |
| `options` | [`FetchHookDataOptions`](../interfaces/10up_headless_next.FetchHookDataOptions.md) |

#### Returns

`Promise`<{ `data`: { `pageInfo`: `PageInfo` ; `queriedObject`: `QueriedObject` ; `result`: `any`  } ; `isMainQuery`: `boolean` ; `key`: `string`  }\>

#### Defined in

[packages/next/src/data/utils.ts:101](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/utils.ts#L101)

___

### handleError

▸ **handleError**(`error`, `ctx`, `rootRoute?`): `Promise`<`GetServerSidePropsResult`<{}\>\>

The `handleError` function is responsible for handling errors that occur during
data fetching in `getServerSideProps` or `getStaticProps`.

It also handles redirects if `redirectStrategy` is set to `404` in `headless.config.js`

If `error` is of type NotFoundError it will redirect to the 404 page. Otherwise it will
return a server error (500) page
## Usage

```ts
export async function getServerSideProps(context) {
	try {
		const usePostsHook = await fetchHookData(usePosts.fetcher(),context);
		return addHookData([usePostsHook], {});
	} catch (e) {
		return handleError(e, context);
	}
}
```

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `error` | `Error` | `undefined` | The error object |
| `ctx` | `GetServerSidePropsContext`<`ParsedUrlQuery`, `PreviewData`\> | `undefined` | The Next.js context |
| `rootRoute` | `string` | `''` | The root route (deprecated/unnecessary). This needs to be revisited |

#### Returns

`Promise`<`GetServerSidePropsResult`<{}\>\>

#### Defined in

[packages/next/src/data/utils.ts:301](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/utils.ts#L301)

## Other

### HeadlessAppProps

Ƭ **HeadlessAppProps**: `Object`

The props supported by [HeadlessApp](10up_headless_next.md#headlessapp).

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `children?` | `ReactNode` | - |
| `pageProps` | `any` | The page props from next.js. It should contain `fallback`, `themeJson` and other props. Those props are added when using `fetchHookData` and `addHookData` **`See`** - [fetchHookData](10up_headless_next.md#fetchhookdata) - [addHookData](10up_headless_next.md#addhookdata) |
| `settings` | `SettingsContextProps` | Supported settings by the framework. Such as custom image component, custom link component etc. **`See`** SettingsContextProps |
| `swrConfig` | `SWRConfiguration` | Pass any configuration to the SWR library. Globally. These settings can be overriden at the hook level. |

#### Defined in

[packages/next/src/components/HeadlessApp.tsx:14](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/components/HeadlessApp.tsx#L14)

___

### HookState

Ƭ **HookState**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `FetchResponse`<`ExpectedHookStateResponse`\> \| `FetchResponse`<`ExpectedHookStateResponse`[]\> |
| `isMainQuery` | `boolean` |
| `key` | `string` |

#### Defined in

[packages/next/src/data/utils.ts:154](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/utils.ts#L154)

___

### LinkBlockProps

Ƭ **LinkBlockProps**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `children?` | `ReactNode` |
| `domNode` | `Element` |

#### Defined in

[packages/next/src/blocks/LinkBlock.tsx:8](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/blocks/LinkBlock.tsx#L8)

___

### PreviewHandlerOptions

Ƭ **PreviewHandlerOptions**: `Object`

The options supported by [previewHandler](10up_headless_next.md#previewhandler)

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onRedirect?` | (`req`: `NextApiRequest`, `res`: `NextApiResponse`, `previewData`: `PreviewData`) => `NextApiResponse` |
| `preparePreviewData?` | (`req`: `NextApiRequest`, `res`: `NextApiResponse`, `post`: `PostEntity`, `previewData`: `PreviewData`) => `PreviewData` |

#### Defined in

[packages/next/src/handlers/previewHandler.ts:10](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/handlers/previewHandler.ts#L10)

___

### getSiteFromContext

▸ **getSiteFromContext**(`ctx`): `HeadlessConfig`

Get site using context

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `GetServerSidePropsContext`<`ParsedUrlQuery`, `PreviewData`\> \| `GetStaticPropsContext`<`ParsedUrlQuery`, `PreviewData`\> |

#### Returns

`HeadlessConfig`

HeadlessConfig

#### Defined in

[packages/next/src/data/utils.ts:56](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/data/utils.ts#L56)

## React Components

### HeadlessApp

▸ **HeadlessApp**(`props`): `Element`

The HeadlessApp component is the top level component for the Headless framework.

Should be used in `pages/_app.js`

## Usage

```tsx
import { HeadlessApp } from "@10up/headless-next";

const MyApp = ({ Component, pageProps }) => {
	const { fallback = {}, themeJson = {}, ...props } = pageProps;

	return (
		<HeadlessApp
			pageProps={pageProps}
			settings={{
				// Pass your own link components here
				linkComponent: Link,
			}}
		>
			<Layout>
				<Component {...props} />
			</Layout>
		</HeadlessApp>
	);
};

export default MyApp;
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`HeadlessAppProps`](10up_headless_next.md#headlessappprops) | Component props. See [HeadlessAppProps](10up_headless_next.md#headlessappprops) |

#### Returns

`Element`

#### Defined in

[packages/next/src/components/HeadlessApp.tsx:77](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/components/HeadlessApp.tsx#L77)

___

### ImageComponent

▸ **ImageComponent**(`props`): `ReactNode`

An implementation of the ImageBlock (core/image).

If `width`, `height` or `src` are not provided, this component will not be used.

## Usage

```tsx
import { BlocksRenderer, ImageBlock } from "@10up/headless-core/react";
import { ImageComponent } from "@10up/headless-next";

<BlocksRenderer html={html}>
	<ImageBlock component={ImageComponent} />
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `ImageBlockProps` | ImageBlockProps |

#### Returns

`ReactNode`

#### Defined in

[packages/next/src/components/ImageComponent.tsx:25](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/components/ImageComponent.tsx#L25)

___

### LinkBlock

▸ **LinkBlock**(`props`): `Element`

The Link Block converts a anchor tag node into a next/link component if it's an internal link

## Usage

```tsx
import { BlocksRenderer } from "@10up/headless-core/react";
import { LinkBlock } from "@10up/headless-next";

<BlocksRenderer html={html}>
	<LinkBlock />
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`LinkBlockProps`](10up_headless_next.md#linkblockprops) | Link Block Props |

#### Returns

`Element`

The next/link component

#### Defined in

[packages/next/src/blocks/LinkBlock.tsx:35](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/blocks/LinkBlock.tsx#L35)

___

### TwitterBlock

▸ **TwitterBlock**(`props`): `Element`

Renders a twitter embed

## Usage

```tsx
import { BlocksRenderer } from "@10up/headless-core/react";
import { TwitterBlock } from "@10up/headless-next";

<BlocksRenderer html={html}>
	<TwitterBlock />
</BlocksRenderer>
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | Link Block Props |

#### Returns

`Element`

#### Defined in

[packages/next/src/blocks/TwitterBlock.tsx:24](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/blocks/TwitterBlock.tsx#L24)

___

### Yoast

▸ **Yoast**(`props`): `Element`

The Yoast component renders the Yoast SEO meta tags.
This component is automatically rendered by [HeadlessApp](10up_headless_next.md#headlessapp) so you don't have to manually render it.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | `Object` | Component props. Expects a single `seo` prop |

#### Returns

`Element`

#### Defined in

[packages/next/src/components/Yoast.tsx:18](https://github.com/10up/headless/blob/32c3bf4/packages/next/src/components/Yoast.tsx#L18)
