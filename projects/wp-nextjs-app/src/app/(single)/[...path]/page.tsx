import { BlocksRenderer, HtmlDecoder } from '@headstartwp/core/react';
import { HeadstartWPRoute, queryPost } from '@headstartwp/next/app';

const Single = async ({ params }: HeadstartWPRoute) => {
	const { data } = await queryPost({
		routeParams: params,
		params: {
			postType: ['post', 'page'],
		},
		options: {
			headers: {
				cache: 'force-cache',
			},
		},
	});

	return (
		<article>
			<h1>
				<HtmlDecoder html={data.post.title.rendered ?? ''} />
			</h1>

			<BlocksRenderer html={data.post.content.rendered ?? ''} />
		</article>
	);
};

export default Single;
