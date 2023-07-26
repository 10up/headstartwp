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
	usePosts,
} from '@headstartwp/next';

import { Link } from '../../components/Link';
import { blogParams } from '../../params';
import { resolveBatch } from '../../utils/promises';
import { PageContent } from '../../components/PageContent';

const Archive = () => {
	const { data, loading } = usePosts(blogParams.archive);

	if (loading) {
		return 'loading usePosts';
	}

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
};

const BlogPage = () => {
	const { isArchive, loading } = usePostOrPosts(blogParams);

	if (loading) {
		return 'Loading usePostOrPosts';
	}

	if (isArchive) {
		return <Archive />;
	}

	return <PageContent params={blogParams.single} />;
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
