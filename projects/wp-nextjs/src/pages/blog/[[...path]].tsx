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
	HeadlessGetServerSideProps,
} from '@headstartwp/next';

import type { PostsArchiveParams } from '@headstartwp/core';
import { Link } from '../../components/Link';
import { blogParams } from '../../params';
import { resolveBatch } from '../../utils/promises';
import { PageContent } from '../../components/PageContent';

const Archive = ({ params }: { params: PostsArchiveParams }) => {
	const { data } = usePosts(params);

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
	const {
		data: { settings },
	} = useAppSettings();

	const singleParams = {
		...blogParams.single,
		permalink_structure: settings.permalink_structure ?? '/%postname%',
	};

	const { isArchive } = usePostOrPosts({
		...blogParams,
		single: singleParams,
	});

	if (isArchive) {
		return <Archive params={blogParams.archive} />;
	}

	return <PageContent params={singleParams} />;
};

export default BlogPage;

export const getServerSideProps = (async (context) => {
	try {
		const appSettings = await fetchHookData(useAppSettings.fetcher(), context);

		const settledPromises = await resolveBatch([
			{
				func: fetchHookData(usePostOrPosts.fetcher(), context, {
					params: {
						...blogParams,
						single: {
							...blogParams.single,
							permalink_structure:
								appSettings.data.result.settings.permalink_structure,
						},
					},
				}),
			},
		]);

		return addHookData([appSettings, ...settledPromises], {});
	} catch (e) {
		return handleError(e, context);
	}
}) satisfies HeadlessGetServerSideProps;
