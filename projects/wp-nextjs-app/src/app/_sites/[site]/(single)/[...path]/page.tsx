import { HeadstartWPRoute, queryPost } from '@headstartwp/next/app';

const Single = async ({ params }: HeadstartWPRoute) => {
	const { data } = await queryPost({
		routeParams: params,
		params: {
			matchCurrentPath: false,
		},
		options: {
			headers: {
				cache: 'no-store',
			},
		},
	});

	return (
		<article>
			<h1>{data.post.title.rendered}</h1>
		</article>
	);
};

export default Single;
