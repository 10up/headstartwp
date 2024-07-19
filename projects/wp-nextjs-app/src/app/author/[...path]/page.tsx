import { HeadstartWPRoute, queryAuthorArchive } from '@headstartwp/next/app';
import { Metadata } from 'next';
import Link from 'next/link';

async function query({ params }: HeadstartWPRoute) {
	return queryAuthorArchive({
		routeParams: params,
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const { seo } = await query({ params });

	return seo;
}

const AuthorArchive = async ({ params }: HeadstartWPRoute) => {
	const { data } = await query({ params });

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
