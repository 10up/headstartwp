'use client';

import { useFetchPosts } from '@headstartwp/core/react';
import React from 'react';

type Props = {
	category: string;
	post_id: number;
};

export const RelatedPosts: React.FC<Props> = ({ category, post_id }) => {
	const { data, loading } = useFetchPosts({ per_page: 3, category, exclude: [post_id] });

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h2>Related Posts (Loaded Client-side)</h2>
			<ul>
				{data.posts.map((post) => (
					<li key={post.id}>{post.title.rendered}</li>
				))}
			</ul>
		</div>
	);
};
