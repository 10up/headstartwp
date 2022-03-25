import {
	usePosts,
	fetchHookData,
	addHookData,
	handleError,
	useAppSettings,
} from '@10up/headless-next';
import { Link } from '../../components/Link';

const BlogPage = () => {
	const { loading, error, data } = usePosts();

	if (error) {
		return 'error';
	}

	if (loading) {
		return 'Loading...';
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

export default BlogPage;

export async function getServerSideProps(context) {
	try {
		const [postsData, appSettings] = await Promise.all([
			fetchHookData(usePosts.fetcher(), context, {
				// filtering is recommended for performance reasons to reduce the ammount of props that Next.js has to send via the HTML payload
				// You can either ALLOW especific fields or REMOVE especific fields.
				filterData: { method: 'ALLOW', fields: ['id', 'title', 'link'] },
			}),
			fetchHookData(useAppSettings.fetcher(), context),
		]);

		return addHookData([postsData, appSettings], {});
	} catch (e) {
		return handleError(e, context);
	}
}
