import { HeadstartWPRoute, JSONLD, queryPost } from '@headstartwp/next/app';
import { Metadata } from 'next';
import { ElasticPressProvider } from '@headstartwp/epio-search';
import Blocks from '../components/Blocks';
import { SearchClient } from '../components/SearchClient';

async function query({ params }: HeadstartWPRoute) {
	return queryPost({
		routeParams: params,
		params: {
			slug: 'home',
			postType: 'page',
		},
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { seo } = await query({ params });

	return seo.metatada;
}

const Home = async ({ params }: HeadstartWPRoute) => {
	const { data, seo, config } = await query({ params });

	return (
		<ElasticPressProvider
			node="https://search-api-tests-60a8167dd80df.us-east-1.staging.clients.hosted-elasticpress.io"
			indexName="search-api-tests-60a8167dd80df-searchapitest-post-1"
			loadInitialData
		>
			<SearchClient />
			<main>
				<div>
					<Blocks html={data.post.content.rendered ?? ''} settings={config} />
				</div>

				{seo?.schema && <JSONLD schema={seo.schema} />}
			</main>
		</ElasticPressProvider>
	);
};

export default Home;
