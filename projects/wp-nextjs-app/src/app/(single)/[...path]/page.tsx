import { HtmlDecoder } from '@headstartwp/core/react';
import { HeadstartWPRoute, queryPost } from '@headstartwp/next/app';
import { Metadata } from 'next';
import Blocks from '../../../components/Blocks';

async function query({ params }: HeadstartWPRoute) {
	return queryPost({
		routeParams: params,
		params: {
			postType: ['post', 'page'],
		},
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { seo } = await query({ params });

	return seo;
}

const Single = async ({ params }: HeadstartWPRoute) => {
	const { data } = await query({ params });

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
