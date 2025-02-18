import { type HeadstartWPRoute, JSONLD, queryPost } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import Blocks from '../components/Blocks';

async function query({ params }: HeadstartWPRoute) {
	return queryPost({
		routeParams: params,
		params: {
			slug: 'sample-page',
			postType: 'page',
		},
		options: {
			next: {
				revalidate: 60,
				tags: ['home'],
			},
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
		<main>
			<div>
				<Blocks html={data.post.content.rendered ?? ''} settings={config} />
			</div>

			{seo?.schema && <JSONLD schema={seo.schema} />}
		</main>
	);
};

export default Home;
