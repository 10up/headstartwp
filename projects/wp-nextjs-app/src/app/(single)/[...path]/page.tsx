import { HtmlDecoder } from '@headstartwp/core/react';
import {
	HeadstartWPRoute,
	JSONLD,
	loadHeadstartWPConfig,
	queryPost,
	queryPosts,
} from '@headstartwp/next/app';
import { Metadata } from 'next';
import { removeSourceUrl } from '@headstartwp/core';
import Blocks from '../../../components/Blocks';

export async function generateStaticParams({ params }: HeadstartWPRoute) {
	// loads the right config based on route params (this is needed over getHeadstartWP for sites using polylang integration or multisite)
	const { sourceUrl = '', hostUrl = '/' } = loadHeadstartWPConfig(params);

	const { data } = await queryPosts({
		routeParams: params,
		params: { postType: 'post' },
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

async function query({ params }: HeadstartWPRoute) {
	return queryPost({
		routeParams: params,
		params: {
			postType: ['post', 'page'],
		},
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const {
		seo: { metatada },
	} = await query({ params });

	return metatada;
}

const Single = async ({ params }: HeadstartWPRoute) => {
	const { data, seo } = await query({ params });

	return (
		<article>
			<h1>
				<HtmlDecoder html={data.post.title.rendered ?? ''} />
			</h1>

			<Blocks html={data.post.content.rendered ?? ''} />

			{seo.schema && <JSONLD schema={seo.schema} />}
		</article>
	);
};

export default Single;
