# EPIO Search (elasticpress.io)

> EPIO Search is a library of React components and utility functions written in TypeScript to supercharge your headless WordPress website with ElasticPress (requires elasticpress.io)

## Requirements

* ElasticPress per [ElasticPress requirements](https://github.com/10up/ElasticPress#requirements).
* WordPress website running [ElasticPress](https://elasticpress.io).

## Installation

To install EPIO Search, run the following command:

```
npm install @headstartwp/epio-search --save
```

## Components

### ElasticPressProvider
You must wrap a portion of your application with the `ElasticPressProvider` in order to use the ElasticPress components.

```js
	<ElasticPressProvider
		node="https://search-api-tests-60a8167dd80df.us-east-1.staging.clients.hosted-elasticpress.io"
		indexName="search-api-tests-60a8167dd80df-searchapitest-post-1"
	>
		{/* ElasticPress Components */}
	</ElasticPressProvider>
```

Additional props that you can optionally pass to the `ElasticPressProvider` include:

* `hitMap`
* `loadInitialData`
* `searchTerm`
* `searchState`
* `resultsState`
* `onSSR`
* `onSearch`
* `onNavigation`

> Note: The `onXYZ` props are only available in Client components. They will not work in Server components. 

These properties are defined in the `EPProviderProps` type, which is defined as follows:

```js
interface EPProviderProps {
	children: ReactNode;
	searchTerm?: string;
	hitMap?: EPHitMap;
	indexName: string | undefined;
	loadInitialData?: boolean;
	node: string | undefined;
	searchState?: EPSearchParams;
	resultsState?: Pick<EPState, 'results'>;
	endpoint?: string;
	onSSR?: (contextValue: EPContextValue) => void;
	onSearch?: (searchState: EPSearchParams) => void;
	onNavigation?: (result: EPPost) => void;
}
```


### Autosuggest

This component outputs a search field that when typed in will autosuggest results to the user.

```js
import { AutosuggestField } from '@headstartwp/epio-search';

const MyComponent = () => (
	<>
		<p>Here is my fancy new component.</p>

		<p>Here's a search input with autosuggest:</p>

		<ElasticPressProvider
			node="http://elasticpress.test/__elasticsearch"
			indexName="elasticpresstest-post-1"
			loadInitialData={false}
		>
			<AutosuggestField />
		</ElasticPressProvider>
	</>
);
```

## Support Level

**Active:** 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" width="850" alt="Work with us at 10up"></a>