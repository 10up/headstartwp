import { usePost } from '@10up/headless-next';
import { PostParams } from '@10up/headless-core';
import { FC, ReactElement } from 'react';
import dynamic from 'next/dynamic';

// @ts-expect-error
const Blocks = dynamic(() => import('./Blocks').then((mod) => mod.default));

/**
 * This is an example of how an inner component can access the data without explicitly passing the data to it.
 * This reduces prop drilling but creates an implicit dependency with its parent. Use this strategy with caution and on components that are tied to a particular route.
 *
 * @param {*} props Props object
 * @param {PostParams} props.params Params from the homepage.
 *
 * @returns {ReactElement}
 *
 */
export const PageContent: FC<{ params: PostParams }> = ({ params }) => {
	// This won't require a refetch as long as the data has already been fetched at the page level.
	// additionally, if the request has not been SSR'd, it will be fetched on the client only once, regardless of how many call to usePost (with the same params) you make
	const { data } = usePost(params);

	return (
		<>
			<h1>{data.post.title.rendered}</h1>
			<Blocks html={data.post.content.rendered} />
		</>
	);
};
