import { HeadstartWPRoute, queryPosts } from '@headstartwp/next/app';
import { Metadata } from 'next';
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
	const { seo } = await query({ params });

	return seo;
}

const TagArchive = async ({ params }: HeadstartWPRoute) => {
	const { data } = await query({ params });

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
		</article>
	);
};

export default TagArchive;
