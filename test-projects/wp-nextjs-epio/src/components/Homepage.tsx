'use client';

import { ElasticPressProvider } from '@headstartwp/epio-search';
import { SearchClient } from './SearchClient';

export default ({ children }) => {
	return (
		<ElasticPressProvider
			node="https://search-api-tests-60a8167dd80df.us-east-1.staging.clients.hosted-elasticpress.io"
			indexName="search-api-tests-60a8167dd80df-searchapitest-post-1"
			onNavigation={(result) => {
				// eslint-disable-next-line no-console -- example
				console.log('ON NAV RESULT: ', result);
			}}
		>
			<SearchClient />
			{children}
		</ElasticPressProvider>
	);
};
