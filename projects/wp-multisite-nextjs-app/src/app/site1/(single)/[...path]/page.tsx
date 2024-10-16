import { BlocksRenderer, HtmlDecoder } from '@headstartwp/core/react';
import { HeadstartWPRoute, queryPost } from '@headstartwp/next/app';

const Single = async ({ params }: HeadstartWPRoute) => {
	const { data } = await queryPost({
		routeParams: { ...params, site: 'site1' },
		params: {
			postType: ['post', 'page'],
		},
	});

	return (
		<article>
			<h1>This is site 1</h1>
			<h2>
				<HtmlDecoder html={data.post.title.rendered ?? ''} />
			</h2>

			<BlocksRenderer html={data.post.content.rendered ?? ''} />
		</article>
	);
};

export default Single;
