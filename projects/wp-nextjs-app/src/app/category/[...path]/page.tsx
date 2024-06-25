import { HeadstartWPRoute, queryPosts } from '@headstartwp/next/app';
import Link from 'next/link';

const CategoryArchive = async ({ params }: HeadstartWPRoute) => {
	const { data } = await queryPosts({
		routeParams: params,
		options: {
			headers: {
				cache: 'no-store',
			},
		},
	});

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

export default CategoryArchive;
