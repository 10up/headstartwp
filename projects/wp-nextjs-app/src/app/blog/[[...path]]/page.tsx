import type { PostEntity, QueriedObject } from '@headstartwp/core';
import { HtmlDecoder } from '@headstartwp/core/react';
import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { JSONLD, queryPostOrPosts } from '@headstartwp/next/app';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Blocks from '../../../components/Blocks';
import { ServerRelatedPosts } from '../../../components/ServerRelatedPosts';

async function query({ params }: HeadstartWPRoute) {
	return queryPostOrPosts({
		routeParams: params,
		params: {
			single: {
				postType: 'post',
			},
			archive: {
				postType: 'post',
			},
			priority: 'single',
			routeMatchStrategy: 'single',
		},
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute) {
	const {
		seo: { metatada },
		isMainQuery,
	} = await query({ params });

	// a main query means that there's a default metadata associated with it
	if (isMainQuery) {
		return metatada;
	}

	// if it's not a main query then there isn't any metadata coming from WordPress
	return {
		title: 'Blog',
		description: 'This is the blog page',
	};
}

type ArchiveProps = {
	posts: PostEntity[];
	queriedObject: QueriedObject;
	schema?: string;
};

const Archive = ({ posts, queriedObject, schema = '' }: ArchiveProps) => {
	return (
		<main>
			<h1>{queriedObject.term?.name}</h1>

			<ul>
				{posts.map((post) => (
					<li key={post.id}>
						<Link href={post.link}>{post.title.rendered}</Link>
					</li>
				))}
			</ul>

			{schema && <JSONLD schema={schema} />}
		</main>
	);
};

const BlogPage = async ({ params }: HeadstartWPRoute) => {
	const { isArchive, isSingle, data, seo, config } = await query({ params });

	if (isArchive && typeof data.posts !== 'undefined') {
		return (
			<Archive posts={data.posts} queriedObject={data.queriedObject} schema={seo.schema} />
		);
	}

	if (isSingle && typeof data.post !== 'undefined') {
		return (
			<article>
				<h1>
					<HtmlDecoder html={data.post.title.rendered ?? ''} />
				</h1>

				<Blocks html={data.post.content.rendered ?? ''} settings={config} />

				{data.post.terms?.category && (
					<Suspense fallback="Loading (streaming)">
						<ServerRelatedPosts
							post_id={data.post.id}
							category={data.post.terms.category[0].slug}
						/>
					</Suspense>
				)}

				{seo.schema && <JSONLD schema={seo.schema} />}
			</article>
		);
	}

	return notFound();
};

export default BlogPage;
