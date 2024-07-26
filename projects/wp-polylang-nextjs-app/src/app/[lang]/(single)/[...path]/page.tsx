import { removeSourceUrl } from '@headstartwp/core';
import { BlocksRenderer, HtmlDecoder } from '@headstartwp/core/react';
import {
	HeadstartWPRoute,
	loadHeadstartWPConfig,
	queryPost,
	queryPosts,
} from '@headstartwp/next/app';

export async function generateStaticParams({ params }: HeadstartWPRoute) {
	// loads the right config based on route params (this is needed over getHeadstartWP for sites using multisite)
	const { sourceUrl = '', hostUrl = '/' } = loadHeadstartWPConfig(params);

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
	const { data } = await queryPost({
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

			<BlocksRenderer html={data.post.content.rendered ?? ''} />
		</article>
	);
};

export default Single;
