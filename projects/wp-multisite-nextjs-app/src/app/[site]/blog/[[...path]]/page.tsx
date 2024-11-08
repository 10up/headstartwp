import { PostEntity, QueriedObject } from '@headstartwp/core';
import { HeadstartWPRoute, queryPostOrPosts } from '@headstartwp/next/app';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type ArchiveProps = {
	posts: PostEntity[];
	queriedObject: QueriedObject;
};

const Archive = ({ posts, queriedObject }: ArchiveProps) => {
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
		</main>
	);
};

const BlogPage = async ({ params }: HeadstartWPRoute) => {
	const { isArchive, isSingle, data } = await queryPostOrPosts({
		routeParams: params,
		params: {
			single: {
				postType: 'post',
			},
			archive: {
				postType: 'post',
				/**
				 * Specifying the _fields param reduces the amount of data queried and returned by the API.
				 */
				_fields: ['id', 'title', 'link'],
			},
			priority: 'single',
			routeMatchStrategy: 'single',
		},
	});

	if (isArchive && typeof data.posts !== 'undefined') {
		return <Archive posts={data.posts} queriedObject={data.queriedObject} />;
	}

	if (isSingle && typeof data.post !== 'undefined') {
		return (
			<article>
				<h1>{data.post.title.rendered}</h1>
			</article>
		);
	}

	return notFound();
};

export default BlogPage;
