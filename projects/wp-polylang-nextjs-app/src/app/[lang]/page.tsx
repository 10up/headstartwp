import { BlocksRenderer } from '@headstartwp/core/react';
import { HeadstartWPRoute, queryPost } from '@headstartwp/next/app';

const Home = async ({ params }: HeadstartWPRoute) => {
	console.log('HOME');
	const { data } = await queryPost({
		routeParams: params,
		params: {
			slug: 'front-page',
			postType: 'page',
		},
	});

	return (
		<main>
			<div>
				<BlocksRenderer html={data.post.content.rendered ?? ''} />
			</div>
		</main>
	);
};

export default Home;
