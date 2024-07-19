import { BlockProps } from '@headstartwp/core/react';
import { queryPosts } from '@headstartwp/next/app';

interface PostListProps
	extends BlockProps<{ queryId: number; query: { perPage: number; postType: string } }> {}

export const PostList: React.FC<PostListProps> = async ({ block }) => {
	if (!block) {
		return null;
	}

	const { query } = block.attributes;

	const { data } = await queryPosts({
		// todo: map the rest of the query object
		params: { per_page: query.perPage, postType: query.postType },
		// setting handle error to false will disable automatic handling of errors
		// i.e you have to handle the error yourself
		handleError: false,
	});

	if (data?.posts) {
		return (
			<>
				<h2>Post List</h2>
				<pre>
					<code>{JSON.stringify({ query }, null, 2)}</code>
				</pre>

				<ul>
					{data.posts.map((post) => (
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
