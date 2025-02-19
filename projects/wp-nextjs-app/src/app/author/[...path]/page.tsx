import type { HeadstartWPRoute } from '@headstartwp/next/app';
import { JSONLD, queryAuthorArchive } from '@headstartwp/next/app';
import type { Metadata } from 'next';
import Link from 'next/link';

async function query({ params }: HeadstartWPRoute) {
	return queryAuthorArchive({
		routeParams: params,
	});
}

export async function generateMetadata({ params }: HeadstartWPRoute): Promise<Metadata> {
	const {
		seo: { metatada },
	} = await query({ params });

	return metatada;
}

const AuthorArchive = async ({ params }: HeadstartWPRoute) => {
	const { data, seo } = await query({ params });

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

			{seo?.schema && <JSONLD schema={seo.schema} />}
		</article>
	);
};

export default AuthorArchive;
