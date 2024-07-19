import { BlocksRenderer } from '@headstartwp/core/react';
import { HeadstartWPRoute, queryPost } from '@headstartwp/next/app';
import { Metadata } from 'next';

async function query({ params }: HeadstartWPRoute) {
	return queryPost({
		routeParams: params,
		params: {
			slug: 'sample-page',
			postType: 'page',
			matchCurrentPath: false,
		},
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { seo } = await query({ params });

	return seo;
}

const Home = async ({ params }: HeadstartWPRoute) => {
	const { data } = await query({ params });

	return (
		<main>
			<div>
				<BlocksRenderer html={data.post.content.rendered ?? ''} />
			</div>
		</main>
	);
};

export default Home;
