import { HeadstartWPRoute, JSONLD, queryPost } from '@headstartwp/next/app';
import { Metadata } from 'next';
import Blocks from '../components/Blocks';
import { Homepage } from '../components/Homepage';

async function query({ params }: HeadstartWPRoute) {
	return queryPost({
		routeParams: await params,
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

	// have to use a client component to add the ElasticPress Provider
	// if we want to use the `onNavigation` callback, since it's a client function
	return (
		<Homepage>
			<main>
				<div>
					<Blocks html={data.post.content.rendered ?? ''} settings={config} />
				</div>

				{seo?.schema && <JSONLD schema={seo.schema} />}
			</main>
		</Homepage>
	);
};

export default Home;
