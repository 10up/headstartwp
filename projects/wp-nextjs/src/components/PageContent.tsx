import type { PostParams } from '@headstartwp/core';

import { usePost } from '@headstartwp/next';
import dynamic from 'next/dynamic';
import { HtmlDecoder } from '@headstartwp/core/react';

const Blocks = dynamic(() => import('./Blocks').then((mod) => mod.default));

type PageContentProps = {
	params: PostParams;
};

/**
 * This is an example of how an inner component can access the data without explicitly passing the data to it.
 * This reduces prop drilling but creates an implicit dependency with its parent. Use this strategy with caution and on components that are tied to a particular route.
 *
 * @param {*} props Props object
 *
 * @returns
 */
export const PageContent = ({ params }: PageContentProps) => {
	// This won't require a refetch as long as the data has already been fetched at the page level.
	// additionally, if the request has not been SSR'd, it will be fetched on the client only once, regardless of how many call to usePost (with the same params) you make
	const { data } = usePost(params);

	if (!data) {
		return null;
	}

	return (
		<>
			<h1>
				<HtmlDecoder html={data.post.title.rendered ?? ''} />
			</h1>
			<Blocks html={data.post.content.rendered ?? ''} />
		</>
	);
};
