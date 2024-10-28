import type { BlockProps } from '@headstartwp/core/react';
import { queryPosts } from '@headstartwp/next/app';
import { Suspense } from 'react';

type Query = { perPage: number; postType: string };

interface PostListProps extends BlockProps<{ queryId: number; query: Query }> {}

const PostListQuery: React.FC<{ query: Query }> = async ({ query }) => {
	const {
		data: { posts },
	} = await queryPosts({
		// todo: map the rest of the query object
		params: { per_page: query.perPage, postType: query.postType },
		options: {
			throwIfNotFound: false,
		},
	});

	if (posts.length) {
		return (
			<>
				<h2>Post List</h2>
				<pre>
					<code>{JSON.stringify({ query }, null, 2)}</code>
				</pre>

				<ul>
					{posts.map((post) => (
						<li key={post.id}>
							#{post.id} -{post.title.rendered}
						</li>
					))}
				</ul>
			</>
		);
	}

	return 'no posts found';
};

export const PostList: React.FC<PostListProps> = async ({ block }) => {
	if (!block) {
		return null;
	}

	const { query } = block.attributes;

	return (
		<Suspense fallback="Loading...">
			<PostListQuery query={query} />
		</Suspense>
	);
};
