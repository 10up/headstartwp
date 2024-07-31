import { removeSourceUrl } from '@headstartwp/core';
import { HtmlDecoder } from '@headstartwp/core/react';
import {
	HeadstartWPRoute,
	loadHeadstartWPConfig,
	queryPost,
	queryPosts,
} from '@headstartwp/next/app';
import Blocks from '../../../../components/Blocks';

export async function generateStaticParams({ params }: HeadstartWPRoute) {
	// loads the right config based on route params (this is needed over getHeadstartWPConfig() for sites using multisite)
	const { sourceUrl = '', hostUrl = '/' } = loadHeadstartWPConfig(params);

	// do not throw if there aren't any posts
	const { data } = await queryPosts({
		routeParams: params,
		params: { postType: 'post' },
		options: {
			throwIfNotFound: false,
		},
	});

	return data.posts.map((post) => ({
		path: removeSourceUrl({
			backendUrl: sourceUrl,
			link: post.link,
			publicUrl: hostUrl,
		})
			.substring(1)
			.split('/'),
	}));
}

const Single = async ({ params }: HeadstartWPRoute) => {
	const { data, config } = await queryPost({
		routeParams: params,
		params: {
			postType: ['post', 'page'],
		},
	});

	return (
		<article>
			<h1>
				<HtmlDecoder html={data.post.title.rendered ?? ''} />
			</h1>

			<Blocks html={data.post.content.rendered ?? ''} settings={config} />
		</article>
	);
};

export default Single;
