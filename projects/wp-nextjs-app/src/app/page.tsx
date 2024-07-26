import { BlocksRenderer } from '@headstartwp/core/react';
import { HeadstartWPRoute, JSONLD, queryPost } from '@headstartwp/next/app';
import { Metadata } from 'next';

async function query({ params }: HeadstartWPRoute) {
	return queryPost({
		routeParams: params,
		params: {
			slug: 'sample-page',
			postType: 'page',
		},
		options: {
			cache: 'force-cache',
		},
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { seo } = await query({ params });

	return seo.metatada;
}

const Home = async ({ params }: HeadstartWPRoute) => {
	const { data, seo } = await query({ params });

	return (
		<main>
			<div>
				<BlocksRenderer html={data.post.content.rendered ?? ''} />
			</div>

			{seo?.schema && <JSONLD schema={seo.schema} />}
		</main>
	);
};

export default Home;
