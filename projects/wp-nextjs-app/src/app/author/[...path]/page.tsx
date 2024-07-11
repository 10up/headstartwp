import { HeadstartWPRoute, queryAuthorArchive } from '@headstartwp/next/app';
import Link from 'next/link';

const AuthorArchive = async ({ params }: HeadstartWPRoute) => {
	const { data } = await queryAuthorArchive({
		routeParams: params,
	});

	return (
		<article>
			<h1>{data.queriedObject.author?.name}</h1>

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

export default AuthorArchive;
