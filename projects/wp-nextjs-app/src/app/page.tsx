import { BlocksRenderer } from '@headstartwp/core/react';
import { queryPost } from '@headstartwp/next/app';

const Home = async () => {
	const { data } = await queryPost({
		params: {
			slug: 'sample-page',
			postType: 'page',
			matchCurrentPath: false,
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
