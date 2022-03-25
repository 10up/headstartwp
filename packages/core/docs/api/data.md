# Data API

`@10up/headless-core` provides a data fetching abstraction for mapping out URLs to data fetching requests through "strategies".

## Fetching utilities

There are also two lower-level fetching utilities used by the framework.

### apiGet

`apiGet` is a wrapper around `fetch`.

#### Definition
```typescript
const apiGet = async (
	url: string,
	args: { [index: string]: any } = {}
)
```

Parameters:
- `url`: The url to fetch
- `args`: An object containing the query params

Return value:
- `headers`: An object containing the headers of the response.
- `json`: An object containing the response data.

#### Usage

```javascript
const { json, headers } = await apiGet('https://wp.com/wp-json/wp/v2/posts');
console.log(json); // outputs the json returned
console.log(headers); // outputs the received headers
```

### apiPost
> This functions is not currently used by the framework and needs additional work.

`apiPost` is a wrapper around `fetch`.

#### Definition
```typescript
const apiPost = async (url: string, args: { [index: string]: any } = {})
```

Parameters:
- `url`: The url to fetch
- `args`: An object containing the body params

Return value:
- An object containing the response data.

#### Usage

```javascript
const { json, headers } = await apiPost('https://wp.com/wp-json/wp/v2/posts/create', { /* post object */} );
console.log(json); // outputs the json returned
console.log(headers); // outputs the received headers
```

## Fetching Strategies

### Overview

The core of the data fetching abstraction are the "Fetching Strategies". A fetching strategy specifies how a request should be crafted for getting data for a specific URL Route.

Take the WordPress "single post route" as an example. It can take several forms:
- Slug: `/post-slug`
- Slug with Date: `/2022/5/23/post-slug`, `/2022/post-slug`, `/2022/5/post-slug`
- Child page: `/parent-page/post-slug`

The `SinglePostFetchStrategy` takes a URL of any of these forms and properly crafts a request to WordPress to fetch the data for the post. It would generate the following requests for each of the examples above:

- `/post-slug` => `/wp-json/wp/v2/posts?slug=post-slug`
- `/2022/5/23/post-slug` => `/wp-json/wp/v2/posts?slug=post-slug`
- `/parent-page/post-slug` => `/wp-json/wp/v2/posts?slug=post-slug`

All Fetching Strategies should extend [AbstractFetchStrategy](../../src/data/strategies/AbstractFetchStrategy.ts) class which exposes the following methods:
- `abstract getDefaultEndpoint(): string;`: Returns the default endpoint used by the strategy. Must be implemented in the concrecete classes.
- `setEndpoint(endpoint: string)`: Sets the endpoint. If none is set, the default endpoint will be used.
- `setBaseURL(url: string | undefined = '')`: Sets the base URL. i.e the backend url (WordPress).
- `getEndpoint()`: Returns the actual endpoint to be called.
- `abstract getParamsFromURL(path: string): Partial<Params>;`: This is an abstract method that must be implemented in concrete classes. It takes in a URL and returns an object containing the params that should be part of the request.
- `buildEndpointURL(params: Partial<Params>): string`: This method takes in the params from `getParamsFromURL` and builds the final endpoint url for fetching.
- `async fetcher(...)`: This method fetches the data.
- `get(params: Params)`: This is a utility method for quickly fetching data based on the params.

The main goal of the fetching strategy classes it to provide a contract for how data should be fetched that can be executed both on the client-side and server-side, avoiding code duplication. This means that, in a framework like Next.js you can reuse the same strategy both on the client and on the server without having to write the logic on both places if you with to handle both client-side and server-side data fetching.

### The useFetch hook

Let's look at the useFetch hook implementation to get a better understanding of how fetch strategies are used.

```typescript
function useFetch<E extends Entity, Params extends EndpointParams>(
	params: Params,
	fetchStrategy: AbstractFetchStrategy<E, Params>,
	options: SWRConfiguration<FetchResponse<E>> = {},
	path = '',
) {
	const { sourceUrl } = useSettings();

	fetchStrategy.setBaseURL(sourceUrl);

	const urlParams = fetchStrategy.getParamsFromURL(path);
	const finalParams = { ...urlParams, ...params };

	const result = useSWR<FetchResponse<E>>(
		fetchStrategy.buildEndpointURL(finalParams),
		(url: string) => fetchStrategy.fetcher(url, finalParams),
		options,
	);

	return { ...result, params: finalParams };
}
```

Note that  by providing an "contract" the useFetch hook can use the methods that every fetch strategy must implement to do the following:

1. Get params from the URL (the URL path must be passed to the useFetch hook)
2. Merge the URL params with `params`
3. Build the final endpoint URL with all of the `params`
4. Fetch the data.

Note that `useFetch` doesn't make any assumptions about how data should be fetched as that is entirely handled by the fetch strategies classes. 

### AppSettings
The `AppSettingsStrategy` is the most simple of the strategies as it simply fetches The App settings which is powered by the WordPress plugin. 

### SinglePost

The `SinglePostFetchStrategy` handles data fetching for single routes (i.e: `/article-name`). 

It supports the following URL structures:
- `/:year(\\d+)/:month(\\d+)?/:day(\\d+)?/:slug`
- `/(.*)?/:slug`

### PostsArchive

The `PostsArchiveFetchStrategy` handles data fetching for archive routes.

It supports the following URL structures:
- `/:year(\\d+)/:month(\\d+)?/:day(\\d+)?`
- `/page/:page`
- `/category/:category`
- `/category/:category/page/:page`
- `/tag/:tag`
- `/author/:author`

If custom taxonomies are defined in `headless.config.js`, then the following additional routes are supported:
- `/:taxonomy/:term`
- `/:taxonomy/:term/page:page`

### Search

The `SearchFetchStrategy` handles data fetching for search routes.

It supports the following URL structures:
- `/:search?`
- `/:search/page/:page`

## Creating custom fetching strategies

If you want to create custom fetching strategies simply create a new class and extend `AbstractFetchStrategy`.