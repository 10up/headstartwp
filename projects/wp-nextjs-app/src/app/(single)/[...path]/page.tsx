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
import dynamic from 'next/dynamic';
import { FC, Suspense } from 'react';
import Blocks from '../../../components/Blocks';

const ClientRelatedPosts = dynamic(() =>
	import('../../../components/RelatedPosts').then((mod) => mod.RelatedPosts),
);

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

const ServerRelatedPosts: FC<{ post_id: number; category: string }> = async ({
	post_id,
	category,
}) => {
	const { data } = await queryPosts({
		params: { postType: 'post', per_page: 3, category, exclude: [post_id] },
	});

	return (
		<div>
			<h2>Related Posts (Streamed from Server)</h2>
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>{post.title.rendered}</li>
				))}
			</ul>
		</div>
	);
};

const Single = async ({ params }: HeadstartWPRoute) => {
	const { data, seo, config } = await query({ params });

	return (
		<article>
			<h1>
				<HtmlDecoder html={data.post.title.rendered ?? ''} />
			</h1>

			<Blocks html={data.post.content.rendered ?? ''} settings={config} />

			{seo.schema && <JSONLD schema={seo.schema} />}

			{data.post.terms.category && (
				<>
					<ClientRelatedPosts
						post_id={data.post.id}
						category={data.post.terms.category[0].slug}
					/>
					<Suspense fallback="Loading (streaming)">
						<ServerRelatedPosts
							post_id={data.post.id}
							category={data.post.terms.category[0].slug}
						/>
					</Suspense>
				</>
			)}
		</article>
	);
};

export default Single;
