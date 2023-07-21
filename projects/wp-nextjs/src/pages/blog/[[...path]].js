/**
 * The blog route here exemplifies the power of the catch-all route strategy in the framework
 * This route can actually handle any taxonomy, author, pagination, date queries etc.
 *
 * In theory, you could handle multiple WordPress routes with this route, depending how you're structuring the application.
 *
 * If you wish to create specific routes for other archive pages check out the category, tag and author pages.
 *
 */
import {
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
	usePostOrPosts,
} from '@headstartwp/next';
import { BlocksRenderer } from '@headstartwp/core/react';
import { Link } from '../../components/Link';
import { blogParams } from '../../params';
import { resolveBatch } from '../../utils/promises';

const SinglePost = () => {
	const { data } = usePostOrPosts(blogParams);

	return (
		<>
			<h1>{data.post.title.rendered}</h1>
			<BlocksRenderer html={data.post.content.rendered} />
		</>
	);
};

const BlogPage = () => {
	const { data, isArchive } = usePostOrPosts(blogParams);

	if (isArchive) {
		return (
			<>
				<h1>Blog Page</h1>
				<ul>
					{data.posts.map((post) => (
						<li key={post.id}>
							<Link href={post.link}>{post.title.rendered}</Link>
						</li>
					))}
				</ul>
			</>
		);
	}

	return <SinglePost />;
};

export default BlogPage;

export async function getServerSideProps(context) {
	try {
		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(usePostOrPosts.fetcher(), context, { params: blogParams }),
			},
			{ func: fetchHookData(useAppSettings.fetcher(), context), throw: false },
		]);

		return addHookData(settledPromises, {});
	} catch (e) {
		return handleError(e, context);
	}
}
