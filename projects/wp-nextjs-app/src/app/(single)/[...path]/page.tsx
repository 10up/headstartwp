import { HtmlDecoder } from '@headstartwp/core/react';
import { HeadstartWPRoute, queryPost } from '@headstartwp/next/app';
import Blocks from '../../../components/Blocks';

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

			<Blocks html={data.post.content.rendered ?? ''} />
		</article>
	);
};

export default Single;
