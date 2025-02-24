'use client';

import { ReactNode } from 'react';
import { ElasticPressProvider } from '@headstartwp/epio-search';
import { SearchClient } from './SearchClient';

export const Homepage = ({ children }: { children: ReactNode }) => {
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
