import { queryPosts } from '@headstartwp/next/app';
import { FC } from 'react';

export const ServerRelatedPosts: FC<{ post_id: number; category: string }> = async ({
	post_id,
	category,
}) => {
	const { data } = await queryPosts({
		params: { postType: 'post', per_page: 3, category, exclude: [post_id] },
	});

	return (
		<div>
			<h2>Related Posts (Streamed from Server)</h2>
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>{post.title.rendered}</li>
				))}
			</ul>
		</div>
	);
};
