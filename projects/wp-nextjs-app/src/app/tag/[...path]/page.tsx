import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { JSONLD, queryPosts } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import Link from 'next/link';

async function query({ params }: HeadstartWPRoute) {
	return queryPosts({
		routeParams: params,
		params: {
			taxonomy: 'post_tag',
		},
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const {
		seo: { metatada },
	} = await query({ params });

	return metatada;
}

const TagArchive = async ({ params }: HeadstartWPRoute) => {
	const { data, seo } = await query({ params });

	return (
		<article>
			<h1>{data.queriedObject.term?.name}</h1>

			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>
						<Link href={post.link}>{post.title.rendered}</Link>
					</li>
				))}
			</ul>
			{seo?.schema && <JSONLD schema={seo.schema} />}
		</article>
	);
};

export default TagArchive;
