import { BlocksRenderer } from '@headstartwp/core/react';
import { HeadstartWPRoute, queryAppSettings, queryPost } from '@headstartwp/next/app';

const Home = async ({ params }: HeadstartWPRoute) => {
	const {
		data: { home },
	} = await queryAppSettings({
		routeParams: params,
	});

	const { data } = await queryPost({
		routeParams: params,
		params: {
			slug: home.slug ?? 'front-page',
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
