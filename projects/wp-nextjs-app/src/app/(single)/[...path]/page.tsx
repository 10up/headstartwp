import { BlocksRenderer, HtmlDecoder } from '@headstartwp/core/react';
import { HeadstartWPRoute, queryPost } from '@headstartwp/next/app';

export const dynamic = 'force-static';

const Single = async ({ params }: HeadstartWPRoute) => {
	const { data } = await queryPost({
		routeParams: params,
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
